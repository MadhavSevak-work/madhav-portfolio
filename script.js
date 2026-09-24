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

// Hero Scroll animation removed as requested for the clean cinematic layout.

// Blur Fade Animations for Showcase
const showcaseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('exit-up');
        } else {
            entry.target.classList.remove('in-view');
            if (entry.boundingClientRect.y < 0) {
                entry.target.classList.add('exit-up');
            }
        }
    });
}, {
    threshold: 0.4,
    // Add rootMargin to start animating slightly before center if desired, but 0.4 threshold is usually fine
});

document.querySelectorAll('.blur-fade-anim').forEach(el => showcaseObserver.observe(el));



// Dynamic PDF Resume Generation
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('download-resume-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generateResumePDF();
    });
  }
});

function generateResumePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  let y = 20;
  const leftMargin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Helper for adding text with word wrap
  const addWrappedText = (text, x, yPos, maxWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, yPos);
    return lines.length * 5;
  };
  
  // 1. Header Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('MADHAV SEVAK', pageWidth / 2, y, { align: 'center' });
  y += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('B.Tech Computer Science & Engineering Student', pageWidth / 2, y, { align: 'center' });
  y += 6;
  
  doc.setFontSize(10);
  doc.text('madhavsevak.work@gmail.com | +919024327604 | Pune, Maharastra', pageWidth / 2, y, { align: 'center' });
  y += 15;
  
  // Section Title Helper
  const addSectionTitle = (title) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, leftMargin, y);
    y += 2;
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 6;
  };
  
  // 2. ABOUT ME
  addSectionTitle('ABOUT ME');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const aboutText = 'B.Tech Computer Science & Engineering student at MIT World Peace University with a foundation in C, C++, SQL. Currently developing skills in Computer Graphics and 3D modeling using Blender and OPENGL. Interested in building practical projects, improving programming skills and exploring different areas of technology.';
  y += addWrappedText(aboutText, leftMargin, y, pageWidth - 2 * leftMargin);
  y += 8;
  
  // 3. PRACTICAL WORK
  addSectionTitle('PRACTICAL WORK');
  
  const addProject = (title, bullets) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(title, leftMargin, y);
    y += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    bullets.forEach(bullet => {
      doc.text('\u2022 ', leftMargin + 2, y);
      const dy = addWrappedText(bullet, leftMargin + 6, y, pageWidth - 2 * leftMargin - 6);
      y += dy;
    });
    y += 4;
  };
  
  addProject('Schedule Manager', [
    'Live Demo: schedule-manager-two.vercel.app',
    'Developed a web-based Schedule Manager application using JavaScript to help users organize and track their daily tasks and events.'
  ]);
  
  addProject('Photobooth', [
    'Live Demo: https://photobooth-madhav.vercel.app',
    'Created an interactive Photobooth web application featuring a highly stylized front-end built primarily with CSS.'
  ]);
  
  addProject('Chess Pawn Visualization (Tag: BLENDER)', [
    'Modeled a detailed chess pawn in Blender using precision-based 3D modeling techniques. Applied materials, lighting, camera positioning, and rendering to create a realistic chessboard scene.'
  ]);
  
  addProject('Perfume Bottle Visualization (Tag: BLENDER)', [
    'Designed and rendered a perfume bottle in Blender, focusing on product modeling, proportions, materials, studio lighting, and composition to create a professional product visualization.',
    'Live Demo: madhav_sevak.artstation.com'
  ]);
  y += 4;
  
  // 4. EDUCATION
  addSectionTitle('EDUCATION');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Bachelor of Technology', leftMargin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('2024-2028', pageWidth - leftMargin, y, { align: 'right' });
  y += 5;
  doc.setFontSize(10);
  doc.text('\u2022 Computer Science & Engineering', leftMargin + 2, y);
  y += 5;
  doc.text('\u2022 MIT World Peace University, Pune', leftMargin + 2, y);
  y += 12;
  
  // 5. KEY SKILLS
  addSectionTitle('KEY SKILLS');
  const skills = ['C Language', 'C++ Language', 'MYSQL', 'Blender', 'OPENGL'];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  skills.forEach(skill => {
    doc.text('\u2022 ' + skill, leftMargin + 2, y);
    y += 5;
  });
  y += 8;
  
  // 6. Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('https://github.com/MadhavSevak-work  |  madhav_sevak.artstation.com', pageWidth / 2, 280, { align: 'center' });
  
  // Save the PDF
  doc.save('Madhav_Sevak_Resume.pdf');
}
