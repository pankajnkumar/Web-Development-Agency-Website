document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#nav-bar ul');
    const navLinks = document.querySelectorAll('#nav-bar ul li a');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link and update active class
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove 'active' from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' to the clicked link
            e.target.classList.add('active');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Scroll-based active navigation
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.querySelector('#nav-bar').offsetHeight;
        const scrollPos = window.scrollY + navbarHeight + 50; // Account for navbar height + smaller offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`#nav-bar ul li a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Special handling for process section - keep Services active
                if (sectionId === 'process') {
                    const servicesLink = document.querySelector('#nav-bar ul li a[href="#services"]');
                    if (servicesLink) {
                        servicesLink.classList.add('active');
                    }
                } else {
                    // Add active class to the corresponding nav link
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }
                }
            }
        });

        // Special handling for hero section (top of page)
        if (scrollPos < navbarHeight + 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('#nav-bar ul li a[href="#hero"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load to set initial active state
    updateActiveNavLink();

    // Handle footer quick links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(footerLink => {
        footerLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove 'active' from all navbar links
            navLinks.forEach(l => l.classList.remove('active'));
            // Find the corresponding navbar link by href
            const href = this.getAttribute('href');
            const matchingNav = Array.from(navLinks).find(link => link.getAttribute('href') === href);
            if (matchingNav) {
                matchingNav.classList.add('active');
            }
            // Scroll to the section smoothly
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}); 