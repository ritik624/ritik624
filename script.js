// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const heroText = document.getElementById('heroText');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

// Hero text rotation
const heroTexts = [
    "Your Trusted Travel Partner",
    "Premium Car Rental Services", 
    "Unforgettable Tour Experiences"
];
let currentTextIndex = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeHeroTextRotation();
    initializeContactForm();
    initializeCounters();
    initializeIntersectionObserver();
});

// Header scroll effect
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileNav.classList.remove('active');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        const icon = this.querySelector('i');
        
        if (mobileNav.classList.contains('active')) {
            icon.className = 'fas fa-times';
            icon.style.animation = 'spin 0.3s ease';
        } else {
            icon.className = 'fas fa-bars';
            icon.style.animation = 'pulse 1s infinite';
        }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            icon.style.animation = 'pulse 1s infinite';
        });
    });
}

// Hero text rotation
function initializeHeroTextRotation() {
    if (heroText) {
        setInterval(() => {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
                heroText.textContent = heroTexts[currentTextIndex];
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);
    }
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.innerHTML = `
                <div style="width: 20px; height: 20px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                formSuccess.classList.remove('active');
                contactForm.style.display = 'flex';
                contactForm.reset();
                submitBtn.innerHTML = `
                    <i class="fas fa-comment"></i>
                    <span>Send Message</span>
                `;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for service cards
                if (entry.target.classList.contains('services-grid')) {
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 200);
                    });
                }
                
                // Special handling for feature cards
                if (entry.target.classList.contains('about-features')) {
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s forwards`;
                        }, 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = [
        '.about-text',
        '.about-features', 
        '.contact-info',
        '.contact-form-container',
        '.services-grid'
    ];
    
    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => observer.observe(element));
    });
}

// Initialize animations
function initializeAnimations() {
    // Add entrance animations to hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.animation = `fadeInUp 1s ease ${index * 0.2}s forwards`;
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.stat-card, .service-card, .feature-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive effects
document.addEventListener('mousemove', debounce(function(e) {
    const cursor = { x: e.clientX, y: e.clientY };
    
    // Parallax effect for floating elements
    document.querySelectorAll('.floating-icon, .floating-element').forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (cursor.x * speed);
        const y = (cursor.y * speed);
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
}, 16));

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-fadeInUp');
        }
    }, 100);
});

// Performance optimization
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for better performance
    console.log('Intersection Observer supported');
} else {
    // Fallback for older browsers
    console.log('Intersection Observer not supported, using fallback');
}

// Add some Easter eggs
let clickCount = 0;
document.querySelector('.logo-section')?.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        this.style.animation = 'bounce 1s infinite';
        setTimeout(() => {
            this.style.animation = '';
            clickCount = 0;
        }, 3000);
    }
});

// Console message
