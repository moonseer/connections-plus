// Game Controls Component
import { resetCardPositions } from './DragDrop.js';
import { getCardGroups, validateCardGroups, getWordsFromCardGroup } from './ColorCoding.js';
import { exitDrawingMode } from './DrawingTools.js';

/**
 * Set up game controls functionality
 * @param {Object} state - The application state
 */
function setupGameControls(state) {
    const resetBoardBtn = document.getElementById('reset-board');
    const submitGuessBtn = document.getElementById('submit-guess');
    
    // Set up event listeners for game controls
    resetBoardBtn.addEventListener('click', () => {
        resetBoard(state);
    });
    
    submitGuessBtn.addEventListener('click', () => {
        submitGuess(state);
    });
}

/**
 * Reset the game board to its initial state
 * @param {Object} state - The application state
 */
function resetBoard(state) {
    // Reset card positions
    resetCardPositions();
    
    // Clear selections
    document.querySelectorAll('.card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset state
    state.selectedCards = [];
    
    // Exit drawing mode
    exitDrawingMode(state);
}

/**
 * Submit the current guess
 * @param {Object} state - The application state
 */
function submitGuess(state) {
    // Validate that all colored groups have exactly 4 cards
    if (!validateCardGroups()) {
        showMessage('Each colored group must have exactly 4 cards.', 'error');
        return;
    }
    
    // Get the card groups
    const groups = getCardGroups();
    
    // Check if there are any colored groups
    const hasColoredGroups = Object.keys(groups)
        .filter(color => color !== 'unassigned')
        .some(color => groups[color].length > 0);
    
    if (!hasColoredGroups) {
        showMessage('Please assign colors to at least one group of cards.', 'error');
        return;
    }
    
    // Prepare the submission data
    const submission = {
        yellow: groups.yellow.length === 4 ? getWordsFromCardGroup(groups.yellow) : null,
        green: groups.green.length === 4 ? getWordsFromCardGroup(groups.green) : null,
        blue: groups.blue.length === 4 ? getWordsFromCardGroup(groups.blue) : null,
        purple: groups.purple.length === 4 ? getWordsFromCardGroup(groups.purple) : null
    };
    
    // Check the submission against the solution
    checkSubmission(submission, state.currentGame);
}

/**
 * Check the submission against the solution
 * @param {Object} submission - The user's submission
 * @param {Object} game - The current game data
 */
function checkSubmission(submission, game) {
    if (!game || !game.categories) {
        showMessage('Game data is not available.', 'error');
        return;
    }
    
    // Track correct and incorrect groups
    const results = {
        correct: [],
        incorrect: []
    };
    
    // Check each submitted group
    Object.keys(submission).forEach(color => {
        if (!submission[color]) return;
        
        const submittedWords = submission[color].sort();
        
        // Check against each category in the game
        let foundMatch = false;
        
        game.categories.forEach(category => {
            const categoryWords = [...category.words].sort();
            
            // Check if the submitted words match this category
            const isMatch = arraysEqual(submittedWords, categoryWords);
            
            if (isMatch) {
                foundMatch = true;
                results.correct.push({
                    color,
                    category: category.name
                });
            }
        });
        
        if (!foundMatch) {
            results.incorrect.push({
                color,
                words: submission[color]
            });
        }
    });
    
    // Display the results
    displayResults(results);
}

/**
 * Display the submission results
 * @param {Object} results - The submission results
 */
function displayResults(results) {
    let message = '';
    
    if (results.correct.length > 0) {
        message += 'Correct groups:\n';
        results.correct.forEach(group => {
            message += `- ${group.color.toUpperCase()}: ${group.category}\n`;
        });
    }
    
    if (results.incorrect.length > 0) {
        if (message) message += '\n';
        message += 'Incorrect groups:\n';
        results.incorrect.forEach(group => {
            message += `- ${group.color.toUpperCase()}: ${group.words.join(', ')}\n`;
        });
    }
    
    if (results.correct.length === 4) {
        showMessage('Congratulations! You solved the puzzle!', 'success');
    } else {
        showMessage(message, results.correct.length > 0 ? 'partial' : 'error');
    }
}

/**
 * Show a message to the user
 * @param {string} message - The message to display
 * @param {string} type - The message type ('success', 'error', 'partial')
 */
function showMessage(message, type = 'info') {
    // For now, just use alert
    alert(message);
    
    // In a real implementation, we would create a nicer UI for messages
}

/**
 * Check if two arrays have the same elements
 * @param {Array} arr1 - The first array
 * @param {Array} arr2 - The second array
 * @returns {boolean} - True if the arrays have the same elements
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    
    return true;
}

export { setupGameControls }; 