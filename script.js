// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    body.className = savedTheme;
} else if (systemPrefersDark) {
    body.className = 'dark-mode';
}

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
    } else {
        mobileMenu.classList.remove('active');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animating once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(el => observer.observe(el));
} else {
    // If reduced motion is preferred, make all elements visible immediately
    animateElements.forEach(el => {
        el.classList.add('visible');
        el.style.transform = 'none';
        el.style.opacity = '1';
        el.style.transition = 'none';
    });
}


// Typing Effect Logic
const phrases = ['Text typing effect', 'for your websites', 'Happy coding!'];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

const typingElement = document.getElementById('typing-text');

function loop() {
    if (!typingElement) return;
    isEnd = false;
    typingElement.innerHTML = currentPhrase.join('');

    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            typingElement.innerHTML = currentPhrase.join('');
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop();
            j--;
            typingElement.innerHTML = currentPhrase.join('');
        }

        if (j == phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) {
                i = 0;
            }
        }
    }
    const spedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (150 - 50) + 50;
    const time = isEnd ? 1500 : isDeleting ? spedUp : normalSpeed;
    setTimeout(loop, time);
}

if (typingElement) {
    loop();
}

// Before/After Slider Logic
function initSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.img-before-wrapper');
        const divider = slider.querySelector('.slider-divider');
        let isDragging = false;
        
        function moveSlider(clientX) {
            const rect = slider.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Constrain x to bounds
            x = Math.max(0, Math.min(x, rect.width));
            
            const percent = (x / rect.width) * 100;
            
            // Update positions
            wrapper.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
            divider.style.left = `${percent}%`;
        }
        
        // Mouse Events
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });
        
        // Touch Events
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        }, {passive: true});
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        }, {passive: true});
        
        // Keyboard Support
        slider.addEventListener('keydown', (e) => {
            const rect = slider.getBoundingClientRect();
            // Default is 50% usually, but we need current percent. We can parse it from divider.style.left or keep a state.
            let currentLeft = parseFloat(divider.style.left) || 50;
            let step = 5; // 5% per key press
            
            if (e.key === 'ArrowLeft') {
                currentLeft = Math.max(0, currentLeft - step);
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                currentLeft = Math.min(100, currentLeft + step);
                e.preventDefault();
            } else {
                return;
            }
            
            wrapper.style.clipPath = `polygon(0 0, ${currentLeft}% 0, ${currentLeft}% 100%, 0 100%)`;
            divider.style.left = `${currentLeft}%`;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSliders();
});

// Hero Scroll Animation
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Only animate if we are within the first screen height
    if (scrollY <= window.innerHeight) {
        const progress = scrollY / window.innerHeight;
        
        if (heroBg) {
            // Scale up to 1.1 max
            const scale = 1 + (progress * 0.1);
            heroBg.style.transform = `scale(${scale})`;
        }
        
        if (heroContent) {
            // Translate up slightly and fade out
            const translateY = progress * 50; // up to 50px
            const opacity = Math.max(0, 1 - (progress * 2)); // fade out twice as fast
            heroContent.style.transform = `translateY(-${translateY}px)`;
            heroContent.style.opacity = opacity;
        }
        
        if (scrollIndicator) {
            // Fade out quickly
            const opacity = Math.max(0, 1 - (progress * 4));
            scrollIndicator.style.opacity = opacity;
        }
    }
});
