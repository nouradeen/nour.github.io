// search.js - Global sökfunktionalitet för alla sidor

document.addEventListener('DOMContentLoaded', function() {
    // Hämta sökelement från sidan
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // Kontrollera att sökelementen finns på sidan
    if (!searchInput || !searchButton) {
        console.error('Sökelement hittades inte på sidan');
        return;
    }

    // Funktion för att hantera sökning
    const handleSearch = () => {
        // Hämta söktermen och ta bort eventuella blanksteg i början och slutet
        const searchTerm = searchInput.value.trim();

        // Sök inte om inmatningsfältet är tomt
        if (searchTerm === '') {
            return;
        }

        // Kontrollera om vi redan är på bokkatalogssidan
        const isOnBookkatalog = window.location.pathname.includes('bokkatalog.html');

        if (isOnBookkatalog) {
            // Om vi redan är på bokkatalogssidan, uppdatera bara sökfältet
            // Filen bokkatalog.js kommer att hantera sökningen

            // Kontrollera om det finns ett sökfält i kontrollpanelen (specifikt för bokkatalog.html)
            const controlsSearchInput = document.querySelector('.search-control input');
            if (controlsSearchInput) {
                // Uppdatera värdet i kontrollpanelens sökfält
                controlsSearchInput.value = searchTerm;

                // Utlös sökningen genom att skicka en input-händelse
                const inputEvent = new Event('input', { bubbles: true });
                controlsSearchInput.dispatchEvent(inputEvent);
            }
        } else {
            // Om vi är på en annan sida, omdirigera till bokkatalog.html med söktermen som parameter

            // Kontrollera om vi är i pages-katalogen eller rotkatalogen
            const isInPagesDir = window.location.pathname.includes('/pages/') ||
                                window.location.pathname.includes('\\pages\\');

            // Skapa URL baserat på aktuell plats
            const bokkatalogUrl = isInPagesDir ?
                'bokkatalog.html?search=' + encodeURIComponent(searchTerm) :
                'pages/bokkatalog.html?search=' + encodeURIComponent(searchTerm);

            // Omdirigera till bokkatalogssidan med sökparametern
            window.location.href = bokkatalogUrl;
        }
    };

    // Lägg till händelselyssnare för sökknappen
    searchButton.addEventListener('click', handleSearch);

    // Lägg till händelselyssnare för Enter-tangenten i sökfältet
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });
});
