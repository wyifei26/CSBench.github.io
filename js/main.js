// CSBench project page - Main JavaScript

const CSBENCH_LANG_STORAGE_KEY = 'csbench-lang';
const CSBENCH_DEFAULT_LANG = 'en';

const I18N_MESSAGES = {
    en: {
        'lang.toggle': '中文',
        'lang.aria': 'Switch to Chinese',
        'title.home': 'CSBench | Evaluating Project-Level System Construction in CS',
        'title.benchmark': 'Benchmark Details | CSBench',
        'title.case': 'Case Study | CSBench',
        'home.heroTitle': 'A Comprehensive Benchmark for Evaluating<br>Project-Level System Construction in Computer Science',
        'home.leaderboardIntro': 'We evaluate <strong>state-of-the-art LLMs</strong> using a minimalist agent loop with stateless Bash execution and file editing tools. Each task allows up to 50 interaction rounds. Results are <strong>averaged over 4 independent runs (avg@4)</strong>.',
        'home.perfCaption': 'Model performance by category. Numbers in parentheses indicate the number of tasks. All results are avg@4.',
        'home.abstract1': 'While LLM-based coding agents have advanced to repository-scale engineering, existing benchmarks predominantly focus on <strong>software maintenance</strong>, overlooking the foundational capability of <em>system construction</em>.',
        'home.abstract2': 'We introduce <strong>CSBench</strong>, a benchmark evaluating project-level <strong>Spec-to-Code</strong> implementation across core computer science domains (e.g., OS, compilers, databases). CSBench features <strong>100 expert-curated tasks</strong> from top-tier university assignments within containerized environments.',
        'home.abstract3': 'Evaluating 13 state-of-the-art LLMs reveals a stark performance disparity: even top-tier models like GPT-5.2 see success rates plummet from over 90% in algorithmic tasks to below 35% in system-level domains. Our analysis identifies a <strong>fundamental deficiency in systemic reasoning and construction knowledge</strong> as the primary bottleneck, where agents either terminate prematurely due to overconfidence or fail to translate execution feedback into valid architectural fixes.',
        'home.highlightCoverage': '100 tasks spanning <strong>19 sub-topics</strong> across 4 major categories (Systems, AI, Application, Others), evaluating broad "CS mastery" rather than just language proficiency.',
        'home.highlightReasoning': 'Tasks require implementing complex systems from scratch - B+ Trees, TCP stacks, OS kernels - demanding <strong>long-horizon planning</strong> and strict logical consistency beyond simple pattern matching.',
        'home.highlightRigor': 'Sourced from <strong>top-tier university assignments</strong> (MIT, Berkeley, Stanford, etc.), each task comes with expert-curated test suites and containerized Docker environments for reproducible evaluation.',
        'home.citationIntro': 'If you find CSBench useful in your research, please cite:',
        'details.benchmarkIntro': 'Each CSBench task is formally defined as a tuple <strong>T = (S, C<sub>init</sub>, U, E)</strong>: a <em>Specification</em>, <em>Initial Scaffold</em>, <em>Test Suite</em>, and a containerized <em>Environment</em>. Given (S, C<sub>init</sub>), a model produces a completed implementation; a task is solved when all tests pass inside the Docker container.',
        'details.pipelineIntro': 'CSBench employs an <strong>adversarial, expert-in-the-loop workflow</strong> to transform heterogeneous courseware into standardized, execution-based benchmark tasks.',
        'details.sourcingDesc': 'Candidate projects sourced from open-source CS courses at top-tier universities, organized by a comprehensive topic taxonomy (System, AI, Application, Others). Priority given to projects with non-trivial, multi-file starter scaffolds.',
        'details.annotationDesc': 'Domain experts construct task artifacts with adversarial review: <strong>Annotators</strong> build scaffold code, specifications, and test suites; independent <strong>Reviewers</strong> audit outputs and iterate until strict criteria are met.',
        'details.qaDesc': 'Three-layer verification: <strong>Automated checks</strong> (solvability, layout), <strong>AI-assisted auditing</strong> (leakage, ambiguity), and <strong>Human-in-the-loop decision</strong> (spec fidelity, runtime stability).',
        'details.pipelineCaption': 'The three-stage construction pipeline of CSBench: Sourcing, Annotation, and Quality Assurance.',
        'details.domainIntro': 'CSBench spans <strong>4 high-level topics</strong> and <strong>19 sub-topics</strong>, ensuring systematic domain representation. It covers Python (41%), C/C++ (39%), and other mainstream languages including Java, JavaScript, Go, Rust, and Assembly.',
        'details.statsIntro': 'CSBench requires an order-of-magnitude more implementation effort (902 lines edited on average vs. 33 in SWE-Bench), reflecting genuine system construction complexity.',
        'details.resultsIntro': 'Model performance is highly non-uniform across CS domains. Top models perform strongly on algorithmic and logic-heavy topics, but their success rates drop substantially on low-level system construction tasks such as operating systems, databases, and compilers.',
        'details.passkIntro': 'Among the models shown, Pass@k metrics show GPT-5.2 maintains a steady lead in AI and Application categories, while <strong>Gemini-3-Pro demonstrates superior performance in the System category</strong>, consistently outperforming GPT-5.2 across all k values.',
        'details.passkCaption': 'Pass@k performance of representative models across different task categories.',
        'case.searchPlaceholder': 'ID, topic, course, language',
        'case.loading': 'Loading dataset...',
        'case.loadingViewer': 'Loading CSBench dataset...',
        'case.allCategories': 'All categories',
        'case.allSubcategories': 'All sub-categories',
        'case.matchingTasks': '{count} matching {taskWord}',
        'case.taskSingular': 'task',
        'case.taskPlural': 'tasks',
        'case.noTasks': 'No tasks match the current filters.',
        'case.selectTask': 'Select a task from the index to preview it.',
        'case.loadFailed': 'Dataset loading failed, so a small static preview is shown.',
        'case.notProvided': 'Not provided',
        'case.unknownSubcategory': 'Unknown sub-category',
        'case.untitledTask': 'Untitled task',
        'case.emptyFolder': 'empty folder',
        'case.openTaskSource': 'Open task source',
        'case.treeUnavailable': 'File tree is unavailable for {taskId}.',
        'case.filesFolders': '{files} files · {folders} folders',
        'case.field.taskDesc': 'Task Description',
        'case.field.specification': 'Specification',
        'case.field.scaffoldDesc': 'Scaffold Description',
        'case.field.utDesc': 'Unit Test Description',
        'case.resourcesLabel': 'Task resources and dataset fields',
        'ui.copied': '✓ Copied!',
        'ui.scrollTop': 'Scroll to top'
    },
    zh: {
        'lang.toggle': 'EN',
        'lang.aria': '切换到英文',
        'title.home': 'CSBench | 评估计算机科学项目级系统构建能力',
        'title.benchmark': '基准细节 | CSBench',
        'title.case': '案例研究 | CSBench',
        'home.heroTitle': '面向计算机科学项目级系统构建能力评测的<br>综合基准',
        'home.leaderboardIntro': '我们使用极简智能体循环评测<strong>前沿大语言模型</strong>，智能体可调用无状态 Bash 执行与文件编辑工具。每个任务最多允许 50 轮交互，结果为<strong>4 次独立运行的平均值（avg@4）</strong>。',
        'home.perfCaption': '按类别统计的模型表现。括号内数字表示任务数量。所有结果均为 avg@4。',
        'home.abstract1': '尽管基于大语言模型的编码智能体已经能够处理仓库级工程任务，现有基准仍主要聚焦于<strong>软件维护</strong>，忽视了基础性的<em>系统构建</em>能力。',
        'home.abstract2': '我们提出 <strong>CSBench</strong>，用于评估核心计算机科学领域（如操作系统、编译器、数据库）中项目级 <strong>Spec-to-Code</strong> 实现能力。CSBench 包含来自顶尖高校课程作业的 <strong>100 个专家策划任务</strong>，并在容器化环境中运行。',
        'home.abstract3': '对 13 个前沿大语言模型的评测显示出显著性能差距：即使是 GPT-5.2 等顶级模型，在算法类任务中成功率超过 90%，但在系统级领域会跌至 35% 以下。我们的分析指出，<strong>系统性推理与构建知识的根本缺陷</strong>是主要瓶颈，智能体要么因过度自信而提前终止，要么无法将执行反馈转化为有效的架构修复。',
        'home.highlightCoverage': '100 个任务覆盖 4 大类别（System、AI、Application、Others）下的 <strong>19 个子主题</strong>，评估广义“CS 掌握能力”，而不只是语言熟练度。',
        'home.highlightReasoning': '任务要求从零实现复杂系统，例如 B+ 树、TCP 协议栈和操作系统内核，需要<strong>长程规划</strong>和严格逻辑一致性，远超简单模式匹配。',
        'home.highlightRigor': '任务来自 <strong>MIT、Berkeley、Stanford 等顶尖高校课程作业</strong>，每个任务都配有专家策划测试套件和容器化 Docker 环境，支持可复现实验。',
        'home.citationIntro': '如果 CSBench 对你的研究有帮助，请引用：',
        'details.benchmarkIntro': '每个 CSBench 任务形式化定义为四元组 <strong>T = (S, C<sub>init</sub>, U, E)</strong>：<em>规格说明</em>、<em>初始脚手架</em>、<em>测试套件</em>和容器化<em>环境</em>。给定 (S, C<sub>init</sub>)，模型需要产出完整实现；当所有测试都能在 Docker 容器中通过时，任务才被视为解决。',
        'details.pipelineIntro': 'CSBench 采用<strong>对抗式、专家参与的工作流</strong>，将异构课程材料转化为标准化、基于执行结果的基准任务。',
        'details.sourcingDesc': '候选项目来自顶尖高校开源计算机科学课程，并按照完整主题体系（System、AI、Application、Others）组织。我们优先选择具有非平凡、多文件初始脚手架的项目。',
        'details.annotationDesc': '领域专家通过对抗式审查构建任务产物：<strong>标注者</strong>负责编写脚手架代码、规格说明与测试套件；独立<strong>审查者</strong>审核输出并迭代，直到满足严格标准。',
        'details.qaDesc': '三层验证流程：<strong>自动检查</strong>（可解性、布局）、<strong>AI 辅助审计</strong>（泄漏、歧义）以及<strong>人在环决策</strong>（规格忠实度、运行时稳定性）。',
        'details.pipelineCaption': 'CSBench 的三阶段构建流程：来源筛选、任务标注与质量保障。',
        'details.domainIntro': 'CSBench 覆盖 <strong>4 个高层主题</strong>和 <strong>19 个子主题</strong>，确保系统性的领域代表性。它涵盖 Python（41%）、C/C++（39%），以及 Java、JavaScript、Go、Rust、Assembly 等主流语言。',
        'details.statsIntro': 'CSBench 平均需要编辑 902 行代码，相比 SWE-Bench 的 33 行高出一个数量级，体现了真实系统构建任务的复杂度。',
        'details.resultsIntro': '模型在不同 CS 领域的表现高度不均衡。顶级模型在算法和逻辑密集任务上表现较强，但在操作系统、数据库、编译器等低层系统构建任务上的成功率显著下降。',
        'details.passkIntro': '在展示的模型中，Pass@k 指标显示 GPT-5.2 在 AI 和 Application 类别保持稳定领先；同时，<strong>Gemini-3-Pro 在 System 类别表现更优</strong>，在所有 k 值上持续超过 GPT-5.2。',
        'details.passkCaption': '代表性模型在不同任务类别上的 Pass@k 表现。',
        'case.searchPlaceholder': 'ID、主题、课程、语言',
        'case.loading': '正在加载数据集...',
        'case.loadingViewer': '正在加载 CSBench 数据集...',
        'case.allCategories': '全部类别',
        'case.allSubcategories': '全部子类别',
        'case.matchingTasks': '共 {count} 个匹配任务',
        'case.taskSingular': 'task',
        'case.taskPlural': 'tasks',
        'case.noTasks': '当前筛选条件下没有匹配任务。',
        'case.selectTask': '从左侧任务索引中选择一个任务进行预览。',
        'case.loadFailed': '数据集加载失败，当前显示一个小型静态预览。',
        'case.notProvided': '未提供',
        'case.unknownSubcategory': '未知子类别',
        'case.untitledTask': '未命名任务',
        'case.emptyFolder': '空文件夹',
        'case.openTaskSource': '打开任务源码',
        'case.treeUnavailable': '{taskId} 的文件树不可用。',
        'case.filesFolders': '{files} 个文件 · {folders} 个文件夹',
        'case.field.taskDesc': '任务描述',
        'case.field.specification': '规格说明',
        'case.field.scaffoldDesc': '脚手架描述',
        'case.field.utDesc': '单元测试描述',
        'case.resourcesLabel': '任务资源与数据集字段',
        'ui.copied': '✓ 已复制',
        'ui.scrollTop': '回到顶部'
    }
};

