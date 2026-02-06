/**
 * TC22 - GestStock IT
 * JavaScript pour les micro-interactions et la navigation mobile
 * 
 * Fonctionnalités :
 * - Menu mobile (toggle)
 * - Animations au scroll (IntersectionObserver)
 * - Smooth scroll pour les ancres
 * - Survol premium sur les cards
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Empêcher le scroll du body quand le menu est ouvert
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });
        
        // Fermer le menu quand on clique sur un lien
        nav.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer le menu avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // ANIMATIONS AU SCROLL
    // Fade-in progressif des éléments
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.card, .option-card, .recommendation-box, .timeline-item, .table-container');
    animatedElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.style.transitionDelay = (index % 6) * 0.1 + 's'; // Décalage progressif
        observer.observe(el);
    });
    
    // Style pour les éléments visibles
    const style = document.createElement('style');
    style.textContent = `
        .animate-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // HEADER SCROLL EFFECT
    // Ajoute une ombre au header lors du scroll
    // ============================================
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 10) {
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ============================================
    // TABLE ROW HOVER ENHANCEMENT
    // ============================================
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.005)';
            this.style.transition = 'all 0.2s ease';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // CARD TILT EFFECT (subtil)
    // ============================================
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ============================================
    // PRINT BUTTON (si nécessaire)
    // ============================================
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.print();
        });
    });
    
    // ============================================
    // COPY TABLE DATA
    // ============================================
    const copyButtons = document.querySelectorAll('[data-copy-table]');
    copyButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const tableId = this.getAttribute('data-copy-table');
            const table = document.getElementById(tableId);
            if (table) {
                const range = document.createRange();
                range.selectNode(table);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                
                // Feedback visuel
                const originalText = this.textContent;
                this.textContent = 'Copié !';
                setTimeout(function() {
                    btn.textContent = originalText;
                }, 2000);
            }
        });
    });
    
});

// ============================================
// PREFERS REDUCED MOTION
// Désactive les animations si l'utilisateur préfère
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}
