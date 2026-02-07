/**
 * TC22 - GestStock IT
 * JavaScript Premium v4
 * 
 * Features:
 * - Header scroll effect (glassmorphism enhanced)
 * - Mobile navigation toggle
 * - Smooth scroll anchors
 * - Intersection Observer animations
 * - Card hover tilt effect
 * - Table row interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // HEADER SCROLL EFFECT
    // Adds 'scrolled' class for enhanced shadow
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial check
    }
    
    // ============================================
    // MOBILE NAVIGATION
    // Toggle menu with animation
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });
        
        // Close menu on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL
    // Enhanced scroll for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // INTERSECTION OBSERVER
    // Fade-in animations on scroll
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.card, .solution-card, .recommendation-box, .timeline-item, .table-container, .hero-card, .hero-stat');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.transitionDelay = `${(index % 8) * 0.06}s`;
        observer.observe(el);
    });
    
    // Add visibility style
    const style = document.createElement('style');
    style.textContent = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // CARD TILT EFFECT
    // Subtle 3D tilt on hover
    // ============================================
    const cards = document.querySelectorAll('.card:not(.solution-card)');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 40;
            const rotateY = (centerX - x) / 40;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ============================================
    // TABLE ROW HOVER EFFECT
    // Subtle scale on hover
    // ============================================
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
    
    // ============================================
    // HERO PARALLAX (subtle)
    // Slight movement on scroll
    // ============================================
    const hero = document.querySelector('.hero');
    const heroCard = document.querySelector('.hero-card');
    
    if (hero && heroCard) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const parallax = scrolled * 0.15;
                heroCard.style.transform = `translateY(${parallax}px)`;
            }
        }, { passive: true });
    }
    
    // ============================================
    // BUTTON RIPPLE EFFECT
    // Material-style ripple on click
    // ============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ============================================
    // PRINT HANDLER
    // Optional print functionality
    // ============================================
    document.querySelectorAll('[data-print]').forEach(btn => {
        btn.addEventListener('click', () => window.print());
    });
    
});

// ============================================
// REDUCED MOTION
// Respect user preferences
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--duration-fast', '0ms');
    document.documentElement.style.setProperty('--duration-base', '0ms');
    document.documentElement.style.setProperty('--duration-slow', '0ms');
}