const I18N_TEXT_MAP = {
    'Skip to main content': '跳到主要内容',
    'Home': '首页',
    'Benchmark Details': '基准细节',
    'Case Study': '案例研究',
    'Paper': '论文',
    'GitHub': 'GitHub',
    'Dataset': '数据集',
    'Expert Tasks': '专家任务',
    'CS Topics': 'CS 主题',
    '#Golden Patch Lines': 'Golden Patch 行数',
    '#Golden Patch Files': 'Golden Patch 文件数',
    'Leaderboard': '排行榜',
    'Performance by Category': '按类别表现',
    'Overall': '总体',
    'Details': '明细',
    'Model': '模型',
    'System (48)': 'System（48）',
    'AI (28)': 'AI（28）',
    'Application (19)': 'Application（19）',
    'Others (5)': 'Others（5）',
    'Overall (100)': '总体（100）',
    'Abstract': '摘要',
    'Key Highlight': '关键亮点',
    '🏗️ Systematic Domain Coverage': '🏗️ 系统化领域覆盖',
    '🧠 Deep Reasoning Requirements': '🧠 深度推理要求',
    '🎓 Pedagogical Rigor': '🎓 教学严谨性',
    'Citation': '引用',
    'Benchmark Design': '基准设计',
    'Three-Stage Construction Pipeline': '三阶段构建流程',
    'Sourcing': '来源筛选',
    'Annotation': '任务标注',
    'Quality Assurance': '质量保障',
    'Statistic': '统计',
    'Domain & Language Distribution': '领域与语言分布',
    'Course Topic Taxonomy': '课程主题分类',
    'Programming Languages': '编程语言',
    'Dataset Statistics Comparison': '数据集统计对比',
    'Metric': '指标',
    'Attribute': '属性',
    'Mean': '平均',
    'Max': '最大',
    'Task Specification': '任务规格',
    'Length (words)': '长度（词）',
    'Initial Code': '初始代码',
    '# Files (non-test)': '文件数（非测试）',
    '# Lines (non-test)': '行数（非测试）',
    'Gold Patch': 'Gold Patch',
    '# Lines edited': '编辑行数',
    '# Hunks edited': '编辑 hunk 数',
    '# Files edited': '编辑文件数',
    'Test Suite': '测试套件',
    '# Fail to Pass': 'Fail-to-Pass 数',
    '# Total': '总测试数',
    'Detailed Results': '详细结果',
    'Detailed Performance by Topic (Representative Models)': '代表性模型的主题级详细表现',
    'Topic': '主题',
    'System (48 tasks)': 'System（48 个任务）',
    'Operating System (12)': '操作系统（12）',
    'System Fundamentals (9)': '系统基础（9）',
    'System Security (8)': '系统安全（8）',
    'Computer Network (5)': '计算机网络（5）',
    'Parallel & Distributed (5)': '并行与分布式（5）',
    'Computer Architecture (4)': '计算机体系结构（4）',
    'Database System (4)': '数据库系统（4）',
    'Compiler (1)': '编译器（1）',
    'AI (28 tasks)': 'AI（28 个任务）',
    'Deep Learning (13)': '深度学习（13）',
    'Machine Learning (9)': '机器学习（9）',
    'Introductory AI (4)': 'AI 导论（4）',
    'ML System (2)': '机器学习系统（2）',
    'Application (19 tasks)': 'Application（19 个任务）',
    'Web Development (7)': 'Web 开发（7）',
    'Data Struct & Algo (4)': '数据结构与算法（4）',
    'Programming Fundamentals (4)': '编程基础（4）',
    'Data Science (3)': '数据科学（3）',
    'Others (5 tasks)': 'Others（5 个任务）',
    'Computer Graphics (3)': '计算机图形学（3）',
    'Mathematics (2)': '数学（2）',
    'Pass@k Analysis': 'Pass@k 分析',
    'Benchmark Case Index': '基准案例索引',
    'Tasks': '任务',
    'Search': '搜索',
    'Category': '类别',
    'Sub-category': '子类别'
};

