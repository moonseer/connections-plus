// Color Coding Component
import { setCardColor } from './Card.js';

/**
 * Set up color coding functionality
 * @param {Object} state - The application state
 */
function setupColorCoding(state) {
    const colorTools = document.querySelectorAll('.color-tool');
    
    // Add click event listeners to color tools
    colorTools.forEach(tool => {
        tool.addEventListener('click', () => {
            const color = tool.dataset.color;
            
            // Update the current color in the state
            state.currentColor = color;
            
            // Update the active tool indicator
            updateActiveColorTool(color);
            
            // Apply color to selected cards
            applyColorToSelectedCards(color, state);
        });
    });
}

/**
 * Update the active color tool indicator
 * @param {string} color - The selected color
 */
function updateActiveColorTool(color) {
    // Remove active class from all color tools
    document.querySelectorAll('.color-tool').forEach(tool => {
        tool.classList.remove('active');
    });
    
    // Add active class to the selected color tool
    const selectedTool = document.querySelector(`.color-tool[data-color="${color}"]`);
    if (selectedTool) {
        selectedTool.classList.add('active');
    }
}

/**
 * Apply the selected color to all selected cards
 * @param {string} color - The color to apply
 * @param {Object} state - The application state
 */
function applyColorToSelectedCards(color, state) {
    if (state.selectedCards && state.selectedCards.length > 0) {
        state.selectedCards.forEach(card => {
            setCardColor(card, color);
        });
    }
}

/**
 * Get all groups of cards by color
 * @returns {Object} - Object with color keys and arrays of card elements
 */
function getCardGroups() {
    const groups = {
        yellow: Array.from(document.querySelectorAll('.card.yellow')),
        green: Array.from(document.querySelectorAll('.card.green')),
        blue: Array.from(document.querySelectorAll('.card.blue')),
        purple: Array.from(document.querySelectorAll('.card.purple')),
        unassigned: Array.from(document.querySelectorAll('.card:not(.yellow):not(.green):not(.blue):not(.purple)'))
    };
    
    return groups;
}

/**
 * Check if a group of cards is complete (has exactly 4 cards)
 * @param {HTMLElement[]} cardGroup - Array of card elements
 * @returns {boolean} - True if the group has exactly 4 cards
 */
function isGroupComplete(cardGroup) {
    return cardGroup.length === 4;
}

/**
 * Validate all card groups
 * @returns {boolean} - True if all colored groups have exactly 4 cards
 */
function validateCardGroups() {
    const groups = getCardGroups();
    
    // Check if all colored groups have exactly 4 cards
    return (
        (groups.yellow.length === 0 || groups.yellow.length === 4) &&
        (groups.green.length === 0 || groups.green.length === 4) &&
        (groups.blue.length === 0 || groups.blue.length === 4) &&
        (groups.purple.length === 0 || groups.purple.length === 4)
    );
}

/**
 * Get the words from a group of cards
 * @param {HTMLElement[]} cardGroup - Array of card elements
 * @returns {string[]} - Array of words from the cards
 */
function getWordsFromCardGroup(cardGroup) {
    return cardGroup.map(card => card.dataset.text);
}

export { setupColorCoding, getCardGroups, isGroupComplete, validateCardGroups, getWordsFromCardGroup }; 