document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Handling ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('svg'); // Or create separate icons

    // Check for saved user preference, otherwise default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme immediately
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update Icon (Sun for dark mode to switch to light, Moon for light to switch to dark)
        if (theme === 'dark') {
            // Show Sun icon (to switch to light)
            themeToggleBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>`;
        } else {
            // Show Moon icon (to switch to dark)
            themeToggleBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>`;
        }
    }


    // --- 2. Scroll Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- 3. Tab Filtering Logic ---
    window.filterProjects = function(category, btn) {
        // Reset Buttons
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
            // Note: text color is now handled by CSS variable logic automatically
        });
        btn.classList.add('active');

        // Filter Cards
        const allCards = document.querySelectorAll('.project-card');
        allCards.forEach(card => {
            card.classList.remove('fade-in');
            void card.offsetWidth; // Trigger reflow
            
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    };
});