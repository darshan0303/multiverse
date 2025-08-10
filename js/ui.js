// ui.js - Handles all UI interactions, modals, forms, and notifications
export class UI {
    constructor() {
        this.init();
    }

    init() {
        this.initModals();
        this.initForms();
        this.initFAQ();
        this.initPortfolioFilters();
        this.initReducedMotion();
    }

    initModals() {
        // Demo request modal handler
        document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.dataset.modalTrigger;
                this.openModal(modalId);
            });
        });

        // Close modal handlers
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(closer => {
            closer.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal(closer.closest('.modal'));
            });
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) this.closeModal(openModal);
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea');
        if (firstFocusable) firstFocusable.focus();

        // Trigger animation
        window.animations.animateModal(modal);
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    initForms() {
        // Contact form handler
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmission.bind(this));
        }

        // Newsletter form handler
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSubmission.bind(this));
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('[type="submit"]');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const successMessage = form.querySelector('.success-message');

        if (!this.validateForm(form)) return;

        // Show loading state
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';

        // Simulate API call
        await this.fakeAPICall();

        // Show success state
        spinner.style.display = 'none';
        successMessage.style.display = 'block';
        form.reset();

        // Trigger success animation
        window.animations.showSuccess(successMessage);

        // Reset form state
        setTimeout(() => {
            submitBtn.disabled = false;
            successMessage.style.display = 'none';
        }, 3000);
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });

        return isValid;
    }

    showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-message') 
            || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!input.parentElement.querySelector('.error-message')) {
            input.parentElement.appendChild(errorDiv);
        }

        gsap.from(errorDiv, {
            y: -10,
            opacity: 0,
            duration: 0.3
        });

        input.addEventListener('input', () => {
            errorDiv.remove();
        }, { once: true });
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async fakeAPICall() {
        return new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1500));
    }

    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        gsap.to(otherItem.querySelector('.faq-answer'), {
                            height: 0,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                gsap.to(answer, {
                    height: isOpen ? 0 : answer.scrollHeight,
                    duration: 0.3,
                    ease: 'power2.inOut'
                });
            });
        });
    }

    initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const shouldShow = filter === 'all' || item.dataset.category === filter;
                    gsap.to(item, {
                        opacity: shouldShow ? 1 : 0.3,
                        scale: shouldShow ? 1 : 0.95,
                        duration: 0.3
                    });
                });
            });
        });
    }

    initReducedMotion() {
        const toggle = document.getElementById('reduced-motion-toggle');
        if (toggle) {
            toggle.addEventListener('change', () => {
                document.body.classList.toggle('reduced-motion');
                localStorage.setItem('reduced-motion', toggle.checked);
            });

            // Check stored preference
            const storedPreference = localStorage.getItem('reduced-motion');
            if (storedPreference === 'true') {
                toggle.checked = true;
                document.body.classList.add('reduced-motion');
            }
        }
    }
}
