// contact.js - Contact page specific animations and interactions
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export class ContactAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initHeroParallax();
        this.initStatsCounter();
        this.initCardAnimations();
        this.initFormAnimations();
        this.initMapAnimation();
    }

    initHeroParallax() {
        gsap.to('.hero-background', {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    initStatsCounter() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const value = parseInt(stat.textContent);
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            });
        });
    }

    initCardAnimations() {
        gsap.from('.contact-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            }
        });

        // Card hover effect
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.02,
                    boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                    duration: 0.3
                });
            });
        });
    }

    initFormAnimations() {
        // Form field animations
        document.querySelectorAll('.form-control').forEach(field => {
            field.addEventListener('focus', () => {
                gsap.to(field.closest('.form-group').querySelector('.form-indicator'), {
                    width: '100%',
                    duration: 0.3
                });
            });

            field.addEventListener('blur', () => {
                if (!field.value) {
                    gsap.to(field.closest('.form-group').querySelector('.form-indicator'), {
                        width: '0%',
                        duration: 0.3
                    });
                }
            });
        });
    }

    initMapAnimation() {
        gsap.from('.map-container', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.map-section',
                start: 'top 80%'
            }
        });
    }

    showSuccessMessage() {
        const message = document.querySelector('.success-message');
        
        // First hide the form
        gsap.to('.contact-form form', {
            opacity: 0,
            y: -20,
            duration: 0.3
        });

        // Show success message
        gsap.set(message, { display: 'block', opacity: 0, scale: 0.8 });
        gsap.to(message, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });

        // Confetti animation
        this.createConfetti();

        // Hide message and reset form after delay
        setTimeout(() => {
            gsap.to(message, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => {
                    message.style.display = 'none';
                    document.getElementById('contactForm').reset();
                    gsap.to('.contact-form form', {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        }, 3000);
    }

    createConfetti() {
        const colors = ['#2563eb', '#1e40af', '#60a5fa'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);

            gsap.set(confetti, {
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                y: window.innerHeight / 2,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            });

            gsap.to(confetti, {
                x: window.innerWidth / 2 + (Math.random() - 0.5) * 400,
                y: window.innerHeight / 2 + (Math.random() * 200),
                rotation: Math.random() * 520,
                duration: Math.random() * 1 + 1,
                ease: 'power1.out',
                opacity: 0,
                onComplete: () => confetti.remove()
            });
        }
    }
}
