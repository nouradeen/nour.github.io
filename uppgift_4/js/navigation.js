// navigation.js - Gemensam navigeringskomponent för alla sidor

document.addEventListener('DOMContentLoaded', function() {
    // Kontrollera om language.js är laddad
    const isLanguageUtilsLoaded = typeof window.languageUtils !== 'undefined';
    // Skapa global navigeringsmeny som en sidopanel
    const createGlobalMenu = () => {
        // Skapa överlägg för när sidopanelen är öppen
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        // Skapa sidopanelens navigeringscontainer
        const navContainer = document.createElement('nav');
        navContainer.className = 'global-menu';

        // Lägg till stängknapp på sidopanelen
        const closeButton = document.createElement('button');
        closeButton.className = 'close-nav';
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.addEventListener('click', toggleSidePanel);
        navContainer.appendChild(closeButton);

        // Skapa lista för navigeringslänkar
        const navList = document.createElement('ul');
        navList.className = 'nav-links';

        // Kontrollera om vi är i pages-katalogen eller rotkatalogen
        // Hantera både framåt- och bakåtsnedstreck för plattformsoberoende
        const isInPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
        const rootPrefix = isInPagesDir ? '../' : '';
        const pagesPrefix = isInPagesDir ? '' : 'pages/';

        // Definiera huvudnavigeringsobjekt
        const navItems = [
            { text: 'Startsida', href: `${rootPrefix}index.html` },
            { text: 'Bokkatalog', href: `${pagesPrefix}bokkatalog.html` },
            { text: 'Om Oss', href: `${pagesPrefix}om_oss.html` },
            { text: 'Inspiration', href: `${pagesPrefix}inspiration.html` },
            { text: 'Nyhetsbrev', href: `${pagesPrefix}nyhetsbrev.html` },
            { text: 'Kontakt', href: `${pagesPrefix}kontakt.html` }
        ];

        // Skapa listobjekt för varje navigeringsobjekt
        navItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            // Sätt originaltext och gör den översättningsbar
            a.textContent = item.text;
            if (isLanguageUtilsLoaded) {
                a.setAttribute('data-translate', item.text);
                a.textContent = window.languageUtils.translateText(item.text);
            }

            a.href = item.href;

            // Markera aktuell sida
            const currentPath = window.location.pathname.replace(/\\/g, '/'); // Normalisera sökvägsseparatorer
            const itemPath = item.href.split('/').pop(); // Hämta bara filnamnet

            if (currentPath.includes(itemPath)) {
                a.classList.add('active');
            }

            // Specialfall för startsidan
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

        // Skapa hjälpmeny med språkalternativ
        const helpMenu = document.createElement('div');
        helpMenu.className = 'help-menu';

        const helpButton = document.createElement('button');
        helpButton.className = 'help-button';
        helpButton.textContent = 'Hjälp';

        // Gör hjälpknappens text översättningsbar
        if (isLanguageUtilsLoaded) {
            helpButton.setAttribute('data-translate', 'Hjälp');
            helpButton.textContent = window.languageUtils.translateText('Hjälp');
        }

        helpButton.addEventListener('click', toggleHelpMenu);

        const helpDropdown = document.createElement('div');
        helpDropdown.className = 'help-dropdown';

        // Definiera språkalternativ med språkkoder
        const languageOptions = [
            { text: 'Svenska', langCode: 'sv' },
            { text: 'English', langCode: 'en' }
        ];

        // Skapa länkar för språkbyte
        languageOptions.forEach(option => {
            const a = document.createElement('a');
            a.textContent = option.text;
            a.setAttribute('data-lang', option.langCode);
            a.href = 'javascript:void(0);'; // Förhindra navigering

            // Lägg till klickhändelse för att byta språk
            a.addEventListener('click', function(e) {
                e.preventDefault();
                if (isLanguageUtilsLoaded) {
                    window.languageUtils.setLanguage(option.langCode);
                    toggleHelpMenu(); // Stäng menyn efter val
                }
            });

            helpDropdown.appendChild(a);
        });

        helpMenu.appendChild(helpButton);
        helpMenu.appendChild(helpDropdown);

        // Lägg till hjälpmenyn i navigeringscontainern
        navContainer.appendChild(helpMenu);

        // Lägg till sidopanelen i body
        document.body.appendChild(navContainer);

        return navContainer;
    };

    // Växla hjälpmenyns synlighet
    const toggleHelpMenu = (event) => {
        if (event) {
            event.stopPropagation();
        }
        const helpDropdown = document.querySelector('.help-dropdown');
        helpDropdown.classList.toggle('show');
    };

    // Växla sidopanelens synlighet
    const toggleSidePanel = () => {
        const sidePanel = document.querySelector('.global-menu');
        const overlay = document.querySelector('.nav-overlay');

        sidePanel.classList.toggle('open');
        overlay.classList.toggle('open');

        // Växla body-scrollning när sidopanelen är öppen
        if (sidePanel.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Skapa sidopanelsnavigering
    createGlobalMenu();

    // Lägg till händelselyssnare för hamburgermenyn
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleSidePanel);
    }

    // Lägg till händelselyssnare för att stänga sidopanelen när man klickar utanför
    const overlay = document.querySelector('.nav-overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidePanel);
    }

    // Lägg till händelselyssnare för att stänga hjälpmenyn när man klickar utanför
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

    // Lyssna efter språkändringshändelser
    if (isLanguageUtilsLoaded) {
        document.addEventListener('languageChanged', function(event) {
            // Uppdatera sökfältets platshållare
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                if (input.placeholder === 'Sök' || input.placeholder === 'Search') {
                    const translatedPlaceholder = window.languageUtils.translateText('Sök');
                    input.placeholder = translatedPlaceholder;
                }
            });

            // Uppdatera hjälpknappens text
            const helpButton = document.querySelector('.help-button');
            if (helpButton && helpButton.hasAttribute('data-translate')) {
                const originalText = helpButton.getAttribute('data-translate');
                helpButton.textContent = window.languageUtils.translateText(originalText);
            }

            // Uppdatera navigeringsobjekt
            const navLinks = document.querySelectorAll('.nav-links a[data-translate]');
            navLinks.forEach(link => {
                const originalText = link.getAttribute('data-translate');
                link.textContent = window.languageUtils.translateText(originalText);
            });
        });
    }
});
