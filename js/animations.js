// animations.js - Handles all GSAP animations and ScrollTrigger
import { gsap } from "https://cdn.skypack.dev/gsap@3.12.0";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger";
import { ScrollToPlugin } from "https://cdn.skypack.dev/gsap@3.12.0/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export class Animations {
    constructor() {
        this.init();
    }

    init() {
        // Initialize Lenis for smooth scrolling
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 2
        });

        // Sync Lenis with GSAP
        gsap.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        this.initPageTransitions();
        this.initScrollAnimations();
    }

    initPageTransitions() {
        // Page load animation
        gsap.from('body', {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut'
        });

        // Stagger nav items
        gsap.from('.nav-links li', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.5
        });
    }

    initScrollAnimations() {
        // Fade in sections on scroll
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // Animate cards with stagger
        gsap.utils.toArray('.card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        // Parallax background effect
        gsap.utils.toArray('[data-parallax]').forEach(layer => {
            const depth = layer.dataset.parallax;
            const movement = -(layer.offsetHeight * depth);
            
            gsap.to(layer, {
                scrollTrigger: {
                    trigger: layer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: movement,
                ease: 'none'
            });
        });
    }

    // Animate modal opening
    animateModal(modal) {
        gsap.set(modal, { display: 'flex' });
        
        gsap.from(modal, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut'
        });

        gsap.from(modal.querySelector('.modal-content'), {
            y: -50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.1
        });
    }

    // Success animation with confetti
    showSuccess(element) {
        gsap.to(element, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(element, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });

        // Create confetti effect
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#2563eb', '#1e40af', '#60a5fa'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);

            const x = window.innerWidth * Math.random();
            const rotation = Math.random() * 360;
            const color = colors[Math.floor(Math.random() * colors.length)];

            gsap.set(confetti, {
                x: x,
                y: -20,
                backgroundColor: color,
                rotation: rotation
            });

            gsap.to(confetti, {
                y: window.innerHeight + 100,
                rotation: rotation + Math.random() * 520,
                duration: Math.random() * 2 + 1,
                ease: 'power1.out',
                onComplete: () => confetti.remove()
            });
        }
    }

    dispose() {
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Clean up Lenis
        if (this.lenis) {
            this.lenis.destroy();
        }
    }
}