function getSavedLanguage() {
    const saved = localStorage.getItem(CSBENCH_LANG_STORAGE_KEY);
    return saved === 'zh' ? 'zh' : CSBENCH_DEFAULT_LANG;
}

function t(key, params = {}) {
    const lang = getSavedLanguage();
    const messages = I18N_MESSAGES[lang] || I18N_MESSAGES[CSBENCH_DEFAULT_LANG];
    const fallback = I18N_MESSAGES[CSBENCH_DEFAULT_LANG][key] || key;
    return String(messages[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => params[name] ?? '');
}

function setSavedLanguage(lang) {
    const normalized = lang === 'zh' ? 'zh' : 'en';
    localStorage.setItem(CSBENCH_LANG_STORAGE_KEY, normalized);
    applyLanguage(normalized);
    document.dispatchEvent(new CustomEvent('csbench:language-change', { detail: { lang: normalized } }));
}

function initLanguageToggle() {
    document.querySelectorAll('[data-lang-toggle]').forEach(button => {
        button.addEventListener('click', () => {
            setSavedLanguage(getSavedLanguage() === 'zh' ? 'en' : 'zh');
        });
    });
}

function applyLanguage(lang = getSavedLanguage()) {
    const messages = I18N_MESSAGES[lang] || I18N_MESSAGES.en;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (!messages[key] && !I18N_MESSAGES.en[key]) return;
        const value = messages[key] || I18N_MESSAGES.en[key];
        if (element.dataset.i18nHtml === 'true') {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        element.placeholder = messages[key] || I18N_MESSAGES.en[key] || element.placeholder;
    });

    document.querySelectorAll('[data-lang-toggle]').forEach(button => {
        button.textContent = messages['lang.toggle'];
        button.setAttribute('aria-label', messages['lang.aria']);
        button.setAttribute('title', messages['lang.aria']);
    });

    document.querySelectorAll('.scroll-to-top').forEach(button => {
        button.setAttribute('aria-label', messages['ui.scrollTop']);
    });

    translateExactTextNodes(lang);
}

