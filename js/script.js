// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize form handling
    initContactForm();
    initNewsletterForm();
    
    // Initialize animations
    initAnimations();
    
    // Initialize FAQ
    initFAQ();
    
    // Initialize portfolio hover effects
    initPortfolio();
});

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle contact form submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            const spinner = document.querySelector('.loading-spinner');
            spinner.style.display = 'inline-block';
            
            // Simulate form submission
            setTimeout(() => {
                spinner.style.display = 'none';
                
                // Show success message
                const successMessage = document.querySelector('.success-message');
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    }
}

// Initialize scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Newsletter form handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const spinner = this.querySelector('.loading-spinner');
            const successMessage = this.querySelector('.success-message');
            
            spinner.style.display = 'inline-block';
            
            setTimeout(() => {
                spinner.style.display = 'none';
                successMessage.style.display = 'block';
                newsletterForm.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    }
}

// FAQ handling
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Portfolio hover effects
function initPortfolio() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.portfolio-overlay').style.transform = 'translateY(0)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.portfolio-overlay').style.transform = 'translateY(100%)';
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}
