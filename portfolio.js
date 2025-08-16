// Modern Portfolio JavaScript - Interactive Features

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupLoadingScreen();
    }

    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.handleScrollAnimations();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(link.getAttribute('href'));
            });
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.navbar-toggler');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Project card interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, 'leave');
            });
        });

        // Skill card interactions
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateSkillCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateSkillCard(card, 'leave');
            });
        });

        // Form submission
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }

        // Typing animation for hero title
        this.initTypingAnimation();
    }

    setupLoadingScreen() {
        const loading = document.querySelector('.loading');
        if (loading) {
            // Hide loading screen when page loads
            window.addEventListener('load', () => {
                loading.style.display = 'none';
            });
            
            // Fallback: hide loading screen after 2 seconds
            setTimeout(() => {
                if (loading) {
                    loading.style.display = 'none';
                }
            }, 2000);
        }
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in');
            }
        });
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    toggleMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.classList.toggle('show');
        }
    }

    animateProjectCard(card, action) {
        const image = card.querySelector('.project-image img');
        const content = card.querySelector('.project-content');
        
        if (action === 'enter') {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            if (image) image.style.transform = 'scale(1.1)';
            if (content) content.style.transform = 'translateY(-5px)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            if (image) image.style.transform = 'scale(1)';
            if (content) content.style.transform = 'translateY(0)';
        }
    }

    animateSkillCard(card, action) {
        if (action === 'enter') {
            card.style.transform = 'translateY(-5px) scale(1.05)';
            card.style.borderColor = 'var(--accent-blue)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.borderColor = 'var(--border-light)';
        }
    }

    initTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-cyan)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    initializeAnimations() {
        // Add animation classes to elements
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
        animateElements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.animationDelay = `${index * 0.1}s`;
        });

        // Parallax effect for hero section
        this.setupParallaxEffect();
    }

    setupParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    setupFormHandling() {
        const form = document.querySelector('#contactForm');
        if (!form) return;

        // Real-time form validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, errorMessage) {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (!isValid) {
            field.classList.add('error');
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'error-message text-danger small mt-1';
                error.textContent = errorMessage;
                field.parentNode.appendChild(error);
            } else {
                errorElement.textContent = errorMessage;
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        }
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            
            // Show success message
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-cyan)' : '#ff4757'};
            color: var(--bg-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-sm);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Utility function to check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some additional utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll utility
    smoothScroll(target, duration = 1000) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils };
} 