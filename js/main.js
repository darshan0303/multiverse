// main.js - Main application entry point
import { HeroScene } from './three-hero.js';
import { Animations } from './animations.js';
import { UI } from './ui.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        // Show loading screen
        this.showLoader();

        // Initialize components
        await this.initComponents();

        // Hide loader and show content
        this.hideLoader();
    }

    showLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            gsap.to(loader, {
                opacity: 1,
                duration: 0.3
            });
        }
    }

    async initComponents() {
        // Check WebGL support
        const hasWebGL = this.checkWebGL();

        // Initialize hero if on home page and WebGL is supported
        const heroContainer = document.querySelector('.hero-3d');
        if (heroContainer && hasWebGL) {
            this.heroScene = new HeroScene(heroContainer);
        } else if (heroContainer) {
            // Fallback to canvas/SVG animation
            this.initHeroFallback();
        }

        // Initialize animations
        window.animations = new Animations();

        // Initialize UI handlers
        window.ui = new UI();

        // Simulate asset loading
        await this.fakeLoading();
    }

    checkWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    initHeroFallback() {
        // Implement canvas/SVG fallback animation here
        console.log('WebGL not supported, using fallback animation');
    }

    async fakeLoading() {
        // Simulate asset loading time
        return new Promise(resolve => {
            const duration = Math.random() * 1000 + 1000; // 1-2 seconds
            setTimeout(resolve, duration);
        });
    }

    hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    this.revealContent();
                }
            });
        }
    }

    revealContent() {
        // Stagger-animate content sections
        const content = document.querySelectorAll('.stagger-fade');
        gsap.from(content, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    dispose() {
        // Clean up Three.js scene
        if (this.heroScene) {
            this.heroScene.dispose();
        }

        // Clean up animations
        if (window.animations) {
            window.animations.dispose();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
