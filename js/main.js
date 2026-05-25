// CSBench project page - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initNavigationHighlight();
    initPageNavigation();
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

    const updateActiveSection = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        if (!current) {
            current = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
}

/* ========================================
   Page Navigation
   ======================================== */
function initPageNavigation() {
    const nav = document.querySelector('nav[data-page]');
    if (!nav) return;

    const currentPage = nav.dataset.page;
    nav.querySelectorAll('[data-page-link]').forEach(link => {
        link.classList.toggle('active', link.dataset.pageLink === currentPage);
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
            background: rgba(37, 99, 235, 0.08);
            z-index: 9999;
            pointer-events: none;
        }
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #2563eb 0%, #38bdf8 50%, #ffd166 100%);
            width: 0%;
            transition: width 0.1s ease;
            box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
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
            background: rgba(37, 99, 235, 0.15);
            border: 1px solid rgba(37, 99, 235, 0.25);
            color: #2563eb;
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
            background: rgba(37, 99, 235, 0.25);
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.15);
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
   Case File Tree Renderer
   ======================================== */
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

    const fileButton = document.createElement(state && state.sourceBase && !onFileSelect ? 'a' : 'button');
    if (fileButton.tagName === 'BUTTON') {
        fileButton.type = 'button';
    } else {
        fileButton.href = getTaskSourceUrl(state.taskId, node.path);
        fileButton.target = '_blank';
        fileButton.rel = 'noopener noreferrer';
    }

    fileButton.className = `case-tree-file${onFileSelect ? '' : ' case-tree-file-static'}`;
    fileButton.dataset.filePath = node.path;
    fileButton.title = node.path;
    fileButton.innerHTML = `
        <span class="case-tree-file-indent" aria-hidden="true"></span>
        <span class="case-tree-icon ${getFileIconClass(node.name)}" aria-hidden="true">
            <span class="codicon codicon-file"></span>
        </span>
        <span class="case-tree-name">${escapeHtml(node.name)}</span>
    `;

    if (onFileSelect) {
        fileButton.addEventListener('click', () => {
            onFileSelect(node.path, fileButton);
        });
    } else if (fileButton.tagName === 'BUTTON') {
        fileButton.disabled = true;
    }

    return fileButton;
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
   ======================================== */
const CSBENCH_HF_ROWS_URL = 'https://datasets-server.huggingface.co/rows?dataset=BytedTsinghua-SIA%2FCSBench&config=default&split=test&offset=0&length=100';
const CSBENCH_LOCAL_ROWS_URL = 'data/csbench-dataset-rows-v2.json';
const CSBENCH_TASKS_BASE_URL = 'https://anonymous.4open.science/r/CSBench/tasks';

const CSBENCH_ANNOTATION_FIELDS = [
    ['task_desc', 'Task Description'],
    ['specification', 'Specification'],
    ['scaffold_desc', 'Scaffold Description'],
    ['ut_desc', 'Unit Test Description']
];

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
        taskList: document.getElementById('csbench-task-list'),
        viewer: document.getElementById('csbench-case-viewer'),
        filterSummary: document.getElementById('csbench-filter-summary')
    };

    if (!root.search || !root.category || !root.subcategory || !root.viewer || !root.taskList) {
        return;
    }

    const state = {
        rows: [],
        filteredRows: [],
        dataSourceLabel: '',
        activeId: '',
        activeCategory: 'all',
        activeSubcategory: 'all',
        query: ''
    };

    bindCaseIndexEvents(root, state);
    loadCsbenchRows(root, state);
}

async function loadCsbenchRows(root, state) {
    try {
        state.rows = await loadHuggingFaceRows();
        state.dataSourceLabel = 'Hugging Face dataset';
    } catch (hfError) {
        try {
            state.rows = await loadLocalRows();
            state.dataSourceLabel = 'local dataset snapshot';
        } catch (localError) {
            state.rows = CSBENCH_FALLBACK_CASES;
            state.dataSourceLabel = 'static fallback';
            root.viewer.innerHTML = `<div class="case-viewer-status case-viewer-error">Dataset loading failed, so a small static preview is shown. ${escapeHtml(hfError.message || '')}</div>`;
        }
    }

    state.activeId = state.rows[0] ? state.rows[0].id : '';
    populateCaseFilters(root, state);
    applyCaseFilters(root, state);
}

