// language.js - Funktionalitet för språkbyte

// Standardspråket är svenska
const DEFAULT_LANGUAGE = 'sv';

// Tillgängliga språk
const LANGUAGES = {
    sv: 'Svenska',
    en: 'English'
};

// Översättningar för gränssnittselement
const translations = {
    // Navigeringsobjekt
    'Startsida': {
        en: 'Home'
    },
    'Bokkatalog': {
        en: 'Book Catalog'
    },
    'Om Oss': {
        en: 'About Us'
    },
    'Inspiration': {
        en: 'Inspiration'
    },
    'Nyhetsbrev': {
        en: 'Newsletter'
    },
    'Kontakt': {
        en: 'Contact'
    },

    // Hjälpmeny
    'Hjälp': {
        en: 'Help'
    },

    // Sökfunktion
    'Sök': {
        en: 'Search'
    },

    // Vanliga gränssnittselement
    'Tillbaka till startsidan': {
        en: 'Back to homepage'
    },
    'Visa webbplatsen på svenska': {
        en: 'Display the website in Swedish'
    },
    'Display the website in English': {
        sv: 'Visa webbplatsen på engelska'
    },
    'Valt språk': {
        en: 'Selected language'
    },
    'Selected language': {
        sv: 'Valt språk'
    },

    // Nyhetssektionen
    'Ny bokavdelning!': {
        en: 'New Book Section!'
    },
    'Vi har utökat vår avdelning för internationell litteratur med böcker från hela världen. Besök oss och upptäck nya favoriter!': {
        en: 'We have expanded our international literature section with books from around the world. Visit us and discover new favorites!'
    },
    'Nyhet': {
        en: 'News'
    },
    'Nyheter': {
        en: 'News'
    },
    'Ny bokutgivning': {
        en: 'New Book Release'
    },
    'Författarbesök': {
        en: 'Author Visit'
    }
};

// Hämta aktuellt språk från localStorage eller använd standardspråk
function getCurrentLanguage() {
    return localStorage.getItem('language') || DEFAULT_LANGUAGE;
}

// Spara språkinställning i localStorage
function setLanguage(lang) {
    if (Object.keys(LANGUAGES).includes(lang)) {
        localStorage.setItem('language', lang);
        applyLanguage(lang);
        updateHtmlLangAttribute(lang);
        return true;
    }
    return false;
}

// Uppdatera html lang-attributet
function updateHtmlLangAttribute(lang) {
    document.documentElement.lang = lang;
}

// Översätt en text baserat på aktuellt språk
function translateText(text, targetLang) {
    const lang = targetLang || getCurrentLanguage();

    // Om texten finns i översättningarna och har en översättning för målspråket
    if (translations[text] && translations[text][lang]) {
        return translations[text][lang];
    }

    // Returnera originaltexten om ingen översättning hittades
    return text;
}

// Tillämpa språk på hela sidan
function applyLanguage(lang) {
    // Använd angivet språk om det finns, annars använd aktuellt språk
    const currentLang = lang || getCurrentLanguage();

    // Uppdatera alla översättningsbara element
    document.querySelectorAll('[data-translate]').forEach(element => {
        const originalText = element.getAttribute('data-translate');
        element.textContent = translateText(originalText, currentLang);
    });

    // Uppdatera platshållare i inmatningsfält
    document.querySelectorAll('input[placeholder][data-translate-placeholder]').forEach(input => {
        const originalPlaceholder = input.getAttribute('data-translate-placeholder');
        input.placeholder = translateText(originalPlaceholder, currentLang);
    });

    // Skicka en anpassad händelse för att andra komponenter ska reagera på språkändringen
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLang } }));
}

// Initialisera språk vid sidladdning
document.addEventListener('DOMContentLoaded', function() {
    const currentLang = getCurrentLanguage();
    updateHtmlLangAttribute(currentLang);

    // Tillämpa initialt språk
    setTimeout(() => {
        applyLanguage(currentLang);
    }, 0);
});

// Exportera funktioner för användning i andra skript
window.languageUtils = {
    getCurrentLanguage,
    setLanguage,
    translateText,
    applyLanguage,
    LANGUAGES
};
