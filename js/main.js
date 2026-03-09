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
