#!/usr/bin/env python3
"""Build a static task file-tree bundle for the CSBench project page."""

from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
TASKS_ROOT = REPO_ROOT.parent / "CSBench" / "tasks"
OUTPUT_PATH = REPO_ROOT / "js" / "csbench-task-trees.js"


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


def main() -> None:
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
        "taskCount": len(task_trees),
        "tasks": task_trees,
    }

    json_payload = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUTPUT_PATH.write_text(
        "window.CSBENCH_TASK_TREES = " + json_payload + ";\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(task_trees)} task trees to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
