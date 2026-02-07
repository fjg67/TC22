/**
 * TC22 - GestStock IT
 * JavaScript Ultra Premium v5
 * 
 * Features:
 * - Particle system background
 * - Header scroll effect with glassmorphism
 * - Mobile navigation with smooth animations
 * - Intersection Observer for scroll animations
 * - Card hover effects with 3D tilt
 * - Smooth scrolling with header offset
 * - Button ripple effects
 * - Counter animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PARTICLE SYSTEM
    // Creates floating particles in hero section
    // ============================================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        const createParticles = () => {
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random size
                const size = Math.random() * 4 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random animation delay and duration
                particle.style.animationDelay = `${Math.random() * 20}s`;
                particle.style.animationDuration = `${20 + Math.random() * 10}s`;
                
                // Random opacity
                particle.style.opacity = `${0.1 + Math.random() * 0.4}`;
                
                // Random color (purple or cyan)
                particle.style.background = Math.random() > 0.5 
                    ? 'rgba(139, 92, 246, 0.8)' 
                    : 'rgba(6, 182, 212, 0.8)';
                
                particlesContainer.appendChild(particle);
            }
        };
        
        createParticles();
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // Adds glassmorphism on scroll
    // ============================================
    const header = document.getElementById('header');
    
    if (header) {
        let lastScroll = 0;
        
        const onScroll = () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Initial check
    }

    // ============================================
    // MOBILE NAVIGATION
    // Toggle menu with smooth animation
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });
        
        // Close on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close on Escape key
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
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
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
        rootMargin: '0px 0px -80px 0px'
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
    const animatedElements = document.querySelectorAll(`
        .card, 
        .solution-card, 
        .recommendation-box, 
        .timeline-item, 
        .table-container, 
        .hero-card, 
        .hero-stat,
        .info-box,
        .section-header
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`;
        el.style.transitionDelay = `${(index % 10) * 0.08}s`;
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
    const cards = document.querySelectorAll('.card:not(.solution-card):not(.hero-card)');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on mobile
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // HERO PARALLAX
    // Subtle parallax effect on scroll
    // ============================================
    const hero = document.querySelector('.hero');
    const heroCard = document.querySelector('.hero-card');
    const heroStats = document.querySelectorAll('.hero-stat');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const parallax = scrolled * 0.1;
                
                if (heroCard) {
                    heroCard.style.transform = `translateY(${parallax}px)`;
                }
                
                heroStats.forEach((stat, index) => {
                    stat.style.transform = `translateY(${parallax * (0.5 + index * 0.1)}px)`;
                });
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: 120px;
                height: 120px;
                left: ${x - 60}px;
                top: ${y - 60}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out forwards;
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
    // COUNTER ANIMATION
    // Animate numbers on scroll
    // ============================================
    const counters = document.querySelectorAll('.hero-stat-value');
    
    const animateCounter = (element) => {
        const text = element.textContent;
        const numMatch = text.match(/-?\d+/);
        
        if (!numMatch) return;
        
        const target = parseInt(numMatch[0]);
        const suffix = text.replace(numMatch[0], '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
                element.textContent = text;
            } else {
                element.textContent = Math.round(current) + suffix;
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };
    
    // Observe counters
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ============================================
    // GLOW EFFECT ON MOUSE MOVE
    // Subtle glow following cursor
    // ============================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && window.innerWidth >= 768) {
        const glowElement = document.createElement('div');
        glowElement.style.cssText = `
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1;
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        heroSection.appendChild(glowElement);
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glowElement.style.left = `${x}px`;
            glowElement.style.top = `${y}px`;
            glowElement.style.opacity = '1';
        });
        
        heroSection.addEventListener('mouseleave', () => {
            glowElement.style.opacity = '0';
        });
    }

    // ============================================
    // TABLE ROW HOVER
    // Highlight effect on table rows
    // ============================================
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });

    // ============================================
    // CURSOR GLOW
    // Custom cursor with glow effect (desktop only)
    // ============================================
    if (window.innerWidth >= 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        // Grow cursor on interactive elements
        document.querySelectorAll('a, button, .card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'rgba(139, 92, 246, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.background = 'rgba(139, 92, 246, 0.3)';
            });
        });
    }

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

// ============================================
// LOADING ANIMATION
// Fade in page on load
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
