// CSBench project page - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initNavigationHighlight();
    initProgressIndicator();
    initPerfToggle();
    initCaseExplorer();
});

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe stagger items
    document.querySelectorAll('.stagger-item').forEach(item => {
        observer.observe(item);
    });
}

/* ========================================
   Smooth Scrolling
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky nav

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/* ========================================
   Navigation Highlight
   ======================================== */
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   Progress Indicator
   ======================================== */
function initProgressIndicator() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);

    // Add styles if not in CSS
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(255, 255, 255, 0.03);
            z-index: 9999;
            pointer-events: none;
        }
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #06d6a0 0%, #38bdf8 50%, #ffd166 100%);
            width: 0%;
            transition: width 0.1s ease;
            box-shadow: 0 0 8px rgba(6, 214, 160, 0.4);
        }
    `;
    document.head.appendChild(style);

    const progressBarFill = progressBar.querySelector('.reading-progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

        progressBarFill.style.width = scrollPercent + '%';
    });
}

/* ========================================
   Scroll to Top Button
   ======================================== */
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(6, 214, 160, 0.15);
            border: 1px solid rgba(6, 214, 160, 0.25);
            color: #06d6a0;
            font-size: 1.3rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(8px);
            z-index: 1000;
        }
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .scroll-to-top:hover {
            transform: translateY(-3px);
            background: rgba(6, 214, 160, 0.25);
            box-shadow: 0 0 20px rgba(6, 214, 160, 0.15);
        }
    `;
    document.head.appendChild(style);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
initScrollToTop();

/* ========================================
   Lazy Loading Images
   ======================================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

/* ========================================
   Tab Functionality (for case studies, etc.)
   ======================================== */
function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab-button]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tabButton;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

initTabs();

/* ========================================
   Copy to Clipboard (for citation, code, etc.)
   ======================================== */
function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy || button.closest('.copy-container').querySelector('code, pre').textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);

                // Visual feedback
                const originalText = button.textContent;
                button.textContent = '✓ Copied!';
                button.style.background = '#10b981';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

initCopyButtons();

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

initMobileMenu();

/* ========================================
   Analytics Event Tracking (optional)
   ======================================== */
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track CTA clicks
document.querySelectorAll('.btn, .cta-button').forEach(button => {
    button.addEventListener('click', () => {
        const label = button.textContent.trim() || button.getAttribute('aria-label');
        trackEvent('CTA', 'click', label);
    });
});

/* ========================================
   Performance Toggle (Overall / Details)
   ======================================== */
function initPerfToggle() {
    const btns = document.querySelectorAll('.perf-toggle-btn');
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;              // "overall" or "details"
            const card = btn.closest('.card');

            // Toggle button active state
            card.querySelectorAll('.perf-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle view panels
            card.querySelectorAll('.perf-view').forEach(v => v.classList.remove('active'));
            const target = card.querySelector('.perf-view-' + view);
            if (target) target.classList.add('active');
        });
    });
}

/* ========================================
   CS000232 Case Explorer
   ======================================== */
