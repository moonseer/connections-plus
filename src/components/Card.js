// Card Component

/**
 * Create a card element with the given text
 * @param {string} text - The text to display on the card
 * @returns {HTMLElement} - The card element
 */
function createCard(text) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.text = text;
    card.textContent = text;
    
    // Add event listeners for card selection
    card.addEventListener('click', handleCardClick);
    
    return card;
}

/**
 * Create multiple cards from an array of words
 * @param {string[]} words - Array of words to create cards for
 * @returns {HTMLElement[]} - Array of card elements
 */
function createCards(words) {
    return words.map(word => createCard(word));
}

/**
 * Handle click events on cards
 * @param {Event} event - The click event
 */
function handleCardClick(event) {
    const card = event.currentTarget;
    
    // Toggle selection if not in drawing mode
    if (!window.appState?.drawingMode) {
        toggleCardSelection(card);
    }
}

/**
 * Toggle the selection state of a card
 * @param {HTMLElement} card - The card element
 */
function toggleCardSelection(card) {
    card.classList.toggle('selected');
    
    // Update the global selected cards array
    if (window.appState) {
        const selectedCards = window.appState.selectedCards || [];
        
        if (card.classList.contains('selected')) {
            selectedCards.push(card);
        } else {
            const index = selectedCards.indexOf(card);
            if (index !== -1) {
                selectedCards.splice(index, 1);
            }
        }
        
        window.appState.selectedCards = selectedCards;
    }
}

/**
 * Set the color of a card
 * @param {HTMLElement} card - The card element
 * @param {string} color - The color to set (yellow, green, blue, purple)
 */
function setCardColor(card, color) {
    // Remove existing color classes
    card.classList.remove('yellow', 'green', 'blue', 'purple');
    
    // Add the new color class if a valid color is provided
    if (['yellow', 'green', 'blue', 'purple'].includes(color)) {
        card.classList.add(color);
    }
}

/**
 * Get all cards with a specific color
 * @param {string} color - The color to filter by
 * @returns {HTMLElement[]} - Array of card elements with the specified color
 */
function getCardsByColor(color) {
    return Array.from(document.querySelectorAll(`.card.${color}`));
}

/**
 * Reset all card colors
 */
function resetCardColors() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('yellow', 'green', 'blue', 'purple');
    });
}

export { createCard, createCards, setCardColor, getCardsByColor, resetCardColors }; 