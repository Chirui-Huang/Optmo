// Smart Search Bar Functionality
class SmartSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResultsPanel = document.getElementById('searchResults');
        this.searchIndex = [];
        this.searchHistory = this.loadSearchHistory();
        this.searchSuggestions = [];
        this.selectedSuggestionIndex = -1;
        this.debounceTimer = null;
        
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
        
        // Add predefined suggestions (categories, features)
        this.searchSuggestions = [
            { text: 'Podcast Automation', category: 'Feature' },
            { text: 'Video Production', category: 'Feature' },
            { text: 'Music Creation', category: 'Feature' },
            { text: 'Event Management', category: 'Feature' },
            { text: 'Analytics', category: 'Tool' },
            { text: 'Workflows', category: 'Tool' },
            { text: 'Projects', category: 'Tool' },
            { text: 'Pricing', category: 'Page' }
        ];
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
                category: '🕒 Recent',
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
            this.searchResultsPanel.innerHTML = '<div class="search-empty">No suggestions found</div>';
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
            
            this.displaySearchResults(matches, searchTerm);
        } else {
            this.displaySearchResults([], searchTerm);
        }
        
        // Scroll to first match
        if (matches.length > 0) {
            setTimeout(() => {
                const firstMatch = matches[0].element;
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    displaySearchResults(matches, searchTerm) {
        if (!this.searchResultsPanel) return;
        
        if (matches.length === 0) {
            this.searchResultsPanel.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "<strong>${this.escapeHtml(searchTerm)}</strong>"</p>
                    <small>Try different keywords or check spelling</small>
                </div>
            `;
            this.searchResultsPanel.style.display = 'block';
            return;
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
                <strong>${matches.length} result${matches.length !== 1 ? 's' : ''} found</strong>
                <span class="search-term">"${this.escapeHtml(searchTerm)}"</span>
            </div>
            <div class="search-results-list">
        `;
        
        Object.entries(grouped).forEach(([sectionName, results]) => {
            html += `<div class="search-section">
                <h4 class="search-section-title">${sectionName}</h4>`;
            
            results.slice(0, 5).forEach((result, idx) => {
                const preview = this.getPreview(result.fullText, searchTerm);
                html += `
                    <div class="search-result-item" data-index="${result.index}">
                        <div class="result-location">
                            <i class="fas fa-${this.getIcon(result.type)}"></i>
                            <span class="result-type">${result.type}</span>
                        </div>
                        <div class="result-content">
                            <p class="result-preview">${preview}</p>
                        </div>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                `;
            });
            
            if (results.length > 5) {
                html += `<div class="search-more">+${results.length - 5} more in ${sectionName}</div>`;
            }
            
            html += '</div>';
        });
        
        html += '</div>';
        this.searchResultsPanel.innerHTML = html;
        this.searchResultsPanel.style.display = 'block';
        
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
            'home': '🏠 Home',
            'portfolio': '📂 Portfolio',
            'podcast': '🎙️ Podcast',
            'video': '🎬 Video',
            'music': '🎵 Music',
            'performance': '🎭 Performance',
            'party': '🎉 Party',
            'conference': '👥 Conference',
            'projects': '📋 Projects',
            'workflows': '⚙️ Workflows',
            'analytics': '📊 Analytics',
            'general': '📄 General'
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

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
}

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
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

            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
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
const analyticsPasswordInput = document.getElementById('analyticsPassword');
const cookieStatus = document.getElementById('cookieStatus');
const runtimeAnalyticsPassword = window.OPTMO_ANALYTICS_PASSWORD;

function isAnalyticsEnabled() {
    return localStorage.getItem('analyticsEnabled') === 'true';
}

function setCookieStatus(message, type = '') {
    if (!cookieStatus) {
        return;
    }

    cookieStatus.textContent = message;
    cookieStatus.classList.remove('success', 'error');
    if (type) {
        cookieStatus.classList.add(type);
    }
}

function hasValidAnalyticsPassword() {
    if (!runtimeAnalyticsPassword || !analyticsPasswordInput) {
        return false;
    }

    const enteredPassword = analyticsPasswordInput.value.trim();
    return enteredPassword.length > 0 && enteredPassword === runtimeAnalyticsPassword;
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

// Accept cookies (simple - no analytics required)
if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('analyticsEnabled', 'false');
        if (cookieNotice) {
            cookieNotice.classList.remove('show');
        }
    });
}

// Enable Analytics button - shows password field
const enableAnalyticsBtn = document.getElementById('enableAnalyticsBtn');
const analyticsAuthSection = document.getElementById('analyticsAuthSection');
const submitAnalyticsBtn = document.getElementById('submitAnalyticsBtn');

if (enableAnalyticsBtn) {
    enableAnalyticsBtn.addEventListener('click', () => {
        if (analyticsAuthSection) {
            analyticsAuthSection.style.display = 'block';
        }
        enableAnalyticsBtn.style.display = 'none';
    });
}

if (submitAnalyticsBtn) {
    submitAnalyticsBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        
        if (!runtimeAnalyticsPassword) {
            localStorage.setItem('analyticsEnabled', 'false');
            setCookieStatus('Analytics password is not configured.', 'error');
        } else if (!hasValidAnalyticsPassword()) {
            localStorage.setItem('analyticsEnabled', 'false');
            setCookieStatus('Incorrect analytics password.', 'error');
        } else {
            localStorage.setItem('analyticsEnabled', 'true');
            setCookieStatus('Analytics enabled for this browser.', 'success');
            initializeTracking();
            trackEvent('cookie_consent', { action: 'accepted_analytics' });
            if (cookieNotice) {
                cookieNotice.classList.remove('show');
            }
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
        setCookieStatus('Analytics disabled.', '');
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('OPTMO website loaded and interactive features initialized');
    initSearchBar();
    initSidebarResize();
});
