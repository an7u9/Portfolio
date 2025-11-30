// =============================================================================
// INITIALIZATION & BASIC SETUP
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Remove loading screen
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
        setTimeout(() => { if (loading) loading.style.display = 'none'; }, 3000);
    }

    // Initialize starfield animation
    initializeStarfield();
});

// =============================================================================
// STARFIELD & VISUAL EFFECTS
// =============================================================================

function initializeStarfield() {
    const starContainer = document.querySelector('.stars');
    if (!starContainer) return;

    // Generate background stars
    const STAR_COUNT = 220;
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('span');
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1; // 1px–3px
        const delay = Math.random() * 3.5;
        const brightness = 0.7 + Math.random() * 0.6;
        
        star.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            animation-delay: ${delay}s;
            filter: brightness(${brightness});
        `;
        
        starContainer.appendChild(star);
    }

    // Create periodic shooting stars
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random start position (top 60% of screen)
        const startY = Math.random() * window.innerHeight * 0.6;
        const startX = Math.random() * window.innerWidth * 0.7;
        const tilt = -15 + Math.random() * 30; // -15deg to +15deg
        
        shootingStar.style.cssText = `
            top: ${startY}px;
            left: ${startX}px;
            transform: rotate(${tilt}deg);
        `;
        
        starContainer.appendChild(shootingStar);
        setTimeout(() => shootingStar.remove(), 1200);
    }

    // Create shooting stars every 10–15 seconds
    setInterval(createShootingStar, 10000 + Math.random() * 5000);
}
// =============================================================================
// MAIN PORTFOLIO APPLICATION CLASS
// =============================================================================

class PortfolioApp {
    constructor() {
        this.requiredFields = ['name', 'email', 'message']; // Removed 'subject' field
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormHandling();
    }

    // =============================================================================
    // EVENT LISTENERS SETUP
    // =============================================================================
    
    setupEventListeners() {
        // Scroll effects with throttling for performance
        window.addEventListener('scroll', this.throttle(() => {
            this.handleNavbarScroll();
            this.updateActiveNavigation();
        }, 100));

        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Mobile menu functionality
        this.setupMobileMenu();
        
        // Interactive card effects
        this.setupCardInteractions();
        
        // Form submission handling
        this.setupContactForm();
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.navbar-toggler');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }
    
    setupCardInteractions() {
        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Skill card hover effects
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.08)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
    
    setupContactForm() {
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(e.target);
            });
        }
    }

    // =============================================================================
    // NAVIGATION & SCROLL HANDLING
    // =============================================================================

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (!sections.length || !navLinks.length) return;

        let currentSection = '';
        const scrollPosition = window.scrollY;

        // Find the current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar height
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active navigation link
        navLinks.forEach(link => link.classList.remove('active'));

        if (currentSection) {
            const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${currentSection}"]`);
            if (activeLink) activeLink.classList.add('active');
        } else {
            // Default to home link when at the top
            const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }


    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        // Update active navigation after scrolling
        setTimeout(() => this.updateActiveNavigation(), 100);
    }

    toggleMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.classList.toggle('show');
        }
    }
    
    // =============================================================================
    // FORM HANDLING & VALIDATION
    // =============================================================================




    setupFormHandling() {
        const form = document.querySelector('#contactForm');
        if (!form) return;

        // Real-time field validation on blur
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Clear validation on focus
            input.addEventListener('focus', () => {
                this.clearFieldValidation(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Only validate fields that are required (removed 'subject')
        switch (fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'message':
                if (!value || value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
                
            default:
                // Skip validation for any other fields (like removed 'subject')
                return true;
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
            this.clearFieldValidation(field);
        }
    }
    
    clearFieldValidation(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmission(form) {
        // Get only the required form fields (excluding removed 'subject')
        const requiredInputs = form.querySelectorAll('input[name="name"], input[name="email"], textarea[name="message"]');
        let isFormValid = true;
        
        // Validate only the existing required fields
        requiredInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        // Check if all required fields have values
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Ensure all required fields are present and not empty
        for (const fieldName of this.requiredFields) {
            if (!data[fieldName] || !data[fieldName].trim()) {
                isFormValid = false;
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    this.showFieldValidation(field, false, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
                }
            }
        }

        if (!isFormValid) {
            this.showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        try {
            // Simulate API call (replace with your actual endpoint)
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
                // Clear all validation errors
                requiredInputs.forEach(input => {
                    this.clearFieldValidation(input);
                });
            } else {
                throw new Error(result.message || 'Failed to send message.');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            
            // For demo purposes, show success (remove this in production)
            if (error.message.includes('fetch')) {
                this.showNotification('Message received! (Demo mode - no actual email sent)', 'success');
                form.reset();
                requiredInputs.forEach(input => this.clearFieldValidation(input));
            } else {
                this.showNotification(error.message || 'Failed to send message. Please try again.', 'error');
            }
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }

    // =============================================================================
    // NOTIFICATION SYSTEM
    // =============================================================================
    
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Apply notification styles
        const bgColor = type === 'success' ? 'var(--accent-cyan)' : '#dc3545';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            word-wrap: break-word;
        `;

        document.body.appendChild(notification);

        // Animate notification in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }
    
    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // =============================================================================
    // UTILITY METHODS
    // =============================================================================
    
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

}

// =============================================================================
// APPLICATION INITIALIZATION
// =============================================================================

// Initialize the portfolio application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    initializeFallingStars();
});

// =============================================================================
// ADDITIONAL VISUAL EFFECTS
// =============================================================================

function initializeFallingStars() {
    const container = document.querySelector('.shooting-stars');
    if (!container) return;

    function createFallingStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';

        // Random positioning and properties
        const startLeft = Math.random() * 100;
        const size = Math.random() * 3 + 2;
        const drift = (Math.random() - 0.5) * 50; // -25px to +25px
        const duration = (Math.random() * 5 + 6).toFixed(2); // 6–11s
        
        star.style.cssText = `
            left: ${startLeft}vw;
            width: ${size}px;
            height: ${size}px;
            --drift: ${drift}px;
            animation-duration: ${duration}s;
        `;

        container.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
    }

    // Create falling stars periodically
    setInterval(createFallingStar, 3000);
}

