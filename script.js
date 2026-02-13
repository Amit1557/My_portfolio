// ============================================
// AMIT KUMAR - PORTFOLIO JAVASCRIPT
// Modern Interactive Features & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVBAR FUNCTIONALITY
    // ============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger (guard spans existence)
            const spans = hamburger.querySelectorAll('span') || [];
            if (navMenu.classList.contains('active')) {
                if (spans[0]) spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                if (spans[1]) spans[1].style.opacity = '0';
                if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                if (spans[0]) spans[0].style.transform = 'none';
                if (spans[1]) spans[1].style.opacity = '1';
                if (spans[2]) spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) {
                const spans = hamburger.querySelectorAll('span') || [];
                if (spans[0]) spans[0].style.transform = 'none';
                if (spans[1]) spans[1].style.opacity = '1';
                if (spans[2]) spans[2].style.transform = 'none';
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // TYPING ANIMATION
    // ============================================
    const typingText = document.querySelector('.typing-text');
    const textArray = [
        'Software Developer',
        'Problem Solver',
        'Java Programmer',
        'ML Enthusiast',
        'Web Developer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentText = textArray[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex);
            charIndex = Math.max(0, charIndex - 1);
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex);
            charIndex = Math.min(currentText.length, charIndex + 1);
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const progress = parseInt(bar.getAttribute('data-progress') || '0', 10);
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight && rect.bottom > 0) {
                bar.style.width = progress + '%';
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================
    const scrollRevealElements = document.querySelectorAll('.skill-category, .certification-card, .project-card, .about-text, .contact-content');
    
    scrollRevealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    function revealOnScroll() {
        scrollRevealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    // CONTACT FORM HANDLING WITH WEB3FORMS
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields!', 'error');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFormMessage('Please enter a valid email address!', 'error');
                return;
            }

            // Show sending message
            showFormMessage('Sending your message...', 'success');

            try {
                // Send form data to Web3Forms
                const formData = new FormData(contactForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                let data = { success: false };
                try {
                    if (response.ok) {
                        data = await response.json();
                    }
                } catch (err) {
                    // If response isn't JSON, keep default
                }

                if (data && data.success) {
                    showFormMessage('Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
                }
            } catch (error) {
                showFormMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
            }
        });
    }

    function showFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // UPDATE FOOTER YEAR
    // ============================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // PARTICLES EFFECT (Optional Enhancement)
    // ============================================
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(100, 108, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-10px';
        particle.style.zIndex = '-1';
        
        document.body.appendChild(particle);

        const duration = Math.random() * 3 + 2;
        const size = Math.random() * 3 + 1;
        
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) scale(${size})`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => particle.remove();
    }

    // Create particles periodically (commented out by default for performance)
    // setInterval(createParticle, 300);

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
    console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #00d4ff;');
    console.log('%cFeel free to reach out: amit575124@gmail.com', 'font-size: 12px; color: #a0a0b0;');
});