function translateExactTextNodes(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE', 'PRE', 'CODE'].includes(parent.tagName)) {
                return NodeFilter.FILTER_REJECT;
            }

            const text = node.nodeValue.trim();
            if (!text) return NodeFilter.FILTER_REJECT;
            if (!node.__csbenchOriginalText && !I18N_TEXT_MAP[text]) {
                return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
        if (!node.__csbenchOriginalText) {
            node.__csbenchOriginalText = node.nodeValue;
        }

        if (lang === 'en') {
            node.nodeValue = node.__csbenchOriginalText;
            return;
        }

        const original = node.__csbenchOriginalText;
        const trimmed = original.trim();
        const translated = I18N_TEXT_MAP[trimmed];
        if (!translated) return;

        const leading = original.match(/^\s*/)[0];
        const trailing = original.match(/\s*$/)[0];
        node.nodeValue = `${leading}${translated}${trailing}`;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initLanguageToggle();
    applyLanguage(getSavedLanguage());
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
    scrollBtn.setAttribute('aria-label', t('ui.scrollTop'));
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
                button.textContent = t('ui.copied');
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
            emptyState.textContent = t('case.emptyFolder');
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
    ['task_desc', 'case.field.taskDesc'],
    ['specification', 'case.field.specification'],
    ['scaffold_desc', 'case.field.scaffoldDesc'],
    ['ut_desc', 'case.field.utDesc']
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
            root.viewer.innerHTML = `<div class="case-viewer-status case-viewer-error">${escapeHtml(t('case.loadFailed'))} ${escapeHtml(hfError.message || '')}</div>`;
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

    document.addEventListener('csbench:language-change', () => {
        populateCaseFilters(root, state);
        applyCaseFilters(root, state);
    });
}

