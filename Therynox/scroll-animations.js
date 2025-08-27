// Scroll Animations JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Function to ensure all images are visible
    function ensureImagesVisible() {
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            img.style.opacity = '1';
            img.style.visibility = 'visible';
            img.style.display = 'block';
        });
    }
    
    // Call immediately
    ensureImagesVisible();
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fade-in-up';
                const stagger = element.dataset.stagger || '';
                
                // Add animation class
                element.classList.add(`animate-${animationType}`);
                if (stagger) {
                    element.classList.add(`stagger-${stagger}`);
                }
                
                // Mark as animated to prevent re-triggering
                element.dataset.animated = 'true';
                
                // Ensure images within this element remain visible
                const imagesInElement = element.querySelectorAll('img');
                imagesInElement.forEach(img => {
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = 'block';
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Image loading animations - ensure images are always visible
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Remove any loading classes that might hide images
        img.classList.remove('image-loading');
        img.classList.add('image-loaded');
        
        // Ensure images are visible
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
    });

    // Navbar scroll effect - REMOVED to keep navbar fixed
    const navbar = document.querySelector('#nav-bar');
    
    // Only add scrolled class for styling, no hide/show functionality
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for navbar styling only
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Typing animation effect
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #fff';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        typingObserver.observe(element);
    });

    // Floating animation for elements
    const floatingElements = document.querySelectorAll('.floating-animation');
    floatingElements.forEach(element => {
        element.style.animation = 'floating 3s ease-in-out infinite';
    });

    // Add floating keyframes if not already present
    if (!document.querySelector('#floating-keyframes')) {
        const style = document.createElement('style');
        style.id = 'floating-keyframes';
        style.textContent = `
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Call ensureImagesVisible again after a short delay to handle any dynamic content
    setTimeout(ensureImagesVisible, 100);
    setTimeout(ensureImagesVisible, 500);
    setTimeout(ensureImagesVisible, 1000);
}); 