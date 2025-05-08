// navigation.js - Common navigation component for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Create global navigation menu as a side panel
    const createGlobalMenu = () => {
        // Create overlay for when side panel is open
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        // Create the side panel navigation container
        const navContainer = document.createElement('nav');
        navContainer.className = 'global-menu';

        // Add close button to the side panel
        const closeButton = document.createElement('button');
        closeButton.className = 'close-nav';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', toggleSidePanel);
        navContainer.appendChild(closeButton);

        // Create navigation links list
        const navList = document.createElement('ul');
        navList.className = 'nav-links';

        // Check if we're in the pages directory or root directory
        // Handle both forward and backslashes for cross-platform compatibility
        const isInPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
        const rootPrefix = isInPagesDir ? '../' : '';
        const pagesPrefix = isInPagesDir ? '' : 'pages/';

        // Define main navigation items
        const navItems = [
            { text: 'Startsida', href: `${rootPrefix}index.html` },
            { text: 'Bokkatalog', href: `${pagesPrefix}bokkatalog.html` },
            { text: 'Om Oss', href: `${pagesPrefix}om_oss.html` },
            { text: 'Inspiration', href: `${pagesPrefix}inspiration.html` },
            { text: 'Nyhetsbrev', href: `${pagesPrefix}nyhetsbrev.html` },
            { text: 'Kontakt', href: `${pagesPrefix}kontakt.html` }
        ];

        // Create list items for each navigation item
        navItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = item.text;
            a.href = item.href;

            // Highlight current page
            const currentPath = window.location.pathname.replace(/\\/g, '/'); // Normalize path separators
            const itemPath = item.href.split('/').pop(); // Get just the filename

            if (currentPath.includes(itemPath)) {
                a.classList.add('active');
            }

            // Special case for home page
            if (item.text === 'Startsida' && (
                currentPath.endsWith('/') ||
                currentPath.endsWith('index.html') ||
                currentPath.endsWith('Uppgift 4/') ||
                currentPath.endsWith('Uppgift 4')
            )) {
                a.classList.add('active');
            }

            li.appendChild(a);
            navList.appendChild(li);
        });

        navContainer.appendChild(navList);

        // Create help menu with language options
        const helpMenu = document.createElement('div');
        helpMenu.className = 'help-menu';

        const helpButton = document.createElement('button');
        helpButton.className = 'help-button';
        helpButton.textContent = 'Hjälp';
        helpButton.addEventListener('click', toggleHelpMenu);

        const helpDropdown = document.createElement('div');
        helpDropdown.className = 'help-dropdown';

        const languageOptions = [
            { text: 'Svenska', href: `${pagesPrefix}svenska.html` },
            { text: 'English', href: `${pagesPrefix}english.html` }
        ];

        languageOptions.forEach(option => {
            const a = document.createElement('a');
            a.textContent = option.text;
            a.href = option.href;
            helpDropdown.appendChild(a);
        });

        helpMenu.appendChild(helpButton);
        helpMenu.appendChild(helpDropdown);

        // Add the help menu to the navigation container
        navContainer.appendChild(helpMenu);

        // Add the side panel to the body
        document.body.appendChild(navContainer);

        return navContainer;
    };

    // Toggle help menu visibility
    const toggleHelpMenu = (event) => {
        if (event) {
            event.stopPropagation();
        }
        const helpDropdown = document.querySelector('.help-dropdown');
        helpDropdown.classList.toggle('show');
    };

    // Toggle side panel visibility
    const toggleSidePanel = () => {
        const sidePanel = document.querySelector('.global-menu');
        const overlay = document.querySelector('.nav-overlay');

        sidePanel.classList.toggle('open');
        overlay.classList.toggle('open');

        // Toggle body scroll when side panel is open
        if (sidePanel.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Create the side panel navigation
    createGlobalMenu();

    // Add event listener to burger menu button
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleSidePanel);
    }

    // Add event listener to overlay to close side panel when clicking outside
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidePanel);
    }

    // Add event listener to close help menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.help-button')) {
            const dropdowns = document.getElementsByClassName('help-dropdown');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    });
});
