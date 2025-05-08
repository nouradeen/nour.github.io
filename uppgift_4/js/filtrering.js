// filtrering.js - Functionality for the filtering and sorting page

document.addEventListener('DOMContentLoaded', function() {
    // Get filter and sort elements
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    const resetFilterBtn = document.querySelector('.reset-filter-btn');
    const genreCheckboxes = document.querySelectorAll('input[name="genre"]');
    const priceRadios = document.querySelectorAll('input[name="price"]');
    const formatCheckboxes = document.querySelectorAll('input[name="format"]');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    
    // Apply filters when the apply button is clicked
    applyFilterBtn.addEventListener('click', function() {
        // Get selected filters
        const selectedGenres = Array.from(genreCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            
        const selectedPrice = Array.from(priceRadios)
            .find(radio => radio.checked)?.value;
            
        const selectedFormats = Array.from(formatCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            
        const selectedSort = Array.from(sortRadios)
            .find(radio => radio.checked)?.value;
        
        // Log selected filters (in a real app, this would filter the books)
        console.log('Selected Genres:', selectedGenres);
        console.log('Selected Price Range:', selectedPrice);
        console.log('Selected Formats:', selectedFormats);
        console.log('Sort By:', selectedSort);
        
        // Simulate filtering (in a real app, this would update the book display)
        simulateFiltering(selectedGenres, selectedPrice, selectedFormats, selectedSort);
    });
    
    // Reset all filters when the reset button is clicked
    resetFilterBtn.addEventListener('click', function() {
        // Uncheck all checkboxes
        genreCheckboxes.forEach(checkbox => checkbox.checked = false);
        formatCheckboxes.forEach(checkbox => checkbox.checked = false);
        
        // Reset price to default (none selected)
        priceRadios.forEach(radio => radio.checked = false);
        
        // Reset sort to default (relevance)
        sortRadios.forEach(radio => {
            radio.checked = radio.value === 'relevance';
        });
        
        // Reset the book display
        resetBookDisplay();
    });
    
    // Function to simulate filtering (in a real app, this would filter the actual book data)
    function simulateFiltering(genres, price, formats, sort) {
        // Get all book cards
        const bookCards = document.querySelectorAll('.book-card');
        
        // Add a "filtered" class to simulate filtering
        bookCards.forEach((card, index) => {
            // This is just a simulation - in a real app, you would check if the book matches the filters
            const shouldShow = Math.random() > 0.3; // Randomly hide some books
            
            if (shouldShow) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show a message if no books match the filters
        const visibleBooks = document.querySelectorAll('.book-card[style="display: block"]');
        const resultsSection = document.querySelector('.results-section');
        
        if (visibleBooks.length === 0) {
            // Check if message already exists
            if (!document.querySelector('.no-results-message')) {
                const message = document.createElement('p');
                message.className = 'no-results-message';
                message.textContent = 'Inga böcker matchar dina filter. Försök med andra filteralternativ.';
                resultsSection.appendChild(message);
            }
        } else {
            // Remove message if it exists
            const message = document.querySelector('.no-results-message');
            if (message) {
                message.remove();
            }
        }
    }
    
    // Function to reset the book display
    function resetBookDisplay() {
        // Show all book cards
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Remove any "no results" message
        const message = document.querySelector('.no-results-message');
        if (message) {
            message.remove();
        }
    }
    
    // Initialize the filter and sort menus as collapsible on mobile
    initCollapsibleMenus();
});

// Function to make filter and sort sections collapsible on mobile
function initCollapsibleMenus() {
    const filterGroups = document.querySelectorAll('.filter-group h3');
    
    filterGroups.forEach(heading => {
        heading.addEventListener('click', function() {
            const options = this.nextElementSibling;
            options.classList.toggle('collapsed');
            this.classList.toggle('collapsed');
        });
    });
}