async function loadHuggingFaceRows() {
    const response = await fetch(CSBENCH_HF_ROWS_URL, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Hugging Face rows API returned HTTP ${response.status}`);
    }

    const payload = await response.json();
    const rows = Array.isArray(payload.rows)
        ? payload.rows.map(item => item && item.row).filter(Boolean)
        : [];

    if (rows.length === 0) {
        throw new Error('Hugging Face rows API returned no rows');
    }

    return rows.map(normalizeCaseRow);
}

async function loadLocalRows() {
    const response = await fetch(CSBENCH_LOCAL_ROWS_URL);
    if (!response.ok) {
        throw new Error(`Local dataset snapshot returned HTTP ${response.status}`);
    }

    const rows = (await response.json()).filter(Boolean);
    if (rows.length === 0) {
        throw new Error('Local dataset snapshot returned no rows');
    }

    return rows.map(normalizeCaseRow);
}

function normalizeCaseRow(row) {
    return {
        ...row,
        id: normalizeTaskId(row.id)
    };
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
        applyCaseFilters(root, state);
    });

    root.subcategory.addEventListener('change', () => {
        state.activeSubcategory = root.subcategory.value;
        applyCaseFilters(root, state);
    });

}

function populateCaseFilters(root, state) {
    const categories = uniqueSorted(state.rows.map(row => row.category));
    root.category.innerHTML = [
        '<option value="all">All categories</option>',
        ...categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    ].join('');

    populateSubcategoryFilter(root, state);
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

function applyCaseFilters(root, state) {
    state.filteredRows = state.rows.filter(row => {
        const matchesCategory = state.activeCategory === 'all' || row.category === state.activeCategory;
        const matchesSubcategory = state.activeSubcategory === 'all' || row.sub_category === state.activeSubcategory;
        const haystack = Object.values(row).join(' ').toLowerCase();
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
            <span class="case-task-meta">${escapeHtml([row.sub_category, row.university].filter(Boolean).join(' · ') || 'Unknown sub-category')}</span>
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
        root.viewer.innerHTML = '<div class="case-viewer-status">Select a task from the index to preview it.</div>';
        return;
    }

    renderCaseDetail(root.viewer, row, state);
}

function renderCaseDetail(container, row) {
    const taskTreeMarkup = renderCaseTreeMarkup(row);

    container.innerHTML = `
        <div class="case-detail-layout">
            ${renderCaseTagPanel(row)}
            <div class="case-main-column">
                <div class="case-summary">
                    ${CSBENCH_ANNOTATION_FIELDS.map(([key, label]) => renderAnnotationField(row, key, label)).join('')}
                </div>
            </div>
            <div class="case-tree-column">
                ${taskTreeMarkup}
            </div>
        </div>
    `;

    hydrateCaseTree(container, row);
}

function renderCaseTagPanel(row) {
    const taskId = normalizeTaskId(row.id);
    const codeUrl = getTaskSourceUrl(taskId);
    const displayId = (row.id || taskId || 'task').toUpperCase();
    const displayName = row.lab_name || row.course_name || row.sub_category || 'Untitled task';
    const categoryVariant = `category-${normalizeTagClass(row.category)}`;
    const categoryText = [row.category, row.sub_category].filter(Boolean).join(' - ') || 'Not provided';
    const courseText = [row.university, row.course_id].filter(Boolean).join(' - ') || 'Not provided';
    const labText = [row.lab_name, row.course_name].filter(Boolean).join(' - ') || 'Not provided';

    return `
        <div class="case-tag-panel" role="region" aria-label="Task resources and dataset fields">
            <div class="case-tag-heading">
                <h4>
                    <a class="case-title-id" href="${escapeHtml(codeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(displayId)}</a>
                    <span class="case-title-name">${escapeHtml(displayName)}</span>
                </h4>
            </div>
            <div class="case-tag-cloud">
                <div class="case-tag-row">
                    ${renderValueTag('category', categoryText, categoryVariant)}
                    ${renderLinkedValueTag('course', courseText, row.course_url, 'course')}
                    ${renderLinkedValueTag('lab', labText, row.lab_url, 'lab')}
                </div>
                <div class="case-tag-row">
                    ${renderValueTag('programming_languages', formatListLikeValue(row.programming_languages), 'language')}
                    ${renderValueTag('language', row.language, 'annotation-language')}
                    ${renderValueTag('pass_to_pass', row.pass_to_pass, 'pass')}
                    ${renderValueTag('fail_to_pass', row.fail_to_pass, 'fail')}
                </div>
            </div>
        </div>
    `;
}

function renderValueTag(label, value, variant = '') {
    const text = formatMultilineValue(value);
    const classes = ['case-data-tag', variant && `case-data-tag-${variant}`].filter(Boolean).join(' ');
    return `
        <span class="${classes}">
            <span class="case-tag-label">${escapeHtml(label)}</span>
            <span class="case-tag-value">${escapeHtml(text || 'Not provided')}</span>
        </span>
    `;
}

function renderLinkedValueTag(label, value, href, variant = '') {
    const text = formatMultilineValue(value) || 'Not provided';
    const url = formatMultilineValue(href);
    if (!url) return renderValueTag(label, text, 'muted');
    const classes = ['case-data-tag', variant && `case-data-tag-${variant}`].filter(Boolean).join(' ');

    return `
        <span class="${classes}">
            <span class="case-tag-label">${escapeHtml(label)}</span>
            <a class="case-tag-value case-tag-value-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>
        </span>
    `;
}

function renderAnnotationField(row, key, label) {
    const value = formatMultilineValue(row[key]);

    return `
        <article class="case-field" aria-label="${escapeHtml(label)}">
            <div class="case-field-title">${escapeHtml(label)}</div>
            <div class="case-text-body">${escapeHtml(value || 'Not provided')}</div>
        </article>
    `;
}

function renderCaseTreeMarkup(row) {
    const taskTrees = window.CSBENCH_TASK_TREES && window.CSBENCH_TASK_TREES.tasks;
    const taskId = normalizeTaskId(row.id);
    const taskEntry = taskTrees && taskTrees[taskId.toUpperCase()];
    const taskUrl = getTaskSourceUrl(taskId);

    if (!taskEntry || !taskEntry.tree) {
        return `
            <div class="case-tree-preview">
                <div class="case-tree-preview-header">
                    <span>${escapeHtml(taskId || 'unknown')}</span>
                    <a href="${escapeHtml(taskUrl)}" target="_blank" rel="noopener noreferrer">Open task source</a>
                </div>
                <div class="case-viewer-status case-viewer-error">File tree is unavailable for ${escapeHtml(taskId || 'this task')}.</div>
            </div>
        `;
    }

    return `
        <div class="case-tree-preview" data-task-id="${escapeHtml(taskId)}">
            <div class="case-tree-preview-header">
                <span>${escapeHtml(taskId)}</span>
                <span>${taskEntry.files} files · ${taskEntry.folders} folders</span>
            </div>
            <div class="case-tree case-tree-readonly" data-case-tree></div>
        </div>
    `;
}

function hydrateCaseTree(container, row) {
    const treeContainer = container.querySelector('[data-case-tree]');
    if (!treeContainer) return;

    const taskTrees = window.CSBENCH_TASK_TREES && window.CSBENCH_TASK_TREES.tasks;
    const taskId = normalizeTaskId(row.id);
    const taskEntry = taskTrees && taskTrees[taskId.toUpperCase()];
    if (!taskEntry || !taskEntry.tree) return;

    const normalizedTree = normalizeTreeForTaskSource(taskEntry.tree, taskId);
    treeContainer.appendChild(buildTreeNode(normalizedTree, {
        sourceBase: CSBENCH_TASKS_BASE_URL,
        taskId
    }, null));
}

function normalizeTreeForTaskSource(tree, taskId) {
    const originalRoot = tree && tree.name ? String(tree.name) : taskId;

    function visit(node) {
        const cloned = { ...node };
        const rawPath = String(cloned.path || cloned.name || '');
        cloned.path = rawPath.replace(originalRoot, taskId);

        if (rawPath === originalRoot || cloned.name === originalRoot) {
            cloned.name = taskId;
            cloned.path = taskId;
        }

        if (Array.isArray(node.children)) {
            cloned.children = node.children.map(visit);
        }

        return cloned;
    }

    return visit(tree);
}

function formatMultilineValue(value) {
    return value == null ? '' : String(value).trim();
}

function formatListLikeValue(value) {
    const parsed = parseListLikeValue(value);
    return parsed.length ? parsed.join(', ') : String(value).trim();
}

function parseListLikeValue(value) {
    if (Array.isArray(value)) {
        return value.map(item => String(item).trim()).filter(Boolean);
    }

    const trimmed = String(value).trim();
    if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) return trimmed ? [trimmed] : [];

    return trimmed
        .replace(/^\[/, '')
        .replace(/\]$/, '')
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
}

function normalizeTaskId(value) {
    return String(value || '').trim().toLowerCase();
}

function normalizeTagClass(value) {
    return String(value || 'unknown').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'unknown';
}

function getTaskSourceUrl(taskId, path) {
    const normalizedTaskId = normalizeTaskId(taskId);
    const normalizedPath = path ? String(path).replace(/^\/+/, '') : normalizedTaskId;
    return `${CSBENCH_TASKS_BASE_URL}/${encodeURI(normalizedPath || normalizedTaskId)}`;
}

function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));
}
