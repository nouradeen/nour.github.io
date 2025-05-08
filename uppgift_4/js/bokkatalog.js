// bokkatalog.js - Funktionalitet för bokkatalogssidan

document.addEventListener('DOMContentLoaded', function() {
    // Kontrollera om det finns en sökparameter i URL:en
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');

    // Bokdata - i en riktig applikation skulle detta komma från en databas
    const books = [
        {
            id: 1,
            title: "Skuggans Hemlighet",
            author: "Astrid Lindgren",
            price: 299,
            year: 2018,
            genre: "Skönlitteratur",
            cover: "../images/skuggans hemlighet.jpg"
        },
        {
            id: 2,
            title: "Midnattsstjärnan",
            author: "Jonas Gardell",
            price: 199,
            year: 2020,
            genre: "Skönlitteratur",
            cover: "../images/midnattssjärnan.jpg"
        },
        {
            id: 3,
            title: "Den Sista Resan",
            author: "Camilla Läckberg",
            price: 249,
            year: 2019,
            genre: "Deckare",
            cover: "../images/den sistan resan.jpg"
        },
        {
            id: 4,
            title: "Vindens Skugga",
            author: "Stieg Larsson",
            price: 349,
            year: 2015,
            genre: "Deckare",
            cover: "../images/vindens skugga.jpg"
        },
        {
            id: 5,
            title: "Glasbarnen",
            author: "Kristina Ohlsson",
            price: 179,
            year: 2017,
            genre: "Barnböcker",
            cover: "../images/glasbarnen.jpg"
        },
        {
            id: 6,
            title: "Stjärnklart",
            author: "Fredrik Backman",
            price: 229,
            year: 2021,
            genre: "Skönlitteratur",
            cover: "../images/sjärnklart.jpg"
        },
        {
            id: 7,
            title: "Digital Läsning",
            author: "Maria Svensson",
            price: 159,
            year: 2022,
            genre: "E-böcker",
            cover: "../images/skuggans hemlighet.jpg" // Reusing existing image
        },
        {
            id: 8,
            title: "Ljudboken",
            author: "Per Andersson",
            price: 189,
            year: 2021,
            genre: "Ljudböcker",
            cover: "../images/midnattssjärnan.jpg" // Reusing existing image
        },
        {
            id: 9,
            title: "Pocketguiden",
            author: "Lisa Nilsson",
            price: 99,
            year: 2019,
            genre: "Pocket",
            cover: "../images/glasbarnen.jpg" // Reusing existing image
        },
        {
            id: 10,
            title: "Vetenskapens Värld",
            author: "Johan Berg",
            price: 279,
            year: 2020,
            genre: "Facklitteratur",
            cover: "../images/vindens skugga.jpg" // Reusing existing image
        }
    ];

    // DOM-element som används i skriptet
    const bookGrid = document.querySelector('.book-grid');
    const headerSearchInput = document.querySelector('header .search-input');
    const headerSearchButton = document.querySelector('header .search-button');
    const controlsSearchInput = document.querySelector('.search-control input');
    const filterYearInput = document.getElementById('filter-year');
    const filterAuthorInput = document.getElementById('filter-author');
    const genreCheckboxes = document.querySelectorAll('.filter-section:nth-child(3) input[type="checkbox"]');
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    const resetFilterBtn = document.querySelector('.reset-filter-btn');
    const sortOptions = document.querySelectorAll('.sort-menu-option');

    // Aktuellt tillstånd för filter och sortering
    let currentFilters = {
        year: '',        // Årtal att filtrera på
        author: '',      // Författare att filtrera på
        genres: []       // Lista med genrer att filtrera på
    };
    let currentSort = 'default';  // Aktuell sorteringsmetod
    let searchTerm = '';          // Aktuell sökterm

    // Initialisera bokrutnätet med data-attribut
    function initializeBookGrid() {
        // Rensa befintligt bokrutnät
        bookGrid.innerHTML = '';

        // Skapa bokkort med data-attribut för varje bok
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            // Lägg till data-attribut för filtrering och sortering
            bookCard.dataset.id = book.id;
            bookCard.dataset.title = book.title;
            bookCard.dataset.author = book.author;
            bookCard.dataset.price = book.price;
            bookCard.dataset.year = book.year;
            bookCard.dataset.genre = book.genre;

            // Skapa HTML-innehåll för bokkortet
            bookCard.innerHTML = `
                <div class="book-cover" style="background-image: url('${book.cover}'); background-size: cover; background-position: center;"></div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>${book.price} kr</p>
                </div>
            `;

            // Lägg till bokkortet i rutnätet
            bookGrid.appendChild(bookCard);
        });
    }

    // Filtrera böcker baserat på aktuella filter och sökterm
    function filterBooks() {
        const bookCards = document.querySelectorAll('.book-card');
        let visibleCount = 0;

        // Gå igenom alla bokkort och kontrollera om de matchar filtren
        bookCards.forEach(card => {
            // Hämta data från bokkortets attribut
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const year = card.dataset.year;
            const genre = card.dataset.genre;

            // Kontrollera om boken matchar söktermen
            const matchesSearch = searchTerm === '' ||
                title.includes(searchTerm.toLowerCase()) ||
                author.includes(searchTerm.toLowerCase());

            // Kontrollera om boken matchar årsfilter
            const matchesYear = currentFilters.year === '' ||
                year.includes(currentFilters.year);

            // Kontrollera om boken matchar författarfilter
            const matchesAuthor = currentFilters.author === '' ||
                author.includes(currentFilters.author.toLowerCase());

            // Kontrollera om boken matchar genrefilter
            const matchesGenre = currentFilters.genres.length === 0 ||
                currentFilters.genres.includes(genre);

            // Visa/dölj bok baserat på alla filter
            if (matchesSearch && matchesYear && matchesAuthor && matchesGenre) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Visa/dölj meddelande om inga resultat hittades
        let noResultsMsg = document.querySelector('.no-results-message');

        if (visibleCount === 0) {
            // Om inga böcker visas och inget meddelande finns, skapa ett
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.textContent = 'Inga böcker matchar dina filter. Försök med andra filteralternativ.';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '20px';
                noResultsMsg.style.color = 'var(--text-dark)';
                noResultsMsg.style.fontWeight = 'bold';
                bookGrid.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            // Ta bort meddelandet om det finns böcker att visa
            noResultsMsg.remove();
        }
    }

    // Sortera böcker baserat på aktuellt sorteringsalternativ
    function sortBooks() {
        // Konvertera NodeList till Array för att kunna använda sort-metoden
        const bookCards = Array.from(document.querySelectorAll('.book-card'));

        // Sortera baserat på valt alternativ
        switch (currentSort) {
            case 'a-z':
                // Sortera alfabetiskt A till Ö
                bookCards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
                break;
            case 'z-a':
                // Sortera alfabetiskt Ö till A
                bookCards.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
                break;
            case 'author':
                // Sortera efter författare
                bookCards.sort((a, b) => a.dataset.author.localeCompare(b.dataset.author));
                break;
            case 'year':
                // Sortera efter år (nyast först)
                bookCards.sort((a, b) => b.dataset.year - a.dataset.year);
                break;
            case 'price-low-high':
                // Sortera efter pris (lägst först)
                bookCards.sort((a, b) => a.dataset.price - b.dataset.price);
                break;
            case 'price-high-low':
                // Sortera efter pris (högst först)
                bookCards.sort((a, b) => b.dataset.price - a.dataset.price);
                break;
            default:
                // Standardsortering (efter ID)
                bookCards.sort((a, b) => a.dataset.id - b.dataset.id);
        }

        // Lägg till de sorterade korten i rutnätet igen
        bookCards.forEach(card => {
            bookGrid.appendChild(card);
        });
    }

    // Tillämpa filter och sortering
    function applyFiltersAndSort() {
        filterBooks();
        sortBooks();
    }

    // Återställ alla filter och sökningar
    function resetFilters() {
        // Rensa filterinmatningsfält
        filterYearInput.value = '';
        filterAuthorInput.value = '';

        // Avmarkera alla genrekriterier
        genreCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Återställ filtertillstånd
        currentFilters = {
            year: '',
            author: '',
            genres: []
        };

        // Återställ sökning
        searchTerm = '';
        headerSearchInput.value = '';
        controlsSearchInput.value = '';

        // Återställ sortering till standard
        currentSort = 'default';

        // Ta bort aktiv klass från alla sorteringsalternativ
        sortOptions.forEach(option => {
            option.classList.remove('active');
        });

        // Tillämpa återställningen
        applyFiltersAndSort();
    }

    // Händelselyssnare för användarinteraktioner

    // Sökfunktion i sidhuvudet
    headerSearchButton.addEventListener('click', function() {
        // Uppdatera söktermen när användaren klickar på sökknappen
        searchTerm = headerSearchInput.value.trim();
        controlsSearchInput.value = searchTerm; // Synkronisera båda sökfälten
        applyFiltersAndSort();
    });

    // Sökfunktion i sidhuvudet med Enter-tangenten
    headerSearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            // Uppdatera söktermen när användaren trycker Enter
            searchTerm = headerSearchInput.value.trim();
            controlsSearchInput.value = searchTerm; // Synkronisera båda sökfälten
            applyFiltersAndSort();
        }
    });

    // Sökfunktion i kontrollpanelen
    controlsSearchInput.addEventListener('input', function() {
        // Uppdatera söktermen när användaren skriver i sökfältet
        searchTerm = controlsSearchInput.value.trim();
        headerSearchInput.value = searchTerm; // Synkronisera båda sökfälten
        applyFiltersAndSort();
    });

    // Knapp för att tillämpa filter
    applyFilterBtn.addEventListener('click', function() {
        // Hämta årsfilter
        currentFilters.year = filterYearInput.value.trim();

        // Hämta författarfilter
        currentFilters.author = filterAuthorInput.value.trim();

        // Hämta genrefilter från kryssrutor
        currentFilters.genres = [];
        genreCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                currentFilters.genres.push(checkbox.value);
            }
        });

        // Tillämpa filter och sortering
        applyFiltersAndSort();

        // Stäng rullgardinsmenyn efter att filter tillämpats
        document.querySelector('.filter-control.dropdown').classList.remove('open');
    });

    // Knapp för att återställa filter
    resetFilterBtn.addEventListener('click', function() {
        // Återställ alla filter
        resetFilters();

        // Stäng rullgardinsmenyn efter återställning
        document.querySelector('.filter-control.dropdown').classList.remove('open');
    });

    // Sorteringsalternativ
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortText = this.textContent.trim();

            // Ta bort aktiv klass från alla alternativ
            sortOptions.forEach(opt => opt.classList.remove('active'));

            // Lägg till aktiv klass på valt alternativ
            this.classList.add('active');

            // Sätt aktuell sortering baserat på alternativets text
            switch (sortText) {
                case 'A→Z':
                    currentSort = 'a-z';
                    break;
                case 'Z→A':
                    currentSort = 'z-a';
                    break;
                case 'Författare':
                    currentSort = 'author';
                    break;
                case 'År':
                    currentSort = 'year';
                    break;
                case 'Pris: Lågt till högt':
                    currentSort = 'price-low-high';
                    break;
                case 'Pris: Högt till lågt':
                    currentSort = 'price-high-low';
                    break;
            }

            // Tillämpa sortering
            applyFiltersAndSort();

            // Stäng rullgardinsmenyn efter val av sortering
            document.querySelector('.sort-control.dropdown').classList.remove('open');
        });
    });

    // Initialisera bokrutnätet när sidan laddas
    initializeBookGrid();

    // Tillämpa sökparameter från URL om den finns
    if (searchParam) {
        // Sätt söktermen från URL-parametern
        searchTerm = searchParam;
        headerSearchInput.value = searchTerm;
        if (controlsSearchInput) {
            controlsSearchInput.value = searchTerm;
        }
        // Tillämpa filter och sortering med söktermen
        applyFiltersAndSort();
    }
});
