document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const themeToggle = document.getElementById('themeToggle');
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const zoomButtons = document.querySelectorAll('.zoom-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    const navLinks = document.querySelectorAll('.nav-link');
    const fixedHeader = document.querySelector('.fixed-nav');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Dark mode toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Learn more buttons functionality
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const extraInfo = this.nextElementSibling;
            const isHidden = extraInfo.style.display === 'none' || !extraInfo.style.display;
            
            extraInfo.style.display = isHidden ? 'block' : 'none';
            this.textContent = isHidden ? 'Tampilkan Lebih Sedikit' : 'Pelajari Lebih Lanjut';
        });
    });

    // Image zoom functionality
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imgSrc = this.previousElementSibling.src;
            modalImg.src = imgSrc;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Modal close functionality
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = fixedHeader.offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
                
                // Update URL without reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Highlight active section while scrolling
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const headerHeight = fixedHeader.offsetHeight;
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerHeight - 50) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    // Initial highlight check
    highlightActiveSection();
    
    // Throttle scroll events for better performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(highlightActiveSection, 50);
    }, false);
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('.nav-container').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});