const CS000232_TREE = {
    name: 'CS000232',
    path: 'CS000232',
    type: 'folder',
    open: true,
    children: [
        {
            name: 'metadata',
            path: 'CS000232/metadata',
            type: 'folder',
            open: true,
            children: [
                { name: 'Dockerfile', path: 'CS000232/metadata/Dockerfile', type: 'file' },
                { name: 'task.md', path: 'CS000232/metadata/task.md', type: 'file' },
                {
                    name: 'test_override',
                    path: 'CS000232/metadata/test_override',
                    type: 'folder',
                    open: true,
                    children: [
                        { name: 'test.sh', path: 'CS000232/metadata/test_override/test.sh', type: 'file' },
                        {
                            name: 'testbed',
                            path: 'CS000232/metadata/test_override/testbed',
                            type: 'folder',
                            open: true,
                            children: []
                        },
                        {
                            name: 'tests',
                            path: 'CS000232/metadata/test_override/tests',
                            type: 'folder',
                            open: true,
                            children: [
                                { name: 'conftest.py', path: 'CS000232/metadata/test_override/tests/conftest.py', type: 'file' },
                                { name: 'test_correctness.py', path: 'CS000232/metadata/test_override/tests/test_correctness.py', type: 'file' },
                                { name: 'test_performance.py', path: 'CS000232/metadata/test_override/tests/test_performance.py', type: 'file' },
                                { name: 'test_threads.py', path: 'CS000232/metadata/test_override/tests/test_threads.py', type: 'file' }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'src',
            path: 'CS000232/src',
            type: 'folder',
            open: true,
            children: [
                { name: '.gitignore', path: 'CS000232/src/.gitignore', type: 'file' },
                { name: 'Makefile', path: 'CS000232/src/Makefile', type: 'file' },
                { name: 'quake.in', path: 'CS000232/src/quake.in', type: 'file' },
                { name: 'quake.in.short', path: 'CS000232/src/quake.in.short', type: 'file' },
                { name: 'quake_omp.c', path: 'CS000232/src/quake_omp.c', type: 'file' },
                { name: 'quake_serial.c', path: 'CS000232/src/quake_serial.c', type: 'file' },
                { name: 'test.sh', path: 'CS000232/src/test.sh', type: 'file' },
                {
                    name: 'tests',
                    path: 'CS000232/src/tests',
                    type: 'folder',
                    open: true,
                    children: [
                        { name: 'conftest.py', path: 'CS000232/src/tests/conftest.py', type: 'file' },
                        { name: 'test_correctness.py', path: 'CS000232/src/tests/test_correctness.py', type: 'file' },
                        { name: 'test_performance.py', path: 'CS000232/src/tests/test_performance.py', type: 'file' },
                        { name: 'test_threads.py', path: 'CS000232/src/tests/test_threads.py', type: 'file' }
                    ]
                }
            ]
        }
    ]
};

const CS000232_DEFAULT_FILE = 'CS000232/metadata/task.md';

function initCaseExplorer() {
    const treeContainer = document.getElementById('cs000232-tree');
    const viewer = document.getElementById('cs000232-viewer');
    const currentPathEl = document.getElementById('cs000232-current-path');
    const fileTypeEl = document.getElementById('cs000232-file-type');
    const fileSizeEl = document.getElementById('cs000232-file-size');
    const openFileLink = document.getElementById('cs000232-open-file');
    const fileCountEl = document.getElementById('cs000232-file-count');
    const folderCountEl = document.getElementById('cs000232-folder-count');

    if (!treeContainer || !viewer || !currentPathEl || !fileTypeEl || !fileSizeEl || !openFileLink) {
        return;
    }

    const stats = countTreeStats(CS000232_TREE);
    if (fileCountEl) fileCountEl.textContent = `${stats.files} files`;
    if (folderCountEl) folderCountEl.textContent = `${stats.folders} folders`;

    const state = {
        activeButton: null,
        requestToken: 0
    };

    treeContainer.appendChild(buildTreeNode(CS000232_TREE, state, loadCaseFile));

    const defaultButton = treeContainer.querySelector(`[data-file-path="${CS000232_DEFAULT_FILE}"]`);
    if (defaultButton) {
        loadCaseFile(CS000232_DEFAULT_FILE, defaultButton);
    } else {
        viewer.innerHTML = '<div class="case-viewer-status case-viewer-error">Default file could not be located.</div>';
    }

    async function loadCaseFile(path, buttonEl) {
        state.requestToken += 1;
        const requestToken = state.requestToken;

        if (state.activeButton) {
            state.activeButton.classList.remove('active');
        }
        if (buttonEl) {
            buttonEl.classList.add('active');
            state.activeButton = buttonEl;
        }

        currentPathEl.textContent = path;
        fileTypeEl.textContent = inferFileType(path);
        fileSizeEl.textContent = 'Loading…';
        openFileLink.href = path;
        viewer.innerHTML = '<div class="case-viewer-status">Loading file content…</div>';

        if (window.location.protocol === 'file:') {
            fileSizeEl.textContent = 'Local preview';
            renderCaseFileEmbed(viewer, path);
            return;
        }

        try {
            const response = await fetch(encodeURI(path));
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const content = await response.text();
            if (requestToken !== state.requestToken) return;

            fileSizeEl.textContent = formatBytes(new Blob([content]).size);
            renderCaseFileContent(viewer, content);
        } catch (error) {
            if (requestToken !== state.requestToken) return;

            fileSizeEl.textContent = 'Fallback preview';
            renderCaseFileEmbed(viewer, path, error);
        }
    }
}

function buildTreeNode(node, state, onFileSelect) {
    if (node.type === 'folder') {
        const details = document.createElement('details');
        details.className = 'case-tree-folder';
        details.open = node.open !== false;

        const summary = document.createElement('summary');
        summary.className = 'case-tree-folder-label';
        summary.title = node.path;
        summary.innerHTML = `
            <span class="case-tree-twistie codicon codicon-chevron-right" aria-hidden="true"></span>
            <span class="case-tree-icon case-tree-icon-folder codicon ${node.open !== false ? 'codicon-folder-opened' : 'codicon-folder'}" aria-hidden="true"></span>
            <span class="case-tree-name">${escapeHtml(node.name)}</span>
        `;
        details.appendChild(summary);

        details.addEventListener('toggle', () => {
            const folderIcon = details.querySelector('.case-tree-icon-folder');
            if (!folderIcon) return;

            folderIcon.classList.toggle('codicon-folder', !details.open);
            folderIcon.classList.toggle('codicon-folder-opened', details.open);
        });

        const childrenWrap = document.createElement('div');
        childrenWrap.className = 'case-tree-children';

        if (!node.children || node.children.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'case-tree-empty';
            emptyState.textContent = 'empty folder';
            childrenWrap.appendChild(emptyState);
        } else {
            node.children.forEach(child => {
                childrenWrap.appendChild(buildTreeNode(child, state, onFileSelect));
            });
        }

        details.appendChild(childrenWrap);
        return details;
    }

    const fileButton = document.createElement('button');
    fileButton.type = 'button';
    fileButton.className = 'case-tree-file';
    fileButton.dataset.filePath = node.path;
    fileButton.title = node.path;
    fileButton.innerHTML = `
        <span class="case-tree-file-indent" aria-hidden="true"></span>
        <span class="case-tree-icon ${getFileIconClass(node.name)}" aria-hidden="true">
            <span class="codicon codicon-file"></span>
        </span>
        <span class="case-tree-name">${escapeHtml(node.name)}</span>
    `;

    fileButton.addEventListener('click', () => {
        onFileSelect(node.path, fileButton);
    });

    return fileButton;
}

function renderCaseFileContent(container, content) {
    const normalized = content.replace(/\r\n/g, '\n');
    const lines = normalized.split('\n');

    container.innerHTML = '';

    if (normalized.length === 0) {
        container.innerHTML = '<div class="case-viewer-status">This file is empty.</div>';
        return;
    }

    const codeWrap = document.createElement('div');
    codeWrap.className = 'case-code';

    lines.forEach((line, index) => {
        const row = document.createElement('div');
        row.className = 'case-code-line';

        const number = document.createElement('span');
        number.className = 'case-line-number';
        number.textContent = String(index + 1);

        const contentEl = document.createElement('span');
        contentEl.className = 'case-line-content';
        contentEl.textContent = line.length ? line : ' ';

        row.appendChild(number);
        row.appendChild(contentEl);
        codeWrap.appendChild(row);
    });

    container.appendChild(codeWrap);
}

function renderCaseFileEmbed(container, path, error) {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'case-embed-wrap';

    if (error) {
        const note = document.createElement('div');
        note.className = 'case-viewer-status';
        note.innerHTML = `Direct fetch is unavailable, showing a browser preview instead${error.message ? ` (${escapeHtml(error.message)})` : ''}.`;
        wrapper.appendChild(note);
    }

    const iframe = document.createElement('iframe');
    iframe.className = 'case-file-embed';
    iframe.src = encodeURI(path);
    iframe.title = `Preview of ${path}`;

    wrapper.appendChild(iframe);
    container.appendChild(wrapper);
}

function countTreeStats(node) {
    let files = 0;
    let folders = 0;

    if (node.type === 'file') {
        return { files: 1, folders: 0 };
    }

    if (node.path !== 'CS000232') {
        folders += 1;
    }

    (node.children || []).forEach(child => {
        const childStats = countTreeStats(child);
        files += childStats.files;
        folders += childStats.folders;
    });

    return { files, folders };
}

function inferFileType(path) {
    const fileName = path.split('/').pop() || path;

    if (fileName === 'Dockerfile') return 'Dockerfile';
    if (fileName === 'Makefile') return 'Makefile';
    if (fileName === '.gitignore') return 'Git ignore';
    if (fileName.endsWith('.md')) return 'Markdown';
    if (fileName.endsWith('.py')) return 'Python';
    if (fileName.endsWith('.sh')) return 'Shell';
    if (fileName.endsWith('.c')) return 'C source';
    if (fileName.endsWith('.in') || fileName.endsWith('.short')) return 'Input data';

    return 'Text file';
}

function getFileIconClass(fileName) {
    if (fileName === 'Dockerfile') return 'case-tree-icon-docker';
    if (fileName === 'Makefile') return 'case-tree-icon-build';
    if (fileName.endsWith('.md')) return 'case-tree-icon-markdown';
    if (fileName.endsWith('.py')) return 'case-tree-icon-python';
    if (fileName.endsWith('.sh')) return 'case-tree-icon-shell';
    if (fileName.endsWith('.c')) return 'case-tree-icon-c';
    if (fileName.endsWith('.in') || fileName.endsWith('.short')) return 'case-tree-icon-data';
    if (fileName.startsWith('.')) return 'case-tree-icon-config';

    return 'case-tree-icon-file';
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;

    const units = ['KB', 'MB', 'GB'];
    let value = bytes / 1024;
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }

    return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* ========================================
   CSBench Dataset Case Index
   Overrides the legacy CS000232 explorer.
   ======================================== */
const CSBENCH_DATASET_ROWS_URL = 'https://datasets-server.huggingface.co/rows?dataset=BytedTsinghua-SIA/CSBench&config=default&split=test&offset=0&length=100';

const CSBENCH_FALLBACK_CASES = [
    {
        id: 'cs000003',
        category: 'System',
        sub_category: 'System Fundamentals',
        university: 'CMU',
        course_id: 'cs15213',
        course_name: 'Computer Systems',
        programming_languages: "['C']",
        lab_name: 'bomblab',
        language: 'English',
        pass_to_pass: '0',
        fail_to_pass: '7',
        task_desc: 'Bomb Lab requires students to defuse a binary bomb by reverse engineering multiple phases.',
        specification: 'Students inspect machine code with tools such as gdb, infer valid inputs for each phase, and avoid triggering BOOM!!! failures.',
        scaffold_desc: 'The scaffold includes phase-oriented tests that validate whether each bomb phase and the secret phase have been defused.',
        ut_desc: 'Phase tests check expected success strings for every defused phase.'
    },
    {
        id: 'cs000006',
        category: 'System',
        sub_category: 'System Fundamentals',
        university: 'CMU',
        course_id: 'cs15213',
        course_name: 'Computer Systems',
        programming_languages: "['C', 'Python']",
        lab_name: 'cachelab',
        language: 'English',
        pass_to_pass: '0',
        fail_to_pass: '4',
        task_desc: 'Implement a cache simulator and optimize matrix transpose code to reduce cache misses.',
        specification: 'The simulator must match reference hit, miss, and eviction counts; transpose implementations must be correct and stay under miss thresholds.',
        scaffold_desc: 'The scaffold contains csim.c, trans.c, driver scripts, reference binaries, trace files, and a Makefile.',
        ut_desc: 'Tests validate cache simulator scores and transpose correctness/performance thresholds.'
    },
    {
        id: 'cs000209',
        category: 'AI',
        sub_category: 'Machine Learning',
        university: 'NTU',
        course_id: 'ml-2025',
        course_name: 'Machine Learning',
        programming_languages: "['Python']",
        lab_name: 'hw2_AI Agent2',
        language: 'English',
        pass_to_pass: '9',
        fail_to_pass: '34',
        task_desc: 'Build an AIDE-style AI agent that generates, debugs, and improves code for a time-series prediction task.',
        specification: 'The system manages train/test CSV files, executes generated code, parses results, and searches solution trees using LLM-driven draft/debug/improve steps.',
        scaffold_desc: 'The scaffold provides Agent, Config, Interpreter, Journal, Node, LLM interface, feature selection, text processing, and main entry modules.',
        ut_desc: 'Tests cover agent policy, parsing, interpreter execution, tree/node behavior, feature preview, and utility functions.'
    }
];

function initCaseExplorer() {
    const root = {
        search: document.getElementById('csbench-case-search'),
        category: document.getElementById('csbench-category-filter'),
        subcategory: document.getElementById('csbench-subcategory-filter'),
        summaryBtn: document.getElementById('csbench-view-summary'),
        fullBtn: document.getElementById('csbench-view-full'),
        categoryIndex: document.getElementById('csbench-category-index'),
        taskList: document.getElementById('csbench-task-list'),
        viewer: document.getElementById('csbench-case-viewer'),
        filterSummary: document.getElementById('csbench-filter-summary'),
        taskCount: document.getElementById('csbench-task-count'),
        categoryCount: document.getElementById('csbench-category-count'),
        fetchStatus: document.getElementById('csbench-fetch-status'),
        currentId: document.getElementById('csbench-current-id'),
        currentType: document.getElementById('csbench-current-type'),
        currentLanguage: document.getElementById('csbench-current-language'),
        currentMeta: document.getElementById('csbench-current-meta')
    };

    if (!root.search || !root.category || !root.subcategory || !root.viewer || !root.taskList) {
        return;
    }

    const state = {
        rows: [],
        filteredRows: [],
        activeId: '',
        activeView: 'summary',
        activeCategory: 'all',
        activeSubcategory: 'all',
        query: ''
    };

    bindCaseIndexEvents(root, state);
    loadCsbenchRows(root, state);
}

async function loadCsbenchRows(root, state) {
    try {
        const response = await fetch(CSBENCH_DATASET_ROWS_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        const rows = (payload.rows || []).map(item => item.row).filter(Boolean);
        if (rows.length === 0) {
            throw new Error('No rows returned');
        }

        state.rows = rows;
        root.fetchStatus.textContent = 'Live dataset';
    } catch (error) {
        state.rows = CSBENCH_FALLBACK_CASES;
        root.fetchStatus.textContent = 'Fallback preview';
        root.viewer.innerHTML = `<div class="case-viewer-status case-viewer-error">Live dataset is unavailable in this browser session, so a small static preview is shown. ${escapeHtml(error.message || '')}</div>`;
    }

    state.activeId = state.rows[0] ? state.rows[0].id : '';
    populateCaseFilters(root, state);
    applyCaseFilters(root, state);
}

function bindCaseIndexEvents(root, state) {
    root.search.addEventListener('input', () => {
        state.query = root.search.value.trim().toLowerCase();
        applyCaseFilters(root, state);
    });

    root.category.addEventListener('change', () => {
        state.activeCategory = root.category.value;
        state.activeSubcategory = 'all';
        populateSubcategoryFilter(root, state);
        renderCategoryIndex(root, state);
        applyCaseFilters(root, state);
    });

    root.subcategory.addEventListener('change', () => {
        state.activeSubcategory = root.subcategory.value;
        applyCaseFilters(root, state);
    });

    [root.summaryBtn, root.fullBtn].forEach(button => {
        button.addEventListener('click', () => {
            state.activeView = button.dataset.view;
            root.summaryBtn.classList.toggle('active', state.activeView === 'summary');
            root.fullBtn.classList.toggle('active', state.activeView === 'full');
            renderActiveCase(root, state);
        });
    });
}

function populateCaseFilters(root, state) {
    const categories = uniqueSorted(state.rows.map(row => row.category));
    root.category.innerHTML = [
        '<option value="all">All categories</option>',
        ...categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    ].join('');

    root.taskCount.textContent = `${state.rows.length} tasks`;
    root.categoryCount.textContent = `${categories.length} categories`;
    populateSubcategoryFilter(root, state);
    renderCategoryIndex(root, state);
}

function populateSubcategoryFilter(root, state) {
    const pool = state.activeCategory === 'all'
        ? state.rows
        : state.rows.filter(row => row.category === state.activeCategory);
    const subcategories = uniqueSorted(pool.map(row => row.sub_category));

    root.subcategory.innerHTML = [
        '<option value="all">All sub-categories</option>',
        ...subcategories.map(subcategory => `<option value="${escapeHtml(subcategory)}">${escapeHtml(subcategory)}</option>`)
    ].join('');
    root.subcategory.value = state.activeSubcategory;
}

function renderCategoryIndex(root, state) {
    const counts = state.rows.reduce((acc, row) => {
        const category = row.category || 'Unknown';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const categories = uniqueSorted(Object.keys(counts));
    root.categoryIndex.innerHTML = [
        `<button type="button" class="case-category-btn ${state.activeCategory === 'all' ? 'active' : ''}" data-category="all">
            <span>All</span><strong>${state.rows.length}</strong>
        </button>`,
        ...categories.map(category => `
            <button type="button" class="case-category-btn ${state.activeCategory === category ? 'active' : ''}" data-category="${escapeHtml(category)}">
                <span>${escapeHtml(category)}</span><strong>${counts[category]}</strong>
            </button>
        `)
    ].join('');

    root.categoryIndex.querySelectorAll('.case-category-btn').forEach(button => {
        button.addEventListener('click', () => {
            state.activeCategory = button.dataset.category;
            state.activeSubcategory = 'all';
            root.category.value = state.activeCategory;
            populateSubcategoryFilter(root, state);
            renderCategoryIndex(root, state);
            applyCaseFilters(root, state);
        });
    });
}

function applyCaseFilters(root, state) {
    state.filteredRows = state.rows.filter(row => {
        const matchesCategory = state.activeCategory === 'all' || row.category === state.activeCategory;
        const matchesSubcategory = state.activeSubcategory === 'all' || row.sub_category === state.activeSubcategory;
        const haystack = [
            row.id,
            row.category,
            row.sub_category,
            row.university,
            row.course_id,
            row.course_name,
            row.programming_languages,
            row.lab_name,
            row.task_desc,
            row.specification,
            row.scaffold_desc
        ].join(' ').toLowerCase();
        const matchesQuery = !state.query || haystack.includes(state.query);

        return matchesCategory && matchesSubcategory && matchesQuery;
    });

    if (!state.filteredRows.some(row => row.id === state.activeId)) {
        state.activeId = state.filteredRows[0] ? state.filteredRows[0].id : '';
    }

    renderTaskList(root, state);
    renderActiveCase(root, state);
}

function renderTaskList(root, state) {
    const count = state.filteredRows.length;
    root.filterSummary.textContent = `${count} matching ${count === 1 ? 'task' : 'tasks'}`;

    if (count === 0) {
        root.taskList.innerHTML = '<div class="case-tree-empty">No tasks match the current filters.</div>';
        return;
    }

    root.taskList.innerHTML = state.filteredRows.map(row => `
        <button type="button" class="case-task-item ${row.id === state.activeId ? 'active' : ''}" data-id="${escapeHtml(row.id)}">
            <span class="case-task-id">${escapeHtml(row.id || 'unknown')}</span>
            <span class="case-task-title">${escapeHtml(row.lab_name || row.course_name || row.sub_category || 'Untitled task')}</span>
            <span class="case-task-meta">${escapeHtml(row.sub_category || 'Unknown sub-category')} · ${escapeHtml(row.programming_languages || 'Language n/a')}</span>
        </button>
    `).join('');

    root.taskList.querySelectorAll('.case-task-item').forEach(button => {
        button.addEventListener('click', () => {
            state.activeId = button.dataset.id;
            renderTaskList(root, state);
            renderActiveCase(root, state);
        });
    });
}

function renderActiveCase(root, state) {
    const row = state.rows.find(item => item.id === state.activeId);
    if (!row) {
        root.currentId.textContent = 'No task selected';
        root.currentType.textContent = 'Task type';
        root.currentLanguage.textContent = 'Language';
        root.currentMeta.textContent = 'Select a task to preview';
        root.viewer.innerHTML = '<div class="case-viewer-status">Select a task from the index to preview it.</div>';
        return;
    }

    root.currentId.textContent = row.id || 'Unknown id';
    root.currentType.textContent = [row.category, row.sub_category].filter(Boolean).join(' / ') || 'Unknown type';
    root.currentLanguage.textContent = row.programming_languages || row.language || 'Language n/a';
    root.currentMeta.textContent = `${row.university || 'Unknown university'} · ${row.course_name || row.course_id || 'Unknown course'}`;

    if (state.activeView === 'full') {
        renderFullCaseRecord(root.viewer, row);
    } else {
        renderCaseSummary(root.viewer, row);
    }
}

function renderCaseSummary(container, row) {
    const fields = [
        ['task_desc', 'Task Description'],
        ['specification', 'Specification'],
        ['scaffold_desc', 'Scaffold Description']
    ];

    container.innerHTML = `
        <div class="case-summary">
            ${fields.map(([key, label]) => `
                <article class="case-field">
                    <h4>${label}</h4>
                    <div class="case-field-key">${key}</div>
                    <p class="case-field-body">${escapeHtml(row[key] || 'Not provided.')}</p>
                </article>
            `).join('')}
        </div>
    `;
}

function renderFullCaseRecord(container, row) {
    const pre = document.createElement('pre');
    pre.className = 'case-json';
    pre.textContent = JSON.stringify(row, null, 2);
    container.innerHTML = '';
    container.appendChild(pre);
}

function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));
}
