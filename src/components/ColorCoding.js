// Color Coding Component
import { setCardColor } from './Card.js';

/**
 * Set up color coding functionality
 * @param {Object} state - The application state
 */
function setupColorCoding(state) {
    const colorTools = document.querySelectorAll('.color-tool');
    const colorToolsContainer = document.querySelector('.color-tools');
    
    // Add click event listeners to color tools
    colorTools.forEach(tool => {
        tool.addEventListener('click', () => {
            const color = tool.dataset.color;
            
            // Update the current color in the state
            state.currentColor = color;
            
            // Update the active tool indicator
            updateActiveColorTool(color);
            
            // Clear selected cards when changing colors
            clearSelectedCards(state);
            
            // Update status message
            updateColorSelectionStatus(color, colorToolsContainer);
            
            console.log(`Color ${color} selected, ready to apply to cards`);
        });
    });
    
    // Add event listener for card selection
    document.addEventListener('click', (e) => {
        // Check if a card was clicked and not in drawing mode
        if (e.target.classList.contains('card') && !state.drawingMode) {
            // If a color is selected, apply it to the clicked card
            if (state.currentColor) {
                // First deselect any previously selected cards
                clearSelectedCards(state);
                
                // Select this card
                toggleCardSelection(e.target, state);
                
                // Apply the color to the clicked card
                setCardColor(e.target, state.currentColor);
                console.log(`Applied color ${state.currentColor} to card: ${e.target.textContent}`);
                
                // Update color tool indicators with counts
                updateColorToolCounts();
            }
        } 
        // Check if clicked on empty space (game board but not a card)
        else if (e.target.classList.contains('game-board') && !state.drawingMode) {
            // Deselect the current color
            if (state.currentColor) {
                state.currentColor = null;
                updateActiveColorTool(null);
                clearSelectedCards(state);
                
                // Clear status message
                updateColorSelectionStatus(null, colorToolsContainer);
                
                console.log('Color deselected by clicking on empty space');
            }
        }
    });
    
    // Add event listener for game board to handle clicks on empty space
    const gameBoard = document.getElementById('game-board');
    if (gameBoard) {
        gameBoard.addEventListener('click', (e) => {
            // Only handle direct clicks on the game board (not bubbled from cards)
            if (e.target === gameBoard && !state.drawingMode) {
                // Deselect the current color
                if (state.currentColor) {
                    state.currentColor = null;
                    updateActiveColorTool(null);
                    clearSelectedCards(state);
                    
                    // Clear status message
                    updateColorSelectionStatus(null, colorToolsContainer);
                    
                    console.log('Color deselected by clicking on game board');
                }
            }
        });
    }
    
    // Initialize color tool counts
    updateColorToolCounts();
    
    // Initialize status message
    updateColorSelectionStatus(null, colorToolsContainer);
}

/**
 * Update the status message for color selection
 * @param {string|null} color - The selected color or null if no color is selected
 * @param {HTMLElement} container - The color tools container
 */
function updateColorSelectionStatus(color, container) {
    if (!container) return;
    
    if (color) {
        container.setAttribute('data-status', `→ ${color.toUpperCase()} selected - click on cards to apply`);
    } else {
        container.setAttribute('data-status', '');
    }
}

/**
 * Update color tool indicators with the count of cards in each color group
 */
function updateColorToolCounts() {
    const groups = getCardGroups();
    
    // Update each color tool with the count
    Object.keys(groups).forEach(color => {
        if (color !== 'unassigned') {
            const count = groups[color].length;
            const tool = document.querySelector(`.color-tool[data-color="${color}"]`);
            
            if (tool) {
                // Add or update the count indicator
                tool.setAttribute('data-count', count);
                
                // Add a title for tooltip
                tool.title = `${color}: ${count} cards${count === 4 ? ' (complete)' : ''}`;
                
                // Add or remove the complete class
                if (count === 4) {
                    tool.classList.add('complete');
                } else {
                    tool.classList.remove('complete');
                }
            }
        }
    });
    
    console.log('Updated color tool counts');
}

/**
 * Clear all selected cards
 * @param {Object} state - The application state
 */
function clearSelectedCards(state) {
    if (state.selectedCards && state.selectedCards.length > 0) {
        // Remove selected class from all cards
        state.selectedCards.forEach(card => {
            card.classList.remove('selected');
        });
        
        // Clear the selected cards array
        state.selectedCards = [];
        console.log('Cleared selected cards');
    }
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
        
        // Update color tool indicators with counts
        updateColorToolCounts();
    }
}

/**
 * Toggle the selection state of a card
 * @param {HTMLElement} card - The card element
 * @param {Object} state - The application state
 */
function toggleCardSelection(card, state) {
    card.classList.toggle('selected');
    
    // Update the selected cards array
    if (!state.selectedCards) {
        state.selectedCards = [];
    }
    
    if (card.classList.contains('selected')) {
        state.selectedCards.push(card);
        console.log(`Card selected: ${card.textContent}`);
    } else {
        const index = state.selectedCards.indexOf(card);
        if (index !== -1) {
            state.selectedCards.splice(index, 1);
            console.log(`Card deselected: ${card.textContent}`);
        }
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

export { setupColorCoding, getCardGroups, isGroupComplete, validateCardGroups, getWordsFromCardGroup, toggleCardSelection }; 