function populateCaseFilters(root, state) {
    const categories = uniqueSorted(state.rows.map(row => row.category));
    root.category.innerHTML = [
        `<option value="all">${escapeHtml(t('case.allCategories'))}</option>`,
        ...categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(localizeCategoryValue(category))}</option>`)
    ].join('');
    root.category.value = state.activeCategory;

    populateSubcategoryFilter(root, state);
}

function populateSubcategoryFilter(root, state) {
    const pool = state.activeCategory === 'all'
        ? state.rows
        : state.rows.filter(row => row.category === state.activeCategory);
    const subcategories = uniqueSorted(pool.map(row => row.sub_category));

    root.subcategory.innerHTML = [
        `<option value="all">${escapeHtml(t('case.allSubcategories'))}</option>`,
        ...subcategories.map(subcategory => `<option value="${escapeHtml(subcategory)}">${escapeHtml(localizeCategoryValue(subcategory))}</option>`)
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
    root.filterSummary.textContent = t('case.matchingTasks', {
        count,
        taskWord: t(count === 1 ? 'case.taskSingular' : 'case.taskPlural')
    });

    if (count === 0) {
        root.taskList.innerHTML = `<div class="case-tree-empty">${escapeHtml(t('case.noTasks'))}</div>`;
        return;
    }

    root.taskList.innerHTML = state.filteredRows.map(row => `
        <button type="button" class="case-task-item ${row.id === state.activeId ? 'active' : ''}" data-id="${escapeHtml(row.id)}">
            <span class="case-task-id">${escapeHtml(row.id || 'unknown')}</span>
            <span class="case-task-title">${escapeHtml(row.lab_name || row.course_name || localizeCategoryValue(row.sub_category) || t('case.untitledTask'))}</span>
            <span class="case-task-meta">${escapeHtml([localizeCategoryValue(row.sub_category), row.university].filter(Boolean).join(' · ') || t('case.unknownSubcategory'))}</span>
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
        root.viewer.innerHTML = `<div class="case-viewer-status">${escapeHtml(t('case.selectTask'))}</div>`;
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
                    ${CSBENCH_ANNOTATION_FIELDS.map(([key, labelKey]) => renderAnnotationField(row, key, t(labelKey))).join('')}
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
    const displayName = row.lab_name || row.course_name || localizeCategoryValue(row.sub_category) || t('case.untitledTask');
    const categoryVariant = `category-${normalizeTagClass(row.category)}`;
    const categoryText = [localizeCategoryValue(row.category), localizeCategoryValue(row.sub_category)].filter(Boolean).join(' - ') || t('case.notProvided');
    const courseText = [row.university, row.course_id].filter(Boolean).join(' - ') || t('case.notProvided');
    const labText = [row.lab_name, row.course_name].filter(Boolean).join(' - ') || t('case.notProvided');

    return `
        <div class="case-tag-panel" role="region" aria-label="${escapeHtml(t('case.resourcesLabel'))}">
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
            <span class="case-tag-label">${escapeHtml(localizeCaseTagLabel(label))}</span>
            <span class="case-tag-value">${escapeHtml(text || t('case.notProvided'))}</span>
        </span>
    `;
}

