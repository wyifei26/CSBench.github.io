#!/usr/bin/env python3
"""Build a static task file-tree bundle for the CSBench project page."""

from __future__ import annotations

import argparse
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
TASKS_ROOT = REPO_ROOT.parent / "CSBench" / "tasks"
OUTPUT_PATH = REPO_ROOT / "js" / "csbench-task-trees.js"
REMOTE_API_BASE = "https://anonymous.4open.science/api/repo/CSBench"
REMOTE_TASKS_URL = "https://anonymous.4open.science/r/CSBench/tasks"


def sort_key(path: Path) -> tuple[int, str]:
    return (0 if path.is_dir() else 1, path.name.lower())


def build_node(path: Path, root: Path, display_root: str) -> dict:
    relative_parts = path.relative_to(root).parts
    display_path = "/".join((display_root, *relative_parts)) if relative_parts else display_root

    if path.is_dir():
        children = [build_node(child, root, display_root) for child in sorted(path.iterdir(), key=sort_key)]
        return {
            "name": display_root if path == root else path.name,
            "path": display_path,
            "type": "folder",
            "open": path == root or path.parent == root,
            "children": children,
        }

    return {
        "name": path.name,
        "path": display_path,
        "type": "file",
    }


def count_stats(node: dict) -> tuple[int, int]:
    if node["type"] == "file":
        return 1, 0

    files = 0
    folders = 0 if node["path"] == node["name"] else 1
    for child in node.get("children", []):
        child_files, child_folders = count_stats(child)
        files += child_files
        folders += child_folders
    return files, folders


def fetch_json(url: str, retries: int = 3) -> object:
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "CSBench.github.io task-tree builder",
        },
    )

    for attempt in range(retries):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as error:
            if error.code == 429 and attempt < retries - 1:
                time.sleep(10 * (attempt + 1))
                continue
            raise
        except urllib.error.URLError:
            if attempt < retries - 1:
                time.sleep(3 * (attempt + 1))
                continue
            raise

    raise RuntimeError(f"Unable to fetch {url}")


def entry_full_path(entry: dict) -> str:
    parent = str(entry.get("path") or "").strip("/")
    name = str(entry.get("name") or "").strip("/")
    return "/".join(part for part in (parent, name) if part)


def insert_remote_entry(root: dict, relative_path: str, is_file: bool) -> None:
    parts = [part for part in relative_path.split("/") if part]
    if not parts:
        return

    node = root
    for index, part in enumerate(parts):
        is_leaf = index == len(parts) - 1
        children = node.setdefault("children", [])
        child = next((item for item in children if item["name"] == part), None)

        if child is None:
            child = {
                "name": part,
                "path": "/".join([root["name"], *parts[: index + 1]]),
                "type": "file" if is_leaf and is_file else "folder",
            }
            if child["type"] == "folder":
                child["open"] = len(parts[: index + 1]) <= 1
                child["children"] = []
            children.append(child)
        elif is_leaf and is_file:
            child["type"] = "file"
            child.pop("children", None)
            child.pop("open", None)

        if child["type"] == "folder":
            node = child


def sort_remote_tree(node: dict) -> dict:
    if node.get("type") != "folder":
        return node

    node["children"] = sorted(
        (sort_remote_tree(child) for child in node.get("children", [])),
        key=lambda child: (0 if child.get("type") == "folder" else 1, child.get("name", "").lower()),
    )
    return node


def build_remote_tree(task_id: str, entries: list[dict]) -> dict:
    display_root = task_id.upper()
    remote_root = f"tasks/{task_id.lower()}"
    root = {
        "name": display_root,
        "path": display_root,
        "type": "folder",
        "open": True,
        "children": [],
    }

    for entry in entries:
        full_path = entry_full_path(entry)
        if full_path == remote_root:
            continue
        if not full_path.startswith(remote_root + "/"):
            continue

        relative_path = full_path[len(remote_root) + 1 :]
        insert_remote_entry(root, relative_path, "size" in entry)

    return sort_remote_tree(root)


def build_from_remote() -> dict:
    tasks_url = f"{REMOTE_API_BASE}/files/?path=tasks"
    task_entries = fetch_json(tasks_url)
    task_ids = sorted(
        entry["name"].lower()
        for entry in task_entries
        if isinstance(entry, dict) and str(entry.get("name", "")).lower().startswith("cs")
    )

    task_trees = {}
    for index, task_id in enumerate(task_ids, start=1):
        query = urllib.parse.quote(task_id)
        entries = fetch_json(f"{REMOTE_API_BASE}/files/search?q={query}")
        if not isinstance(entries, list):
            raise RuntimeError(f"Unexpected search response for {task_id}")

        tree = build_remote_tree(task_id, entries)
        files, folders = count_stats(tree)
        task_trees[task_id.upper()] = {
            "id": task_id.upper(),
            "files": files,
            "folders": folders,
            "tree": tree,
        }
        print(f"[{index:03d}/{len(task_ids):03d}] {task_id.upper()}: {files} files, {folders} folders")

    return {
        "generatedFrom": REMOTE_TASKS_URL,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "taskCount": len(task_trees),
        "tasks": task_trees,
    }


def build_from_local() -> dict:
    if not TASKS_ROOT.exists():
        raise FileNotFoundError(f"Task directory not found: {TASKS_ROOT}")

    task_trees = {}
    for task_dir in sorted((path for path in TASKS_ROOT.iterdir() if path.is_dir()), key=lambda item: item.name):
        task_id = task_dir.name.upper()
        tree = build_node(task_dir, task_dir, task_id)
        files, folders = count_stats(tree)
        task_trees[task_id] = {
            "id": task_id,
            "files": files,
            "folders": folders,
            "tree": tree,
        }

    payload = {
        "generatedFrom": "CSBench/tasks",
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "taskCount": len(task_trees),
        "tasks": task_trees,
    }

    return payload


def write_payload(payload: dict) -> None:
    json_payload = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUTPUT_PATH.write_text(
        "window.CSBENCH_TASK_TREES = " + json_payload + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {payload['taskCount']} task trees to {OUTPUT_PATH}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        choices=("remote", "local"),
        default="remote",
        help="Build from the anonymous remote API or from a local sibling CSBench checkout.",
    )
    args = parser.parse_args()

    payload = build_from_remote() if args.source == "remote" else build_from_local()
    write_payload(payload)


if __name__ == "__main__":
    main()
