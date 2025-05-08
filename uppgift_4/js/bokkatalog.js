// bokkatalog.js - Functionality for the book catalog page

document.addEventListener('DOMContentLoaded', function() {
    // Book data - in a real application, this would come from a database
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

    // DOM Elements
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

    // Current filter and sort state
    let currentFilters = {
        year: '',
        author: '',
        genres: []
    };
    let currentSort = 'default';
    let searchTerm = '';

    // Initialize the book grid with data attributes
    function initializeBookGrid() {
        // Clear existing book grid
        bookGrid.innerHTML = '';

        // Create book cards with data attributes
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.dataset.id = book.id;
            bookCard.dataset.title = book.title;
            bookCard.dataset.author = book.author;
            bookCard.dataset.price = book.price;
            bookCard.dataset.year = book.year;
            bookCard.dataset.genre = book.genre;

            bookCard.innerHTML = `
                <div class="book-cover" style="background-image: url('${book.cover}'); background-size: cover; background-position: center;"></div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p>${book.price} kr</p>
                </div>
            `;

            bookGrid.appendChild(bookCard);
        });
    }

    // Filter books based on current filters and search term
    function filterBooks() {
        const bookCards = document.querySelectorAll('.book-card');
        let visibleCount = 0;

        bookCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const author = card.dataset.author.toLowerCase();
            const year = card.dataset.year;
            const genre = card.dataset.genre;

            // Check if book matches search term
            const matchesSearch = searchTerm === '' ||
                title.includes(searchTerm.toLowerCase()) ||
                author.includes(searchTerm.toLowerCase());

            // Check if book matches year filter
            const matchesYear = currentFilters.year === '' ||
                year.includes(currentFilters.year);

            // Check if book matches author filter
            const matchesAuthor = currentFilters.author === '' ||
                author.includes(currentFilters.author.toLowerCase());

            // Check if book matches genre filter
            const matchesGenre = currentFilters.genres.length === 0 ||
                currentFilters.genres.includes(genre);

            // Show/hide book based on all filters
            if (matchesSearch && matchesYear && matchesAuthor && matchesGenre) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        let noResultsMsg = document.querySelector('.no-results-message');

        if (visibleCount === 0) {
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
            noResultsMsg.remove();
        }
    }

    // Sort books based on current sort option
    function sortBooks() {
        const bookCards = Array.from(document.querySelectorAll('.book-card'));

        // Sort based on selected option
        switch (currentSort) {
            case 'a-z':
                bookCards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
                break;
            case 'z-a':
                bookCards.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
                break;
            case 'author':
                bookCards.sort((a, b) => a.dataset.author.localeCompare(b.dataset.author));
                break;
            case 'year':
                bookCards.sort((a, b) => b.dataset.year - a.dataset.year);
                break;
            case 'price-low-high':
                bookCards.sort((a, b) => a.dataset.price - b.dataset.price);
                break;
            case 'price-high-low':
                bookCards.sort((a, b) => b.dataset.price - a.dataset.price);
                break;
            default:
                // Default sort (by ID)
                bookCards.sort((a, b) => a.dataset.id - b.dataset.id);
        }

        // Re-append sorted cards to the grid
        bookCards.forEach(card => {
            bookGrid.appendChild(card);
        });
    }

    // Apply filters and sort
    function applyFiltersAndSort() {
        filterBooks();
        sortBooks();
    }

    // Reset all filters and search
    function resetFilters() {
        // Clear filter inputs
        filterYearInput.value = '';
        filterAuthorInput.value = '';

        // Uncheck all genre checkboxes
        genreCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset filter state
        currentFilters = {
            year: '',
            author: '',
            genres: []
        };

        // Reset search
        searchTerm = '';
        headerSearchInput.value = '';
        controlsSearchInput.value = '';

        // Reset sort to default
        currentSort = 'default';

        // Remove active class from all sort options
        sortOptions.forEach(option => {
            option.classList.remove('active');
        });

        // Apply the reset
        applyFiltersAndSort();
    }

    // Event Listeners

    // Header search
    headerSearchButton.addEventListener('click', function() {
        searchTerm = headerSearchInput.value.trim();
        controlsSearchInput.value = searchTerm; // Sync both search inputs
        applyFiltersAndSort();
    });

    headerSearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchTerm = headerSearchInput.value.trim();
            controlsSearchInput.value = searchTerm; // Sync both search inputs
            applyFiltersAndSort();
        }
    });

    // Controls search
    controlsSearchInput.addEventListener('input', function() {
        searchTerm = controlsSearchInput.value.trim();
        headerSearchInput.value = searchTerm; // Sync both search inputs
        applyFiltersAndSort();
    });

    // Apply filter button
    applyFilterBtn.addEventListener('click', function() {
        // Get year filter
        currentFilters.year = filterYearInput.value.trim();

        // Get author filter
        currentFilters.author = filterAuthorInput.value.trim();

        // Get genre filters
        currentFilters.genres = [];
        genreCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                currentFilters.genres.push(checkbox.value);
            }
        });

        applyFiltersAndSort();

        // Close the dropdown after applying filters
        document.querySelector('.filter-control.dropdown').classList.remove('open');
    });

    // Reset filter button
    resetFilterBtn.addEventListener('click', function() {
        resetFilters();

        // Close the dropdown after resetting filters
        document.querySelector('.filter-control.dropdown').classList.remove('open');
    });

    // Sort options
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            const sortText = this.textContent.trim();

            // Remove active class from all options
            sortOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to selected option
            this.classList.add('active');

            // Set current sort based on option text
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

            applyFiltersAndSort();

            // Close the dropdown after selecting a sort option
            document.querySelector('.sort-control.dropdown').classList.remove('open');
        });
    });

    // Initialize the book grid
    initializeBookGrid();
});