function renderLinkedValueTag(label, value, href, variant = '') {
    const text = formatMultilineValue(value) || t('case.notProvided');
    const url = formatMultilineValue(href);
    if (!url) return renderValueTag(label, text, 'muted');
    const classes = ['case-data-tag', variant && `case-data-tag-${variant}`].filter(Boolean).join(' ');

    return `
        <span class="${classes}">
            <span class="case-tag-label">${escapeHtml(localizeCaseTagLabel(label))}</span>
            <a class="case-tag-value case-tag-value-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>
        </span>
    `;
}

function renderAnnotationField(row, key, label) {
    const value = formatMultilineValue(row[key]);

    return `
        <article class="case-field" aria-label="${escapeHtml(label)}">
            <div class="case-field-title">${escapeHtml(label)}</div>
            <div class="case-text-body">${escapeHtml(value || t('case.notProvided'))}</div>
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
                    <a href="${escapeHtml(taskUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t('case.openTaskSource'))}</a>
                </div>
                <div class="case-viewer-status case-viewer-error">${escapeHtml(t('case.treeUnavailable', { taskId: taskId || 'this task' }))}</div>
            </div>
        `;
    }

    return `
        <div class="case-tree-preview" data-task-id="${escapeHtml(taskId)}">
            <div class="case-tree-preview-header">
                <span>${escapeHtml(taskId)}</span>
                <span>${escapeHtml(t('case.filesFolders', { files: taskEntry.files, folders: taskEntry.folders }))}</span>
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

function localizeCaseTagLabel(label) {
    if (getSavedLanguage() !== 'zh') return label;

    const labelMap = {
        category: '类别',
        course: '课程',
        lab: '实验',
        programming_languages: '编程语言',
        language: '标注语言',
        pass_to_pass: 'Pass-to-Pass',
        fail_to_pass: 'Fail-to-Pass'
    };

    return labelMap[label] || label;
}

function localizeCategoryValue(value) {
    const text = String(value || '').trim();
    if (getSavedLanguage() !== 'zh' || !text) return text;

    const valueMap = {
        System: 'System',
        AI: 'AI',
        Application: 'Application',
        Others: 'Others',
        'Operating System': '操作系统',
        'System Fundamentals': '系统基础',
        'System Security': '系统安全',
        'Computer Network': '计算机网络',
        'Parallel & Distributed': '并行与分布式',
        'Computer Architecture': '计算机体系结构',
        'Database System': '数据库系统',
        Compiler: '编译器',
        'Deep Learning': '深度学习',
        'Machine Learning': '机器学习',
        'Introductory AI': 'AI 导论',
        'ML System': '机器学习系统',
        'Web Development': 'Web 开发',
        'Data Struct & Algo': '数据结构与算法',
        'Programming Fundamentals': '编程基础',
        'Data Science': '数据科学',
        'Computer Graphics': '计算机图形学',
        Mathematics: '数学'
    };

    return valueMap[text] || text;
}

function getTaskSourceUrl(taskId, path) {
    const normalizedTaskId = normalizeTaskId(taskId);
    const normalizedPath = path ? String(path).replace(/^\/+/, '') : normalizedTaskId;
    return `${CSBENCH_TASKS_BASE_URL}/${encodeURI(normalizedPath || normalizedTaskId)}`;
}

function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));
}
