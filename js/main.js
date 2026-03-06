// Language Localization
const SUPPORTED_LANGUAGES = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'pt', 'ko', 'it', 'ru', 'ar', 'hi', 'vi'];

function getPreferredLanguage() {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('optmo_language');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
    }

    // Fall back to browser language detection
    const locale = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    const lower = locale.toLowerCase();
    
    // Map browser language codes to supported languages
    const languageMap = {
        'zh': 'zh',
        'es': 'es',
        'fr': 'fr',
        'de': 'de',
        'ja': 'ja',
        'pt': 'pt',
        'ko': 'ko',
        'it': 'it',
        'ru': 'ru',
        'ar': 'ar',
        'hi': 'hi',
        'vi': 'vi'
    };
    
    for (const [code, lang] of Object.entries(languageMap)) {
        if (lower.startsWith(code)) {
            console.log('Browser locale:', locale, '→ Detected language:', lang);
            return lang;
        }
    }
    
    console.log('Browser locale:', locale, '→ Detected language: en (fallback)');
    return 'en';
}

function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    localStorage.setItem('optmo_language', lang);
    applySystemLanguage();
    updateSearchSuggestions();
}

function getTranslations() {
    return {
        en: {
            htmlLang: 'en',
            pageTitle: 'OPTMO - AI-Powered Content & Event Automation | Start Free Trial',
            metaDescription: 'OPTMO automates podcast, video, music, and event workflows with AI-powered tools. Save 90% of production time with intelligent automation. Start free today.',
            account: 'Account',
            menuMain: 'MAIN',
            menuCreation: 'CONTENT CREATION',
            menuEvents: 'EVENT ORGANIZATION',
            menuTools: 'TOOLS',
            home: 'Home',
            portfolio: 'Portfolio',
            trending: 'Trending',
            podcast: 'Podcast Automation',
            video: 'Video Production',
            music: 'Music Creation',
            performances: 'Performances',
            parties: 'Parties',
            conferences: 'Conferences',
            projects: 'My Projects',
            workflows: 'Workflows',
            analytics: 'Analytics',
            heroTitle: 'Automate Your Content & Events',
            heroSubtitle: 'AI-powered workflows for podcasts, videos, music, and events - Save 90% of production time and focus on what matters',
            startTrial: 'Start Free Trial',
            contactSales: 'Contact Sales',
            contactInfoTitle: 'Contact Information',
            emailLabel: 'Email:',
            phoneLabel: 'Phone:',
            contactUs: 'Contact Us',
            yourName: 'Your Name *',
            emailAddress: 'Email Address *',
            message: 'Message *',
            sendMessage: 'Send Message',
            formNote: 'This form is powered by Formspree.',
            searchPlaceholder: 'Search...',
            searchTitle: 'Press Ctrl+K or Cmd+K to search',
            searchSuggestions: ['Podcast Automation', 'Video Production', 'Music Creation', 'Event Management', 'Analytics', 'Workflows', 'Projects', 'Pricing'],
            dropdownLogin: 'Login',
            dropdownMyAccount: 'My Account',
            dropdownUpgrade: 'Upgrade to Pro',
            dropdownSupport: 'Support OPTMO',
            dropdownLogout: 'Logout',
            premiumTitle: 'Pro Membership',
            premiumDesc: 'Unlock full automation & AI-powered workflows',
            premiumBtn: 'Upgrade to Pro',
            devTitle: 'Site Under Development',
            devText: 'This website is still being developed. Some features may change or be unavailable. Not all content is finalized or accurate yet. Thank you for your patience!',
            automationTitle: 'How Automation Works',
            automationAuthor: 'AI-Powered',
            automationDate: 'Instant Results',
            automationHeading: 'Complete Workflows in Minutes, Not Days',
            automationDesc: 'OPTMO\'s intelligent automation handles everything from script generation and video editing to event scheduling and vendor coordination. Simply input your requirements, and our AI creates a complete workflow tailored to your needs. Pro members get access to advanced features including multi-platform distribution, real-time analytics, and priority processing.',
            automationCta: 'See Plans & Pricing →',
            servicesTitle: 'Our Services',
            serviceBadgePodcast: 'Podcast',
            serviceBadgeVideo: 'Video',
            serviceBadgeMusic: 'Music',
            serviceBadgeEvents: 'Events',
            serviceBadgeWorkflows: 'Workflows',
            serviceBadgeAnalytics: 'Analytics',
            serviceSummaryPodcast: 'Streamline your podcast workflow with AI-powered editing, intro/outro generation, and multi-platform distribution.',
            serviceSummaryVideo: 'Automate video creation with script generation, voiceover, editing, and optimization for multiple platforms.',
            serviceSummaryMusic: 'AI-powered music composition tailored to your brand, mood, and licensing requirements.',
            serviceSummaryEvents: 'Automate event planning with venue coordination, vendor management, and guest handling.',
            serviceSummaryWorkflows: 'Create tailored automation workflows that fit your specific content creation or event management needs.',
            serviceSummaryAnalytics: 'Track and analyze your content performance with real-time insights and data-driven recommendations.',
            serviceTitle1: 'Podcast Automation',
            serviceTitle2: 'Video Production',
            serviceTitle3: 'Music Creation',
            serviceTitle4: 'Event Organization',
            serviceTitle5: 'Custom Workflows',
            serviceTitle6: 'Performance Analytics',
            plansTitle: 'Membership Plans',
            planRecommended: 'RECOMMENDED',
            planFreeName: 'Free Account',
            planProName: 'Pro Membership',
            planEnterpriseName: 'Enterprise',
            planCustom: 'Custom',
            monthLabel: '/month',
            freeFeature1: 'Manual project creation',
            freeFeature2: 'Basic templates',
            freeFeature3: '3 projects per month',
            freeFeature4: 'Community support',
            freeFeature5: 'AI automation',
            freeFeature6: 'Priority processing',
            freeBtn: 'Sign Up Free',
            proFeature1: 'Full AI automation',
            proFeature2: 'Unlimited projects',
            proFeature3: 'Advanced workflows',
            proFeature4: 'Priority processing',
            proFeature5: 'Multi-platform distribution',
            proFeature6: 'Real-time analytics',
            proFeature7: 'Dedicated support',
            proBtn: 'Upgrade to Pro',
            enterpriseFeature1: 'Everything in Pro',
            enterpriseFeature2: 'Custom integrations',
            enterpriseFeature3: 'Dedicated account manager',
            enterpriseFeature4: 'SLA guarantees',
            enterpriseFeature5: 'Team collaboration',
            enterpriseFeature6: 'White-label options',
            aboutTitle: 'About Us',
            founderTitle: 'Founder',
            founderText: 'OPTMO was founded by <strong><a href="https://chirui.online" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: none; border-bottom: 2px solid var(--primary-color); transition: all 0.2s;">Chirui Huang</a></strong>, a researcher in Operations, Information, and Technology. With a focus on practical automation solutions, Chirui created OPTMO to help creators and organizers streamline their workflows through intelligent tools.',
            visionTitle: 'Our Vision',
            visionHeading: 'What We\'re Building',
            visionText1: 'OPTMO is in active development as we build the future of content and event automation. Our goal is to help creators and organizers save time on repetitive tasks so they can focus on creativity and strategy. We\'re currently working on AI-powered tools for podcast production, video editing, music creation, and event management.',
            visionText2: '<strong>Interested in being an early adopter?</strong> <a href="#contact" style="color: var(--primary-color); text-decoration: underline;">Get in touch</a> to learn more about our beta program and founder pricing.',
            contactSectionTitle: 'Get Started Today',
            footerTagline: 'AI-powered automation for content creation and event organization. Save time, create more.',
            footerServices: 'Services',
            footerCompany: 'Company',
            footerResources: 'Resources',
            footerService1: 'Podcast Creation',
            footerService2: 'Video Production',
            footerService3: 'Music Creation',
            footerService4: 'Event Organization',
            footerCompany1: 'Pricing',
            footerCompany2: 'About Us',
            footerCompany3: 'Projects',
            footerCompany4: 'Get Started',
            footerCompany5: 'Support OPTMO',
            footerResource1: 'Help Center',
            footerResource2: 'Documentation',
            footerResource3: 'API Access',
            footerResource4: 'System Status',
            footerBottom: '&copy; 2026 OPTMO. All rights reserved. | <a href="privacy-policy.html">Privacy Policy</a> | <a href="terms-of-service.html">Terms of Service</a> | <a href="cookie-policy.html">Cookie Policy</a>',
            cookieTitle: 'Cookie Notice',
            cookieText: 'OPTMO uses essential cookies to operate this website. You may also consent to optional analytics cookies.',
            cookiePolicy: 'Privacy Policy',
            cookieEssential: 'Essential Only',
            cookieAccept: 'Accept Analytics',
            noSuggestions: 'No suggestions found',
            noResultsFor: 'No results found for',
            tryDifferent: 'Try different keywords or check spelling',
            occurrences: 'occurrences',
            occurrence: 'occurrence',
            prevResult: 'Previous result (Shift+Enter)',
            nextResult: 'Next result (Enter)',
            matches: 'matches',
            match: 'match',
            moreIn: 'more in',
            pageContent: 'Page Content',
            sectionHome: '🏠 Home',
            sectionPortfolio: '📂 Portfolio',
            sectionPodcast: '🎙️ Podcast',
            sectionVideo: '🎬 Video',
            sectionMusic: '🎵 Music',
            sectionPerformance: '🎭 Performance',
            sectionParty: '🎉 Party',
            sectionConference: '👥 Conference',
            sectionProjects: '📋 Projects',
            sectionWorkflows: '⚙️ Workflows',
            sectionAnalytics: '📊 Analytics',
            sectionGeneral: '📄 General',
            recent: '🕒 Recent',
            featureLabel: 'Feature',
            // Login page translations
            welcomeBack: 'Welcome Back',
            loginToAccount: 'Login to your OPTMO account',
            secureLogin: 'Secure Login',
            secureLoginDesc: 'Sign in with your account credentials. If the email doesn\'t exist yet, OPTMO will create your account automatically.',
            emailAddressLabel: 'Email Address',
            passwordLabel: 'Password',
            loginBtn: 'Login to Account',
            dontHaveAccount: 'Don\'t have an account?',
            signUpHere: 'Sign up here',
            forgotPassword: 'Forgot password?',
            backToHome: 'Back to Home',
            pleaseFillin: 'Please fill in all fields.',
            validEmail: 'Please enter a valid email address.',
            passwordMinLength: 'Password must be at least 3 characters.',
            loggingIn: 'Logging in...',
            loginSuccessful: 'Login successful! Redirecting...',
            // Donate page translations
            supportOptmo: 'Support OPTMO',
            donationDesc: 'Your donations help us keep building automation tools for creators, teams, and event organizers.',
            choosePayment: 'Choose a payment method to support us',
            paypal: 'PayPal',
            paypalEmail: 'optmo256@gmail.com',
            donateNow: 'Donate Now',
            githubSponsors: 'GitHub Sponsors',
            directSupport: 'Direct support on GitHub',
            sponsor: 'Sponsor',
            paypalEmailLabel: 'PayPal Email:',
            copyEmail: 'Copy Email',
            copied: 'Copied!',
            thankYouSupport: 'Thank you for supporting open development.',
            // Account page translations
            myAccount: 'My Account',
            profile: 'Profile',
            settings: 'Settings',
            billing: 'Billing',
            security: 'Security',
            logout: 'Logout',
            editProfile: 'Edit Profile',
            changePassword: 'Change Password',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm Password',
            saveChanges: 'Save Changes',
            updateSuccessful: 'Profile updated successfully!',
            accountCreated: 'Account Created',
            lastLogin: 'Last Login',
            memberSince: 'Member Since',
            subscriptionStatus: 'Subscription Status',
            currentPlan: 'Current Plan',
            upgradeNow: 'Upgrade Now',
            // Language switcher
            language: 'Language',
            selectLanguage: 'Select Language',
            english: 'English',
            chinese: '中文',
            spanish: 'Español'
        },
        zh: {
            htmlLang: 'zh-CN',
            pageTitle: 'OPTMO - AI内容与活动自动化平台 | 免费试用',
            metaDescription: 'OPTMO 使用 AI 自动化播客、视频、音乐与活动工作流。节省 90% 制作时间，立即免费开始。',
            account: '账户',
            menuMain: '主菜单',
            menuCreation: '内容创作',
            menuEvents: '活动组织',
            menuTools: '工具',
            home: '首页',
            portfolio: '作品集',
            trending: '热门',
            podcast: '播客自动化',
            video: '视频制作',
            music: '音乐创作',
            performances: '演出',
            parties: '派对',
            conferences: '会议',
            projects: '我的项目',
            workflows: '工作流',
            analytics: '数据分析',
            heroTitle: '自动化你的内容与活动',
            heroSubtitle: 'AI 驱动的播客、视频、音乐和活动工作流——节省 90% 制作时间，专注真正重要的事情',
            startTrial: '免费试用',
            contactSales: '联系销售',
            contactInfoTitle: '联系方式',
            emailLabel: '邮箱：',
            phoneLabel: '电话：',
            contactUs: '联系我们',
            yourName: '你的姓名 *',
            emailAddress: '邮箱地址 *',
            message: '留言 *',
            sendMessage: '发送消息',
            formNote: '此表单由 Formspree 提供支持。',
            searchPlaceholder: '搜索...',
            searchTitle: '按 Ctrl+K 或 Cmd+K 搜索',
            searchSuggestions: ['播客自动化', '视频制作', '音乐创作', '活动管理', '数据分析', '工作流', '项目', '定价'],
            dropdownLogin: '登录',
            dropdownMyAccount: '我的账户',
            dropdownUpgrade: '升级到专业版',
            dropdownSupport: '支持 OPTMO',
            dropdownLogout: '退出登录',
            premiumTitle: '专业会员',
            premiumDesc: '解锁完整自动化与 AI 工作流',
            premiumBtn: '升级到专业版',
            devTitle: '网站开发中',
            devText: '本网站仍在开发中。部分功能可能会调整或暂不可用。并非所有内容都已最终确认或完全准确。感谢您的耐心！',
            automationTitle: '自动化如何工作',
            automationAuthor: 'AI 驱动',
            automationDate: '即时结果',
            automationHeading: '几分钟完成整套流程，而不是几天',
            automationDesc: 'OPTMO 的智能自动化可处理从脚本生成、视频编辑到活动排程与供应商协调的全流程。只需输入需求，AI 即可生成适配你的完整工作流。专业会员可使用高级功能，包括多平台分发、实时分析与优先处理。',
            automationCta: '查看方案与价格 →',
            servicesTitle: '我们的服务',
            serviceBadgePodcast: '播客',
            serviceBadgeVideo: '视频',
            serviceBadgeMusic: '音乐',
            serviceBadgeEvents: '活动',
            serviceBadgeWorkflows: '工作流',
            serviceBadgeAnalytics: '分析',
            serviceSummaryPodcast: '通过 AI 编辑、片头片尾生成与多平台发布，简化播客工作流程。',
            serviceSummaryVideo: '自动完成脚本生成、配音、剪辑与多平台优化。',
            serviceSummaryMusic: '根据品牌、风格与授权需求，生成 AI 音乐内容。',
            serviceSummaryEvents: '通过场地协调、供应商管理与来宾管理自动化活动筹备。',
            serviceSummaryWorkflows: '为内容创作或活动管理构建贴合业务的定制自动化流程。',
            serviceSummaryAnalytics: '通过实时洞察和数据建议，跟踪并分析内容表现。',
            serviceTitle1: '播客自动化',
            serviceTitle2: '视频制作',
            serviceTitle3: '音乐创作',
            serviceTitle4: '活动组织',
            serviceTitle5: '定制工作流',
            serviceTitle6: '绩效分析',
            plansTitle: '会员方案',
            planRecommended: '推荐',
            planFreeName: '免费账户',
            planProName: '专业会员',
            planEnterpriseName: '企业版',
            planCustom: '定制',
            monthLabel: '/月',
            freeFeature1: '手动创建项目',
            freeFeature2: '基础模板',
            freeFeature3: '每月 3 个项目',
            freeFeature4: '社区支持',
            freeFeature5: 'AI 自动化',
            freeFeature6: '优先处理',
            freeBtn: '免费注册',
            proFeature1: '完整 AI 自动化',
            proFeature2: '无限项目',
            proFeature3: '高级工作流',
            proFeature4: '优先处理',
            proFeature5: '多平台分发',
            proFeature6: '实时分析',
            proFeature7: '专属支持',
            proBtn: '升级到专业版',
            enterpriseFeature1: '包含专业版全部功能',
            enterpriseFeature2: '定制集成',
            enterpriseFeature3: '专属客户经理',
            enterpriseFeature4: 'SLA 服务保障',
            enterpriseFeature5: '团队协作',
            enterpriseFeature6: '白标方案',
            aboutTitle: '关于我们',
            founderTitle: '创始人',
            founderText: 'OPTMO 由 <strong><a href="https://chirui.online" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: none; border-bottom: 2px solid var(--primary-color); transition: all 0.2s;">Chirui Huang</a></strong> 创立，他是一位研究运营、信息与技术的学者。Chirui 专注于实用型自动化方案，创建 OPTMO 旨在帮助创作者与组织者通过智能工具优化工作流程。',
            visionTitle: '我们的愿景',
            visionHeading: '我们正在构建什么',
            visionText1: 'OPTMO 正在积极开发中，致力于构建内容与活动自动化的未来。我们的目标是帮助创作者和组织者节省重复性工作的时间，把精力投入到创意与策略中。我们正在推进播客制作、视频编辑、音乐创作与活动管理的 AI 工具。',
            visionText2: '<strong>想成为早期用户吗？</strong> <a href="#contact" style="color: var(--primary-color); text-decoration: underline;">联系我们</a>，了解测试计划与创始人优惠。',
            contactSectionTitle: '立即开始',
            footerTagline: '面向内容创作与活动组织的 AI 自动化。节省时间，创造更多。',
            footerServices: '服务',
            footerCompany: '公司',
            footerResources: '资源',
            footerService1: '播客制作',
            footerService2: '视频制作',
            footerService3: '音乐创作',
            footerService4: '活动组织',
            footerCompany1: '价格',
            footerCompany2: '关于我们',
            footerCompany3: '项目',
            footerCompany4: '开始使用',
            footerCompany5: '支持 OPTMO',
            footerResource1: '帮助中心',
            footerResource2: '文档',
            footerResource3: 'API 访问',
            footerResource4: '系统状态',
            footerBottom: '&copy; 2026 OPTMO。保留所有权利。 | <a href="privacy-policy.html">隐私政策</a> | <a href="terms-of-service.html">服务条款</a> | <a href="cookie-policy.html">Cookie 政策</a>',
            cookieTitle: 'Cookie 通知',
            cookieText: 'OPTMO 使用必要 Cookie 以保证网站运行。您也可以同意启用可选的分析 Cookie。',
            cookiePolicy: '隐私政策',
            cookieEssential: '仅必要 Cookie',
            cookieAccept: '接受分析 Cookie',
            noSuggestions: '未找到建议',
            noResultsFor: '未找到与以下内容相关的结果',
            tryDifferent: '请尝试其他关键词或检查拼写',
            occurrences: '处匹配',
            occurrence: '处匹配',
            prevResult: '上一个结果 (Shift+Enter)',
            nextResult: '下一个结果 (Enter)',
            matches: '处匹配',
            match: '处匹配',
            moreIn: '更多结果位于',
            pageContent: '页面内容',
            sectionHome: '🏠 首页',
            sectionPortfolio: '📂 作品集',
            sectionPodcast: '🎙️ 播客',
            sectionVideo: '🎬 视频',
            sectionMusic: '🎵 音乐',
            sectionPerformance: '🎭 演出',
            sectionParty: '🎉 派对',
            sectionConference: '👥 会议',
            sectionProjects: '📋 项目',
            sectionWorkflows: '⚙️ 工作流',
            sectionAnalytics: '📊 分析',
            sectionGeneral: '📄 通用',
            recent: '🕒 最近',
            featureLabel: '功能',
            // Login page translations
            welcomeBack: '欢迎回来',
            loginToAccount: '登录您的 OPTMO 账户',
            secureLogin: '安全登录',
            secureLoginDesc: '使用您的账户凭证登录。如果邮箱尚未注册，OPTMO 将自动为您创建账户。',
            emailAddressLabel: '邮箱地址',
            passwordLabel: '密码',
            loginBtn: '登录账户',
            dontHaveAccount: '还没有账户？',
            signUpHere: '在此注册',
            forgotPassword: '忘记密码？',
            backToHome: '返回主页',
            pleaseFillin: '请填写所有字段。',
            validEmail: '请输入有效的邮箱地址。',
            passwordMinLength: '密码至少需要 3 个字符。',
            loggingIn: '登录中...',
            loginSuccessful: '登录成功！正在跳转...',
            // Donate page translations
            supportOptmo: '支持 OPTMO',
            donationDesc: '您的捐赠帮助我们为创作者、团队和活动组织者持续开发自动化工具。',
            choosePayment: '选择支付方式支持我们',
            paypal: 'PayPal',
            paypalEmail: 'optmo256@gmail.com',
            donateNow: '现在捐赠',
            githubSponsors: 'GitHub 赞助',
            directSupport: '在 GitHub 上直接支持',
            sponsor: '赞助',
            paypalEmailLabel: 'PayPal 邮箱：',
            copyEmail: '复制邮箱',
            copied: '已复制！',
            thankYouSupport: '感谢您支持开源开发。',
            // Account page translations
            myAccount: '我的账户',
            profile: '资料',
            settings: '设置',
            billing: '账单',
            security: '安全',
            logout: '退出登录',
            editProfile: '编辑资料',
            changePassword: '更改密码',
            currentPassword: '当前密码',
            newPassword: '新密码',
            confirmPassword: '确认密码',
            saveChanges: '保存更改',
            updateSuccessful: '资料更新成功！',
            accountCreated: '账户已创建',
            lastLogin: '上次登录',
            memberSince: '成为会员时间',
            subscriptionStatus: '订阅状态',
            currentPlan: '当前方案',
            upgradeNow: '立即升级',
            // Language switcher
            language: '语言',
            selectLanguage: '选择语言',
            english: 'English',
            chinese: '中文',
            spanish: 'Español'
        },
        es: {
            htmlLang: 'es',
            pageTitle: 'OPTMO - Automatización de Contenido y Eventos con IA | Prueba Gratis',
            metaDescription: 'OPTMO automatiza flujos de trabajo de podcast, video, música y eventos con IA. Ahorra 90% del tiempo de producción.',
            account: 'Cuenta',
            menuMain: 'PRINCIPAL',
            menuCreation: 'CREACIÓN DE CONTENIDO',
            menuEvents: 'ORGANIZACIÓN DE EVENTOS',
            menuTools: 'HERRAMIENTAS',
            home: 'Inicio',
            portfolio: 'Portafolio',
            trending: 'Tendencias',
            podcast: 'Automatización de Podcast',
            video: 'Producción de Video',
            music: 'Creación Musical',
            performances: 'Presentaciones',
            parties: 'Fiestas',
            conferences: 'Conferencias',
            projects: 'Mis Proyectos',
            workflows: 'Flujos de Trabajo',
            analytics: 'Analíticas',
            heroTitle: 'Automatiza Tu Contenido y Eventos',
            heroSubtitle: 'Flujos de trabajo con IA para podcasts, videos, música y eventos. Ahorra 90% del tiempo de producción.',
            startTrial: 'Comenzar Prueba Gratis',
            contactSales: 'Contactar Ventas',
            contactInfoTitle: 'Información de Contacto',
            emailLabel: 'Correo:',
            phoneLabel: 'Teléfono:',
            contactUs: 'Contáctanos',
            yourName: 'Tu Nombre *',
            emailAddress: 'Correo Electrónico *',
            message: 'Mensaje *',
            sendMessage: 'Enviar Mensaje',
            formNote: 'Este formulario funciona con Formspree.',
            searchPlaceholder: 'Buscar...',
            searchTitle: 'Presiona Ctrl+K o Cmd+K para buscar',
            searchSuggestions: ['Automatización de Podcast', 'Producción de Video', 'Creación Musical', 'Gestión de Eventos', 'Analíticas', 'Flujos de Trabajo', 'Proyectos', 'Precios'],
            dropdownLogin: 'Iniciar sesión',
            dropdownMyAccount: 'Mi cuenta',
            dropdownUpgrade: 'Actualizar a Pro',
            dropdownSupport: 'Apoyar OPTMO',
            dropdownLogout: 'Cerrar sesión',
            premiumTitle: 'Membresía Pro',
            premiumDesc: 'Desbloquea automatización completa y flujos con IA',
            premiumBtn: 'Actualizar a Pro',
            devTitle: 'Sitio en desarrollo',
            devText: 'Este sitio web aún está en desarrollo. Algunas funciones pueden cambiar o no estar disponibles. No todo el contenido está finalizado o es completamente preciso. ¡Gracias por tu paciencia!',
            automationTitle: 'Cómo funciona la automatización',
            automationAuthor: 'Impulsado por IA',
            automationDate: 'Resultados instantáneos',
            automationHeading: 'Completa flujos en minutos, no en días',
            automationDesc: 'La automatización inteligente de OPTMO gestiona todo: generación de guiones, edición de video, programación de eventos y coordinación de proveedores. Solo ingresa tus requisitos y nuestra IA crea un flujo completo adaptado a tus necesidades. Los miembros Pro obtienen funciones avanzadas como distribución multiplataforma, analíticas en tiempo real y procesamiento prioritario.',
            automationCta: 'Ver planes y precios →',
            servicesTitle: 'Nuestros servicios',
            serviceBadgePodcast: 'Podcast',
            serviceBadgeVideo: 'Video',
            serviceBadgeMusic: 'Música',
            serviceBadgeEvents: 'Eventos',
            serviceBadgeWorkflows: 'Flujos',
            serviceBadgeAnalytics: 'Analíticas',
            serviceSummaryPodcast: 'Optimiza tu flujo de podcast con edición con IA, generación de intro/outro y distribución multiplataforma.',
            serviceSummaryVideo: 'Automatiza la creación de video con guion, voz en off, edición y optimización para múltiples plataformas.',
            serviceSummaryMusic: 'Composición musical con IA adaptada a tu marca, estilo y requisitos de licencia.',
            serviceSummaryEvents: 'Automatiza la planificación de eventos con coordinación de sedes, gestión de proveedores y asistentes.',
            serviceSummaryWorkflows: 'Crea flujos de automatización a medida para tus necesidades de contenido o gestión de eventos.',
            serviceSummaryAnalytics: 'Supervisa y analiza el rendimiento de tu contenido con información en tiempo real y recomendaciones basadas en datos.',
            serviceTitle1: 'Automatización de Podcast',
            serviceTitle2: 'Producción de Video',
            serviceTitle3: 'Creación Musical',
            serviceTitle4: 'Organización de Eventos',
            serviceTitle5: 'Flujos Personalizados',
            serviceTitle6: 'Analíticas de Rendimiento',
            plansTitle: 'Planes de membresía',
            planRecommended: 'RECOMENDADO',
            planFreeName: 'Cuenta gratuita',
            planProName: 'Membresía Pro',
            planEnterpriseName: 'Empresarial',
            planCustom: 'Personalizado',
            monthLabel: '/mes',
            freeFeature1: 'Creación manual de proyectos',
            freeFeature2: 'Plantillas básicas',
            freeFeature3: '3 proyectos por mes',
            freeFeature4: 'Soporte de la comunidad',
            freeFeature5: 'Automatización con IA',
            freeFeature6: 'Procesamiento prioritario',
            freeBtn: 'Regístrate gratis',
            proFeature1: 'Automatización total con IA',
            proFeature2: 'Proyectos ilimitados',
            proFeature3: 'Flujos avanzados',
            proFeature4: 'Procesamiento prioritario',
            proFeature5: 'Distribución multiplataforma',
            proFeature6: 'Analíticas en tiempo real',
            proFeature7: 'Soporte dedicado',
            proBtn: 'Actualizar a Pro',
            enterpriseFeature1: 'Todo lo de Pro',
            enterpriseFeature2: 'Integraciones personalizadas',
            enterpriseFeature3: 'Gestor de cuenta dedicado',
            enterpriseFeature4: 'Garantías SLA',
            enterpriseFeature5: 'Colaboración de equipo',
            enterpriseFeature6: 'Opciones de marca blanca',
            aboutTitle: 'Sobre nosotros',
            founderTitle: 'Fundador',
            founderText: 'OPTMO fue fundada por <strong><a href="https://chirui.online" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: none; border-bottom: 2px solid var(--primary-color); transition: all 0.2s;">Chirui Huang</a></strong>, investigador en Operaciones, Información y Tecnología. Con foco en soluciones prácticas de automatización, Chirui creó OPTMO para ayudar a creadores y organizadores a optimizar sus flujos con herramientas inteligentes.',
            visionTitle: 'Nuestra visión',
            visionHeading: 'Qué estamos construyendo',
            visionText1: 'OPTMO está en desarrollo activo mientras construimos el futuro de la automatización de contenido y eventos. Nuestro objetivo es ayudar a creadores y organizadores a ahorrar tiempo en tareas repetitivas para enfocarse en creatividad y estrategia. Actualmente trabajamos en herramientas con IA para podcast, video, música y gestión de eventos.',
            visionText2: '<strong>¿Te interesa ser adopción temprana?</strong> <a href="#contact" style="color: var(--primary-color); text-decoration: underline;">Contáctanos</a> para conocer nuestro programa beta y precios para fundadores.',
            contactSectionTitle: 'Comienza hoy',
            footerTagline: 'Automatización con IA para creación de contenido y organización de eventos. Ahorra tiempo, crea más.',
            footerServices: 'Servicios',
            footerCompany: 'Empresa',
            footerResources: 'Recursos',
            footerService1: 'Creación de podcast',
            footerService2: 'Producción de video',
            footerService3: 'Creación musical',
            footerService4: 'Organización de eventos',
            footerCompany1: 'Precios',
            footerCompany2: 'Sobre nosotros',
            footerCompany3: 'Proyectos',
            footerCompany4: 'Comenzar',
            footerCompany5: 'Apoyar OPTMO',
            footerResource1: 'Centro de ayuda',
            footerResource2: 'Documentación',
            footerResource3: 'Acceso API',
            footerResource4: 'Estado del sistema',
            footerBottom: '&copy; 2026 OPTMO. Todos los derechos reservados. | <a href="privacy-policy.html">Política de privacidad</a> | <a href="terms-of-service.html">Términos de servicio</a> | <a href="cookie-policy.html">Política de cookies</a>',
            cookieTitle: 'Aviso de cookies',
            cookieText: 'OPTMO utiliza cookies esenciales para operar este sitio web. También puedes consentir cookies analíticas opcionales.',
            cookiePolicy: 'Política de privacidad',
            cookieEssential: 'Solo esenciales',
            cookieAccept: 'Aceptar analíticas',
            noSuggestions: 'No se encontraron sugerencias',
            noResultsFor: 'No se encontraron resultados para',
            tryDifferent: 'Prueba otras palabras clave o revisa la ortografía',
            occurrences: 'coincidencias',
            occurrence: 'coincidencia',
            prevResult: 'Resultado anterior (Shift+Enter)',
            nextResult: 'Resultado siguiente (Enter)',
            matches: 'coincidencias',
            match: 'coincidencia',
            moreIn: 'más en',
            pageContent: 'Contenido de la página',
            sectionHome: '🏠 Inicio',
            sectionPortfolio: '📂 Portafolio',
            sectionPodcast: '🎙️ Podcast',
            sectionVideo: '🎬 Video',
            sectionMusic: '🎵 Música',
            sectionPerformance: '🎭 Presentación',
            sectionParty: '🎉 Fiesta',
            sectionConference: '👥 Conferencia',
            sectionProjects: '📋 Proyectos',
            sectionWorkflows: '⚙️ Flujos',
            sectionAnalytics: '📊 Analíticas',
            sectionGeneral: '📄 General',
            recent: '🕒 Reciente',
            featureLabel: 'Función',
            // Login page translations
            welcomeBack: 'Bienvenido de Vuelta',
            loginToAccount: 'Inicia sesión en tu cuenta de OPTMO',
            secureLogin: 'Inicio de sesión seguro',
            secureLoginDesc: 'Inicia sesión con tus credenciales de cuenta. Si el correo aún no existe, OPTMO creará tu cuenta automáticamente.',
            emailAddressLabel: 'Dirección de Correo Electrónico',
            passwordLabel: 'Contraseña',
            loginBtn: 'Iniciar sesión en la cuenta',
            dontHaveAccount: '¿No tienes cuenta?',
            signUpHere: 'Regístrate aquí',
            forgotPassword: '¿Olvidaste tu contraseña?',
            backToHome: 'Volver a Inicio',
            pleaseFillin: 'Por favor completa todos los campos.',
            validEmail: 'Por favor ingresa una dirección de correo válida.',
            passwordMinLength: 'La contraseña debe tener al menos 3 caracteres.',
            loggingIn: 'Iniciando sesión...',
            loginSuccessful: '¡Inicio de sesión exitoso! Redirigiendo...',
            // Donate page translations
            supportOptmo: 'Apoyar OPTMO',
            donationDesc: 'Tus donaciones nos ayudan a seguir construyendo herramientas de automatización para creadores, equipos y organizadores de eventos.',
            choosePayment: 'Elige un método de pago para apoyarnos',
            paypal: 'PayPal',
            paypalEmail: 'optmo256@gmail.com',
            donateNow: 'Donar Ahora',
            githubSponsors: 'Patrocinadores de GitHub',
            directSupport: 'Apoyo directo en GitHub',
            sponsor: 'Patrocinar',
            paypalEmailLabel: 'Correo de PayPal:',
            copyEmail: 'Copiar Correo',
            copied: '¡Copiado!',
            thankYouSupport: 'Gracias por apoyar el desarrollo de código abierto.',
            // Account page translations
            myAccount: 'Mi Cuenta',
            profile: 'Perfil',
            settings: 'Configuración',
            billing: 'Facturación',
            security: 'Seguridad',
            logout: 'Cerrar sesión',
            editProfile: 'Editar Perfil',
            changePassword: 'Cambiar Contraseña',
            currentPassword: 'Contraseña Actual',
            newPassword: 'Nueva Contraseña',
            confirmPassword: 'Confirmar Contraseña',
            saveChanges: 'Guardar Cambios',
            updateSuccessful: '¡Perfil actualizado correctamente!',
            accountCreated: 'Cuenta Creada',
            lastLogin: 'Último Inicio de Sesión',
            memberSince: 'Miembro Desde',
            subscriptionStatus: 'Estado de Suscripción',
            currentPlan: 'Plan Actual',
            upgradeNow: 'Actualizar Ahora',
            // Language switcher
            language: 'Idioma',
            selectLanguage: 'Seleccionar Idioma',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        fr: {
            htmlLang: 'fr',
            account: 'Compte',
            home: 'Accueil',
            language: 'Langue',
            selectLanguage: 'Sélectionner la Langue',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        de: {
            htmlLang: 'de',
            account: 'Konto',
            home: 'Startseite',
            language: 'Sprache',
            selectLanguage: 'Sprache Wählen',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        ja: {
            htmlLang: 'ja',
            account: 'アカウント',
            home: 'ホーム',
            language: '言語',
            selectLanguage: '言語を選択',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        pt: {
            htmlLang: 'pt',
            account: 'Conta',
            home: 'Início',
            language: 'Idioma',
            selectLanguage: 'Selecionar Idioma',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        ko: {
            htmlLang: 'ko',
            account: '계정',
            home: '홈',
            language: '언어',
            selectLanguage: '언어 선택',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        it: {
            htmlLang: 'it',
            account: 'Account',
            home: 'Home',
            language: 'Lingua',
            selectLanguage: 'Seleziona Lingua',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        ru: {
            htmlLang: 'ru',
            account: 'Учетная запись',
            home: 'Главная',
            language: 'Язык',
            selectLanguage: 'Выберите язык',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        ar: {
            htmlLang: 'ar',
            account: 'الحساب',
            home: 'الرئيسية',
            language: 'اللغة',
            selectLanguage: 'اختر لغة',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        hi: {
            htmlLang: 'hi',
            account: 'खाता',
            home: 'होम',
            language: 'भाषा',
            selectLanguage: 'भाषा चुनें',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        },
        vi: {
            htmlLang: 'vi',
            account: 'Tài khoản',
            home: 'Trang chủ',
            language: 'Ngôn Ngữ',
            selectLanguage: 'Chọn Ngôn Ngữ',
            english: 'English',
            chinese: '中文',
            spanish: 'Español',
            french: 'Français',
            german: 'Deutsch',
            japanese: '日本語',
            portuguese: 'Português',
            korean: '한국어',
            italian: 'Italiano',
            russian: 'Русский',
            arabic: 'العربية',
            hindi: 'हिन्दी',
            vietnamese: 'Tiếng Việt'
        }
    };
}

function applySystemLanguage() {
    const language = getPreferredLanguage();
    const translations = getTranslations();
    const t = translations[language] || translations.en;
    console.log('Applying language:', language);

    const setText = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value) {
            element.textContent = value;
        }
    };

    const setHTML = (selector, value) => {
        const element = document.querySelector(selector);
        if (element && value) {
            element.innerHTML = value;
        }
    };

    const setAttr = (selector, attr, value) => {
        const element = document.querySelector(selector);
        if (element && value) {
            element.setAttribute(attr, value);
        }
    };

    document.documentElement.setAttribute('lang', t.htmlLang);
    document.title = t.pageTitle;
    setAttr('meta[name="description"]', 'content', t.metaDescription);

    setText('.account-btn span', t.account);
    setAttr('#sidebarToggle', 'title', t.menuMain);
    setAttr('#closeSidebar', 'title', t.menuMain);

    const dropdownLinks = document.querySelectorAll('#dropdownMenu a');
    if (dropdownLinks[0]) dropdownLinks[0].innerHTML = `<i class="fas fa-sign-in-alt"></i> ${t.dropdownLogin}`;
    if (dropdownLinks[1]) dropdownLinks[1].innerHTML = `<i class="fas fa-user"></i> ${t.dropdownMyAccount}`;
    if (dropdownLinks[2]) dropdownLinks[2].innerHTML = `<i class="fas fa-crown"></i> ${t.dropdownUpgrade}`;
    if (dropdownLinks[3]) dropdownLinks[3].innerHTML = `<i class="fas fa-heart"></i> ${t.dropdownSupport}`;
    if (dropdownLinks[4]) dropdownLinks[4].innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t.dropdownLogout}`;

    const navTitles = document.querySelectorAll('.nav-section-title');
    if (navTitles[0]) navTitles[0].textContent = t.menuMain;
    if (navTitles[1]) navTitles[1].textContent = t.menuCreation;
    if (navTitles[2]) navTitles[2].textContent = t.menuEvents;
    if (navTitles[3]) navTitles[3].textContent = t.menuTools;

    const navItems = document.querySelectorAll('.sidebar-nav .nav-item span');
    if (navItems[0]) navItems[0].textContent = t.home;
    if (navItems[1]) navItems[1].textContent = t.portfolio;
    if (navItems[2]) navItems[2].textContent = t.trending;
    if (navItems[3]) navItems[3].textContent = t.podcast;
    if (navItems[4]) navItems[4].textContent = t.video;
    if (navItems[5]) navItems[5].textContent = t.music;
    if (navItems[6]) navItems[6].textContent = t.performances;
    if (navItems[7]) navItems[7].textContent = t.parties;
    if (navItems[8]) navItems[8].textContent = t.conferences;
    if (navItems[9]) navItems[9].textContent = t.projects;
    if (navItems[10]) navItems[10].textContent = t.workflows;
    if (navItems[11]) navItems[11].textContent = t.analytics;

    const premiumTitle = document.querySelector('.premium-box h4');
    if (premiumTitle) premiumTitle.innerHTML = `<i class="fas fa-crown"></i> ${t.premiumTitle}`;
    setText('.premium-box p', t.premiumDesc);
    setText('.premium-box .premium-btn', t.premiumBtn);

    setText('.hero-content h1', t.heroTitle);
    setText('.hero-content p', t.heroSubtitle);

    const heroButtons = document.querySelectorAll('.hero-content .cta-button');
    if (heroButtons[0]) heroButtons[0].textContent = t.startTrial;
    if (heroButtons[1]) heroButtons[1].textContent = t.contactSales;

    setText('.development-notice strong', t.devTitle);
    setText('.development-notice p', t.devText);

    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = t.automationTitle;
    if (sectionTitles[1]) sectionTitles[1].textContent = t.servicesTitle;
    if (sectionTitles[2]) sectionTitles[2].textContent = t.plansTitle;
    if (sectionTitles[3]) sectionTitles[3].textContent = t.aboutTitle;
    if (sectionTitles[4]) sectionTitles[4].textContent = t.visionTitle;
    if (sectionTitles[5]) sectionTitles[5].textContent = t.contactSectionTitle;

    const articleMeta = document.querySelectorAll('.featured-content .article-meta span');
    if (articleMeta[0]) articleMeta[0].innerHTML = `<i class="fas fa-robot"></i> ${t.automationAuthor}`;
    if (articleMeta[1]) articleMeta[1].innerHTML = `<i class="fas fa-bolt"></i> ${t.automationDate}`;
    setText('.featured-content h3', t.automationHeading);
    setText('.featured-content p', t.automationDesc);
    setText('.featured-content .read-more', t.automationCta);

    const pickBadges = document.querySelectorAll('.pick-card .rating');
    if (pickBadges[0]) pickBadges[0].textContent = t.serviceBadgePodcast;
    if (pickBadges[1]) pickBadges[1].textContent = t.serviceBadgeVideo;
    if (pickBadges[2]) pickBadges[2].textContent = t.serviceBadgeMusic;
    if (pickBadges[3]) pickBadges[3].textContent = t.serviceBadgeEvents;
    if (pickBadges[4]) pickBadges[4].textContent = t.serviceBadgeWorkflows;
    if (pickBadges[5]) pickBadges[5].textContent = t.serviceBadgeAnalytics;

    const pickTitles = document.querySelectorAll('.pick-card h4');
    if (pickTitles[0]) pickTitles[0].textContent = t.serviceTitle1;
    if (pickTitles[1]) pickTitles[1].textContent = t.serviceTitle2;
    if (pickTitles[2]) pickTitles[2].textContent = t.serviceTitle3;
    if (pickTitles[3]) pickTitles[3].textContent = t.serviceTitle4;
    if (pickTitles[4]) pickTitles[4].textContent = t.serviceTitle5;
    if (pickTitles[5]) pickTitles[5].textContent = t.serviceTitle6;

    const pickSummaries = document.querySelectorAll('.pick-card .pick-summary');
    if (pickSummaries[0]) pickSummaries[0].textContent = t.serviceSummaryPodcast;
    if (pickSummaries[1]) pickSummaries[1].textContent = t.serviceSummaryVideo;
    if (pickSummaries[2]) pickSummaries[2].textContent = t.serviceSummaryMusic;
    if (pickSummaries[3]) pickSummaries[3].textContent = t.serviceSummaryEvents;
    if (pickSummaries[4]) pickSummaries[4].textContent = t.serviceSummaryWorkflows;
    if (pickSummaries[5]) pickSummaries[5].textContent = t.serviceSummaryAnalytics;

    const planBadge = document.querySelector('.pricing-card.featured-plan .plan-badge');
    if (planBadge) planBadge.innerHTML = `<i class="fas fa-crown"></i> ${t.planRecommended}`;

    const planTitles = document.querySelectorAll('.pricing-card .plan-header h4');
    if (planTitles[0]) planTitles[0].textContent = t.planFreeName;
    if (planTitles[1]) planTitles[1].textContent = t.planProName;
    if (planTitles[2]) planTitles[2].textContent = t.planEnterpriseName;

    const customPrice = document.querySelectorAll('.pricing-card .price-tag')[2];
    if (customPrice) customPrice.textContent = t.planCustom;

    const monthlyLabels = document.querySelectorAll('.pricing-card .price-tag span');
    monthlyLabels.forEach(label => {
        label.textContent = t.monthLabel;
    });

    const featureItems = document.querySelectorAll('.pricing-card .feature-item');
    const featureTexts = [
        t.freeFeature1, t.freeFeature2, t.freeFeature3, t.freeFeature4, t.freeFeature5, t.freeFeature6,
        t.proFeature1, t.proFeature2, t.proFeature3, t.proFeature4, t.proFeature5, t.proFeature6, t.proFeature7,
        t.enterpriseFeature1, t.enterpriseFeature2, t.enterpriseFeature3, t.enterpriseFeature4, t.enterpriseFeature5, t.enterpriseFeature6
    ];
    featureItems.forEach((item, idx) => {
        if (!featureTexts[idx]) return;
        const icon = item.querySelector('i');
        if (icon) {
            item.innerHTML = `${icon.outerHTML} ${featureTexts[idx]}`;
        }
    });

    const planButtons = document.querySelectorAll('.pricing-card .plan-btn');
    if (planButtons[0]) planButtons[0].textContent = t.freeBtn;
    if (planButtons[1]) planButtons[1].textContent = t.proBtn;
    if (planButtons[2]) planButtons[2].textContent = t.contactSales;

    const aboutHeadings = document.querySelectorAll('#about h3');
    if (aboutHeadings[0]) aboutHeadings[0].innerHTML = `<i class="fas fa-user-tie"></i> ${t.founderTitle}`;
    if (aboutHeadings[1]) aboutHeadings[1].textContent = t.visionHeading;

    const aboutParagraphs = document.querySelectorAll('#about .portfolio-card p');
    if (aboutParagraphs[0]) setHTML('#about .portfolio-card p', t.founderText);
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = t.visionText1;
    if (aboutParagraphs[2]) aboutParagraphs[2].innerHTML = t.visionText2;

    setText('#contact .contact-details h4', t.contactInfoTitle);
    setText('#contact .contact-details p:nth-of-type(1) strong', t.emailLabel);
    setText('#contact .contact-details p:nth-of-type(2) strong', t.phoneLabel);
    setText('#contactForm h3', t.contactUs);
    setText('label[for="contactName"]', t.yourName);
    setText('label[for="contactEmail"]', t.emailAddress);
    setText('label[for="contactMessage"]', t.message);
    setText('#contactStatus', t.formNote);

    setAttr('#searchInput', 'placeholder', t.searchPlaceholder);
    setAttr('#searchInput', 'title', t.searchTitle);
    setAttr('#contactName', 'placeholder', language === 'zh' ? '张三' : language === 'es' ? 'Juan Pérez' : 'John Doe');
    setAttr('#contactEmail', 'placeholder', language === 'zh' ? 'name@company.com' : language === 'es' ? 'nombre@empresa.com' : 'john@company.com');
    setAttr('#contactMessage', 'placeholder', language === 'zh' ? '告诉我们你的项目或问题...' : language === 'es' ? 'Cuéntanos sobre tu proyecto o tus preguntas...' : 'Tell us about your project or ask any questions...');

    const submitBtnLabel = document.querySelector('#contactForm .submit-btn');
    if (submitBtnLabel) {
        submitBtnLabel.innerHTML = `<i class="fas fa-paper-plane"></i> ${t.sendMessage}`;
    }

    const footerSections = document.querySelectorAll('.footer-section h5');
    if (footerSections[1]) footerSections[1].textContent = t.footerServices;
    if (footerSections[2]) footerSections[2].textContent = t.footerCompany;
    if (footerSections[3]) footerSections[3].textContent = t.footerResources;
    setText('.footer-section p', t.footerTagline);

    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    const footerTexts = [
        t.footerService1, t.footerService2, t.footerService3, t.footerService4,
        t.footerCompany1, t.footerCompany2, t.footerCompany3, t.footerCompany4, t.footerCompany5,
        t.footerResource1, t.footerResource2, t.footerResource3, t.footerResource4
    ];
    footerLinks.forEach((link, idx) => {
        if (footerTexts[idx]) link.textContent = footerTexts[idx];
    });

    setHTML('.footer-bottom p', t.footerBottom);

    const cookieStrong = document.querySelector('#cookieNotice p strong');
    if (cookieStrong) cookieStrong.textContent = t.cookieTitle;
    const cookieTextNode = document.querySelector('#cookieNotice p');
    if (cookieTextNode) {
        const cookieLink = cookieTextNode.querySelector('a');
        const linkHtml = cookieLink ? cookieLink.outerHTML : '';
        cookieTextNode.innerHTML = `<strong>${t.cookieTitle}</strong><br>${t.cookieText} ${linkHtml}`;
    }
    const cookiePolicyLink = document.querySelector('#cookieNotice p a');
    if (cookiePolicyLink) cookiePolicyLink.textContent = t.cookiePolicy;
    setText('#declineCookies', t.cookieEssential);
    setText('#acceptCookies', t.cookieAccept);
    
    console.log('✓ Language localization applied:', language);
}

// Store language for search bar localization
let currentLanguage = 'en';
let currentTranslations = getTranslations().en;

function updateSearchSuggestions() {
    currentLanguage = getPreferredLanguage();
    const translations = getTranslations();
    currentTranslations = translations[currentLanguage] || translations.en;
}

class SmartSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResultsPanel = document.getElementById('searchResults');
        this.searchIndex = [];
        this.searchHistory = this.loadSearchHistory();
        this.searchSuggestions = [];
        this.selectedSuggestionIndex = -1;
        this.debounceTimer = null;
        this.currentHighlightIndex = 0;
        this.allHighlights = [];
        
        if (!this.searchInput) return;
        
        this.initIndex();
        this.attachEventListeners();
    }
    
    // Build search index from page content
    initIndex() {
        const excludedSelectors = 'script, style, .sidebar, .account-menu, button';
        const pageContent = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, .pick-card, .featured-content, a[href]');
        
        pageContent.forEach(element => {
            if (!element.closest(excludedSelectors) && element.textContent.trim()) {
                const text = element.textContent.trim();
                const section = element.closest('section')?.id || 'general';
                const sectionTitle = element.closest('section')?.querySelector('h2')?.textContent || 'General';
                const type = this.getContentType(element);
                
                this.searchIndex.push({
                    text: text.substring(0, 100),
                    fullText: text,
                    element: element,
                    section: section,
                    sectionTitle: sectionTitle,
                    type: type,
                    relevance: text.length < 100 ? 10 : 5
                });
            }
        });
        
        // Add predefined suggestions with current language translations
        const suggestionTexts = currentTranslations.searchSuggestions || [
            'Podcast Automation', 'Video Production', 'Music Creation', 'Event Management',
            'Analytics', 'Workflows', 'Projects', 'Pricing'
        ];
        this.searchSuggestions = suggestionTexts.map(text => ({
            text: text,
            category: currentTranslations.featureLabel || 'Feature'
        }));
    }
    
    getContentType(element) {
        if (element.classList.contains('pick-card')) return 'project';
        if (element.classList.contains('featured-content')) return 'featured';
        if (element.tagName.match(/H[1-6]/)) return 'heading';
        if (element.tagName === 'P') return 'text';
        if (element.tagName === 'A') return 'link';
        return 'content';
    }
    
    loadSearchHistory() {
        try {
            const history = localStorage.getItem('optmo_search_history');
            return history ? JSON.parse(history) : [];
        } catch (e) {
            return [];
        }
    }
    
    saveSearch(term) {
        if (!term.trim()) return;
        
        // Remove duplicate and add to top
        this.searchHistory = this.searchHistory.filter(h => h !== term);
        this.searchHistory.unshift(term);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        try {
            localStorage.setItem('optmo_search_history', JSON.stringify(this.searchHistory));
        } catch (e) {
            console.warn('Could not save search history');
        }
    }
    
    getSuggestions(query) {
        if (!query.trim()) {
            // Show history when empty
            return this.searchHistory.slice(0, 5).map(h => ({
                text: h,
                category: currentTranslations.recent || '🕒 Recent',
                isHistory: true
            }));
        }
        
        const queryLower = query.toLowerCase();
        const matches = [];
        
        // Find matching suggestions
        this.searchSuggestions.forEach(suggestion => {
            if (suggestion.text.toLowerCase().includes(queryLower)) {
                matches.push(suggestion);
            }
        });
        
        // Find matching content from index
        this.searchIndex.forEach(item => {
            if (item.fullText.toLowerCase().includes(queryLower) && !matches.find(m => m.text === item.fullText)) {
                matches.push({
                    text: item.text,
                    category: '📄 ' + (item.type.charAt(0).toUpperCase() + item.type.slice(1)),
                    section: item.section
                });
            }
        });
        
        // Remove duplicates and limit to 6
        const seen = new Set();
        return matches.filter(m => {
            if (seen.has(m.text.toLowerCase())) return false;
            seen.add(m.text.toLowerCase());
            return true;
        }).slice(0, 6);
    }
    
    displaySuggestions(suggestions) {
        if (!this.searchResultsPanel) return;
        
        if (suggestions.length === 0) {
            this.searchResultsPanel.innerHTML = `<div class="search-empty">${currentTranslations.noSuggestions || 'No suggestions found'}</div>`;
            this.searchResultsPanel.style.display = 'block';
            return;
        }
        
        let html = '<div class="search-suggestions">';
        suggestions.forEach((sugg, idx) => {
            const highlighted = idx === this.selectedSuggestionIndex ? 'active' : '';
            html += `
                <div class="suggestion-item ${highlighted}" data-index="${idx}">
                    <span class="suggestion-text">${this.escapeHtml(sugg.text)}</span>
                    <span class="suggestion-category">${sugg.category}</span>
                </div>
            `;
        });
        html += '</div>';
        
        this.searchResultsPanel.innerHTML = html;
        this.searchResultsPanel.style.display = 'block';
        
        // Attach click handlers
        this.searchResultsPanel.querySelectorAll('.suggestion-item').forEach((item, idx) => {
            item.addEventListener('click', () => {
                this.selectSuggestion(idx, suggestions);
            });
        });
    }
    
    selectSuggestion(index, suggestions) {
        if (index < 0 || index >= suggestions.length) return;
        
        const suggestion = suggestions[index];
        this.searchInput.value = suggestion.text;
        this.saveSearch(suggestion.text);
        this.performSearch();
    }
    
    clearHighlights() {
        document.querySelectorAll('mark.search-highlight').forEach(mark => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
        });
        document.body.normalize();
    }
    
    highlightText(node, searchTerm) {
        if (node.nodeType === 3 && node.textContent.trim()) {
            const text = node.textContent;
            const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedTerm})`, 'gi');
            
            if (regex.test(text)) {
                const span = document.createElement('span');
                span.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE'].includes(node.nodeName)) {
            const childNodes = Array.from(node.childNodes);
            childNodes.forEach(child => this.highlightText(child, searchTerm));
        }
    }
    
    performSearch() {
        const searchTerm = this.searchInput.value.trim();
        this.clearHighlights();
        this.currentHighlightIndex = 0;
        this.allHighlights = [];
        
        if (searchTerm === '') {
            document.querySelectorAll('.pick-card').forEach(card => {
                card.style.display = 'block';
                card.style.backgroundColor = '';
            });
            if (this.searchResultsPanel) {
                this.searchResultsPanel.style.display = 'none';
            }
            return;
        }
        
        this.saveSearch(searchTerm);
        
        const searchTermLower = searchTerm.toLowerCase();
        const matches = [];
        
        // Search through index
        this.searchIndex.forEach((item, idx) => {
            if (item.fullText.toLowerCase().includes(searchTermLower)) {
                matches.push({
                    index: idx,
                    ...item,
                    matchPosition: item.fullText.toLowerCase().indexOf(searchTermLower)
                });
            }
        });
        
        // Highlight matches and collect results
        if (matches.length > 0) {
            matches.forEach(match => {
                this.highlightText(match.element, searchTerm);
                if (match.type === 'project') {
                    match.element.style.backgroundColor = 'rgba(128, 0, 32, 0.08)';
                }
            });
            
            // Wait for DOM to update, then collect all highlight elements
            setTimeout(() => {
                this.allHighlights = Array.from(document.querySelectorAll('mark.search-highlight'));
                
                this.displaySearchResults(matches, searchTerm);
                
                // Highlight current match
                if (this.allHighlights.length > 0) {
                    this.updateCurrentHighlight();
                }
                
                // Scroll to first match
                if (this.allHighlights.length > 0) {
                    this.allHighlights[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 10);
        } else {
            this.displaySearchResults([], searchTerm);
        }
    }
    
    updateCurrentHighlight() {
        // Remove current class from all highlights
        this.allHighlights.forEach(mark => mark.classList.remove('current'));
        
        // Add current class to the current highlight
        if (this.allHighlights[this.currentHighlightIndex]) {
            this.allHighlights[this.currentHighlightIndex].classList.add('current');
            this.allHighlights[this.currentHighlightIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Update counter badge
        this.updateCounterBadge();
    }
    
    updateCounterBadge() {
        const badge = document.querySelector('.search-nav-counter');
        if (badge && this.allHighlights.length > 0) {
            badge.textContent = `${this.currentHighlightIndex + 1} / ${this.allHighlights.length}`;
        }
    }
    
    navigateHighlights(direction) {
        if (this.allHighlights.length === 0) return;
        
        if (direction === 'next') {
            this.currentHighlightIndex = (this.currentHighlightIndex + 1) % this.allHighlights.length;
        } else if (direction === 'prev') {
            this.currentHighlightIndex = (this.currentHighlightIndex - 1 + this.allHighlights.length) % this.allHighlights.length;
        }
        
        this.updateCurrentHighlight();
    }
    
    displaySearchResults(matches, searchTerm) {
        if (!this.searchResultsPanel) return;
        
        if (matches.length === 0) {
            this.searchResultsPanel.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>${currentTranslations.noResultsFor || 'No results found for'} "<strong>${this.escapeHtml(searchTerm)}</strong>"</p>
                    <small>${currentTranslations.tryDifferent || 'Try different keywords or check spelling'}</small>
                </div>
            `;
            this.searchResultsPanel.style.display = 'block';
            return;
        }
        
        // Count total occurrences
        let totalOccurrences = this.allHighlights.length;
        
        // Fallback: count occurrences manually if highlights not yet collected
        if (totalOccurrences === 0) {
            totalOccurrences = matches.reduce((count, match) => {
                const text = match.fullText.toLowerCase();
                const term = searchTerm.toLowerCase();
                let pos = 0;
                let occurrences = 0;
                while ((pos = text.indexOf(term, pos)) !== -1) {
                    occurrences++;
                    pos += term.length;
                }
                return count + occurrences;
            }, 0);
        }
        
        // Group results by section
        const grouped = {};
        matches.forEach(match => {
            const sectionName = match.sectionTitle || this.getSectionName(match.section);
            if (!grouped[sectionName]) {
                grouped[sectionName] = [];
            }
            grouped[sectionName].push(match);
        });
        
        let html = `
            <div class="search-header">
                <div class="search-header-info">
                    <span class="search-result-badge">${totalOccurrences}</span>
                    <div class="search-header-text">
                        <strong>${totalOccurrences} ${(totalOccurrences !== 1 ? (currentTranslations.occurrences || 'occurrences') : (currentTranslations.occurrence || 'occurrence'))}</strong>
                        <span class="search-term">"${this.escapeHtml(searchTerm)}"</span>
                    </div>
                </div>
                <div class="search-nav-controls">
                    <button class="search-nav-btn" id="searchPrev" title="${currentTranslations.prevResult || 'Previous result (Shift+Enter)'}">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <span class="search-nav-counter">1 / ${totalOccurrences}</span>
                    <button class="search-nav-btn" id="searchNext" title="${currentTranslations.nextResult || 'Next result (Enter)'}">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <div class="search-results-list">
        `;
        
        Object.entries(grouped).forEach(([sectionName, results]) => {
            const sectionCount = results.reduce((count, r) => {
                const text = r.fullText.toLowerCase();
                const term = searchTerm.toLowerCase();
                let pos = 0;
                let occurrences = 0;
                while ((pos = text.indexOf(term, pos)) !== -1) {
                    occurrences++;
                    pos += term.length;
                }
                return count + occurrences;
            }, 0);
            
            html += `<div class="search-section">
                <h4 class="search-section-title">
                    <span class="section-name">${sectionName}</span>
                    <span class="section-count">${sectionCount} ${(sectionCount !== 1 ? (currentTranslations.matches || 'matches') : (currentTranslations.match || 'match'))}</span>
                </h4>`;
            
            results.slice(0, 5).forEach((result, idx) => {
                const preview = this.getPreview(result.fullText, searchTerm);
                const locationPath = this.getLocationPath(result);
                html += `
                    <div class="search-result-item" data-index="${result.index}">
                        <div class="result-location">
                            <i class="fas fa-${this.getIcon(result.type)}"></i>
                            <span class="result-type">${result.type}</span>
                        </div>
                        <div class="result-content">
                            <div class="result-breadcrumb">${locationPath}</div>
                            <p class="result-preview">${preview}</p>
                        </div>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                `;
            });
            
            if (results.length > 5) {
                html += `<div class="search-more">+${results.length - 5} ${currentTranslations.moreIn || 'more in'} ${sectionName}</div>`;
            }
            
            html += '</div>';
        });
        
        html += '</div>';
        this.searchResultsPanel.innerHTML = html;
        this.searchResultsPanel.style.display = 'block';
        
        // Add navigation button handlers
        const prevBtn = document.getElementById('searchPrev');
        const nextBtn = document.getElementById('searchNext');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateHighlights('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateHighlights('next');
            });
        }
        
        // Add click handlers for navigation
        this.searchResultsPanel.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                const match = this.searchIndex[index];
                if (match && match.element) {
                    match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    match.element.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
                    setTimeout(() => {
                        match.element.style.backgroundColor = '';
                    }, 2000);
                }
            });
        });
    }
    
    getLocationPath(result) {
        const parts = [];
        
        if (result.sectionTitle && result.sectionTitle !== 'General') {
            parts.push(result.sectionTitle);
        }
        
        // Get parent heading if exists
        let parent = result.element.closest('section');
        if (parent) {
            const headings = parent.querySelectorAll('h3, h4');
            headings.forEach(h => {
                if (h.contains(result.element) || (result.element.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING)) {
                    const text = h.textContent.trim();
                    if (text && !parts.includes(text)) {
                        parts.push(text);
                    }
                }
            });
        }
        
        return parts.length > 0 ? parts.join(' › ') : 'Page Content';
    }
    
    getPreview(text, searchTerm) {
        const idx = text.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (idx === -1) return text.substring(0, 60) + '...';
        
        const start = Math.max(0, idx - 30);
        const end = Math.min(text.length, idx + searchTerm.length + 30);
        const preview = text.substring(start, end);
        
        const term = text.substring(idx, idx + searchTerm.length);
        const highlighted = preview.replace(
            new RegExp(`(${term})`, 'gi'),
            '<mark>$1</mark>'
        );
        
        return (start > 0 ? '...' : '') + highlighted + (end < text.length ? '...' : '');
    }
    
    getSectionName(sectionId) {
        const sectionMap = {
            'home': currentTranslations.sectionHome || '🏠 Home',
            'portfolio': currentTranslations.sectionPortfolio || '📂 Portfolio',
            'podcast': currentTranslations.sectionPodcast || '🎙️ Podcast',
            'video': currentTranslations.sectionVideo || '🎬 Video',
            'music': currentTranslations.sectionMusic || '🎵 Music',
            'performance': currentTranslations.sectionPerformance || '🎭 Performance',
            'party': currentTranslations.sectionParty || '🎉 Party',
            'conference': currentTranslations.sectionConference || '👥 Conference',
            'projects': currentTranslations.sectionProjects || '📋 Projects',
            'workflows': currentTranslations.sectionWorkflows || '⚙️ Workflows',
            'analytics': currentTranslations.sectionAnalytics || '📊 Analytics',
            'general': currentTranslations.sectionGeneral || '📄 General'
        };
        return sectionMap[sectionId] || sectionId;
    }
    
    getIcon(type) {
        const icons = {
            'project': 'layer-group',
            'featured': 'star',
            'heading': 'heading',
            'text': 'align-left',
            'link': 'link',
            'content': 'file-alt'
        };
        return icons[type] || 'file';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    attachEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            
            this.selectedSuggestionIndex = -1;
            const query = e.target.value.trim();
            
            if (query === '') {
                this.displaySuggestions(this.getSuggestions(''));
            } else {
                this.debounceTimer = setTimeout(() => {
                    const suggestions = this.getSuggestions(query);
                    this.displaySuggestions(suggestions);
                }, 200);
            }
        });
        
        this.searchInput.addEventListener('keydown', (e) => {
            if (!this.searchResultsPanel || this.searchResultsPanel.style.display === 'none') return;
            
            const items = this.searchResultsPanel.querySelectorAll('.suggestion-item');
            
            // If we have active highlights, use Enter/Shift+Enter for navigation
            if (this.allHighlights.length > 0 && (e.key === 'Enter')) {
                e.preventDefault();
                if (e.shiftKey) {
                    this.navigateHighlights('prev');
                } else {
                    this.navigateHighlights('next');
                }
                return;
            }
            
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.selectedSuggestionIndex = Math.min(this.selectedSuggestionIndex + 1, items.length - 1);
                    this.updateSuggestionHighlight(items);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
                    this.updateSuggestionHighlight(items);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (this.selectedSuggestionIndex >= 0) {
                        const suggestions = this.getSuggestions(this.searchInput.value.trim());
                        this.selectSuggestion(this.selectedSuggestionIndex, suggestions);
                    } else {
                        this.performSearch();
                    }
                    this.searchResultsPanel.style.display = 'none';
                    break;
                case 'Escape':
                    this.searchResultsPanel.style.display = 'none';
                    this.clearHighlights();
                    this.searchInput.value = '';
                    break;
            }
        });
        
        this.searchInput.addEventListener('focus', () => {
            const query = this.searchInput.value.trim();
            const suggestions = this.getSuggestions(query);
            if (suggestions.length > 0) {
                this.displaySuggestions(suggestions);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-center')) {
                if (this.searchResultsPanel) {
                    this.searchResultsPanel.style.display = 'none';
                }
            }
        });
    }
    
    updateSuggestionHighlight(items) {
        items.forEach((item, idx) => {
            item.classList.toggle('active', idx === this.selectedSuggestionIndex);
        });
    }
}

// Initialize smart search on page load
function initSearchBar() {
    const smartSearch = new SmartSearch();
    
    // Keyboard shortcut: Cmd+K (Mac) or Ctrl+K (Windows/Linux) to focus search
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Alternative: '/' key to focus search (if not in input)
        if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
    
    // Ensure search bar stays accessible when mobile keyboard appears
    if (/Android|iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.addEventListener('focusin', () => {
            const searchInput = document.getElementById('searchInput');
            if (document.activeElement === searchInput) {
                setTimeout(() => {
                    searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    }
}

// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');

function closeSidebarMenu() {
    if (sidebar) {
        sidebar.classList.remove('active');
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
    }
    document.body.classList.remove('sidebar-open');
}

closeSidebarMenu();

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        closeSidebarMenu();
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        closeSidebarMenu();
    });
}

// Account Menu Toggle
const accountBtn = document.getElementById('accountBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (accountBtn && dropdownMenu) {
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.account-menu')) {
            dropdownMenu.classList.remove('active');
        }
    });
}

// Active Nav Item on Scroll
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Filter functionality for project cards
const filterBtns = document.querySelectorAll('.filter-btn');
const pickCards = document.querySelectorAll('.pick-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter cards
        pickCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-filter') === filterValue) {
                card.style.display = 'block';
                // Add animation
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            closeSidebarMenu();
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and analysis items
document.querySelectorAll('.pick-card, .analysis-card, .featured-article').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Cookie Consent Management
const cookieNotice = document.getElementById('cookieNotice');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const declineCookiesBtn = document.getElementById('declineCookies');

function isAnalyticsEnabled() {
    return localStorage.getItem('analyticsEnabled') === 'true';
}

// Check if user has already made a cookie choice
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieNotice) {
        return;
    }

    if (!cookieConsent) {
        // Show cookie notice after a short delay
        setTimeout(() => {
            cookieNotice.classList.add('show');
        }, 1000);
    } else if (cookieConsent === 'accepted') {
        if (isAnalyticsEnabled()) {
            initializeTracking();
        }
    }
}

// Initialize tracking systems (placeholder for actual tracking code)
function initializeTracking() {
    console.log('🍪 Cookie tracking enabled');
    // This is where you would initialize:
    // - Google Analytics
    // - Facebook Pixel
    // - Custom tracking
    // - User behavior analytics
    
    // Track page view
    trackEvent('page_view', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
}

// Track events (placeholder for actual tracking)
function trackEvent(eventName, eventData) {
    if (localStorage.getItem('cookieConsent') === 'accepted' && isAnalyticsEnabled()) {
        console.log('📊 Tracking event:', eventName, eventData);
        // Send to analytics service
        // Example: gtag('event', eventName, eventData);
    }
}

// Accept cookies with analytics
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('analyticsEnabled', 'true');
        initializeTracking();
        trackEvent('cookie_consent', { action: 'accepted_analytics' });
        if (cookieNotice) {
            cookieNotice.classList.remove('show');
        }
    });
}

// Decline cookies
if (declineCookiesBtn) {
    declineCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        localStorage.setItem('analyticsEnabled', 'false');
        if (cookieNotice) {
            cookieNotice.classList.remove('show');
        }
        console.log('🍪 Cookie tracking declined');
        trackEvent('cookie_consent', { action: 'declined' });
    });
}

// Track user interactions (only if consent given)
document.addEventListener('click', (e) => {
    if (e.target.closest('.pick-card')) {
        const cardTitle = e.target.closest('.pick-card').querySelector('h4').textContent;
        trackEvent('project_view', { project: cardTitle });
    }
    
    if (e.target.closest('.filter-btn')) {
        const filter = e.target.closest('.filter-btn').getAttribute('data-filter');
        trackEvent('filter_used', { filter: filter });
    }
    
    if (e.target.closest('.plan-btn')) {
        const plan = e.target.closest('.pricing-card').querySelector('h4').textContent;
        trackEvent('plan_click', { plan: plan });
    }
});

// Initialize cookie consent check on page load
checkCookieConsent();

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
        
        // Update scroll progress bar
        const scrollProgressBar = document.getElementById('scrollProgressBar');
        if (scrollProgressBar) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / totalScroll) * 100;
            scrollProgressBar.style.width = scrolled + '%';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// Toast Notification Helper
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Sidebar Resize Functionality
function initSidebarResize() {
    const sidebar = document.getElementById('sidebar');
    const resizeHandle = document.getElementById('sidebarResizeHandle');
    if (!sidebar || !resizeHandle) return;

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    const minWidth = 200; // Minimum sidebar width (px)
    const maxWidth = 450; // Maximum sidebar width (px)
    const storageKey = 'sidebarWidth';

    // Load saved sidebar width
    const savedWidth = localStorage.getItem(storageKey);
    if (savedWidth) {
        const width = parseInt(savedWidth, 10);
        if (width >= minWidth && width <= maxWidth) {
            sidebar.style.width = width + 'px';
        }
    }

    // Handle resize start
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        resizeHandle.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    });

    // Handle resize move
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        let newWidth = startWidth + deltaX;

        // Constrain width between min and max
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        sidebar.style.width = newWidth + 'px';
    });

    // Handle resize end
    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            resizeHandle.classList.remove('dragging');
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            // Save width to localStorage
            localStorage.setItem(storageKey, sidebar.offsetWidth.toString());
        }
    });
}

// Logout function for homepage
async function logoutFromHome() {
    if (confirm('Are you sure you want to logout?')) {
        try {
            // Try PocketBase logout first (if available)
            if (typeof logoutUser === 'function') {
                await logoutUser();
            }
        } catch (e) {
            console.log('PocketBase logout not available');
        }
        
        // Always clear localStorage as fallback
        localStorage.removeItem('optmo_logged_in');
        localStorage.removeItem('optmo_user');
        location.reload();
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const statusEl = document.getElementById('contactStatus');
        const originalText = submitBtn.innerHTML;
        const action = contactForm.getAttribute('action') || '';
        const formData = new FormData(contactForm);

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        if (statusEl) {
            statusEl.textContent = 'Sending your message...';
        }

        if (action.includes('your-form-id')) {
            if (statusEl) {
                statusEl.textContent = 'Please replace your-form-id with your Formspree form ID.';
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        }

        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            if (statusEl) {
                statusEl.textContent = 'Thanks! Your message has been sent.';
            }
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                if (statusEl) {
                    statusEl.textContent = 'This form is powered by Formspree.';
                }
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error - Try Again';
            submitBtn.style.background = '#ef4444';
            if (statusEl) {
                statusEl.textContent = 'Unable to send message. Please email optmo2public@gmail.com directly.';
            }
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Language Switcher Initialization
function initLanguageSwitcher() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    if (!languageBtn || !languageDropdown) return;

    // Toggle dropdown visibility
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (languageDropdown.style.display === 'none') {
            languageDropdown.style.display = 'block';
            updateLanguageCheckmarks();
        } else {
            languageDropdown.style.display = 'none';
        }
    });

    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            languageDropdown.style.display = 'none';
            updateLanguageCheckmarks();
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-menu')) {
            languageDropdown.style.display = 'none';
        }
    });

    // Set initial checkmark
    updateLanguageCheckmarks();
}

function updateLanguageCheckmarks() {
    const currentLang = getPreferredLanguage();
    const languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        const checkIcon = option.querySelector('i');
        
        if (lang === currentLang) {
            option.classList.add('active');
            if (checkIcon) checkIcon.style.display = 'inline';
        } else {
            option.classList.remove('active');
            if (checkIcon) checkIcon.style.display = 'none';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 OPTMO website loaded and interactive features initialized');
    applySystemLanguage();
    updateSearchSuggestions();
    initLanguageSwitcher();
    initSearchBar();
    initSidebarResize();
    initContactForm();
    console.log('📍 Current system language:', getPreferredLanguage());
});
