// AI Hints Component

/**
 * Set up AI hints functionality
 * @param {Object} state - The application state
 * @param {Function} onHintRequested - Callback function when a hint is requested
 */
function setupAIHints(state, onHintRequested) {
    // Create the hints button
    const hintsButton = document.createElement('button');
    hintsButton.id = 'hints-button';
    hintsButton.className = 'hints-button';
    hintsButton.textContent = '💡 Get Hint';
    
    // Add event listener to show hint options
    hintsButton.addEventListener('click', () => {
        showHintOptions(state, onHintRequested);
    });
    
    // Add the button to the toolbar
    const gameControls = document.querySelector('.game-controls');
    if (gameControls) {
        gameControls.appendChild(hintsButton);
    }
}

/**
 * Show hint options modal
 * @param {Object} state - The application state
 * @param {Function} onHintRequested - Callback function when a hint is requested
 */
function showHintOptions(state, onHintRequested) {
    // Create the modal container
    const modal = document.createElement('div');
    modal.className = 'hint-modal';
    
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'hint-modal-content';
    
    // Create the modal header
    const header = document.createElement('div');
    header.className = 'hint-modal-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Get a Hint';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create the hint options
    const hintOptions = document.createElement('div');
    hintOptions.className = 'hint-options';
    
    // Create the hint level options
    const hintLevels = [
        {
            id: 'beginner',
            name: 'Beginner',
            description: 'General guidance about possible connections',
            icon: '🔍'
        },
        {
            id: 'intermediate',
            name: 'Intermediate',
            description: 'Specific clues about one category',
            icon: '🧩'
        },
        {
            id: 'expert',
            name: 'Expert',
            description: 'Minimal nudges to preserve the challenge',
            icon: '🤔'
        }
    ];
    
    // Add hint level options to the modal
    hintLevels.forEach(level => {
        const option = document.createElement('div');
        option.className = 'hint-option';
        option.dataset.level = level.id;
        
        const icon = document.createElement('span');
        icon.className = 'hint-icon';
        icon.textContent = level.icon;
        
        const content = document.createElement('div');
        content.className = 'hint-content';
        
        const name = document.createElement('h3');
        name.textContent = level.name;
        
        const description = document.createElement('p');
        description.textContent = level.description;
        
        content.appendChild(name);
        content.appendChild(description);
        
        option.appendChild(icon);
        option.appendChild(content);
        
        // Add event listener to request hint
        option.addEventListener('click', () => {
            requestHint(state, level.id, modal, onHintRequested);
        });
        
        hintOptions.appendChild(option);
    });
    
    // Assemble the modal
    modalContent.appendChild(header);
    modalContent.appendChild(hintOptions);
    
    modal.appendChild(modalContent);
    
    // Add the modal to the DOM
    document.body.appendChild(modal);
    
    // Add animation class after a short delay
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

/**
 * Request a hint based on the selected level
 * @param {Object} state - The application state
 * @param {string} level - The hint level (beginner, intermediate, expert)
 * @param {HTMLElement} modal - The modal element
 * @param {Function} onHintRequested - Callback function when a hint is requested
 */
function requestHint(state, level, modal, onHintRequested) {
    // Check if a game is loaded
    if (!state.currentGame) {
        showHintResult(modal, 'error', 'No game is currently loaded. Please load a game first.');
        return;
    }
    
    // Show loading state
    showHintLoading(modal);
    
    // Generate hint based on the current game and level
    const hint = generateHint(state.currentGame, level);
    
    // Show the hint result
    setTimeout(() => {
        showHintResult(modal, 'success', hint);
    }, 1000); // Simulate loading time
    
    // Call the callback function
    if (onHintRequested) {
        onHintRequested(level, hint);
    }
}

/**
 * Show loading state in the hint modal
 * @param {HTMLElement} modal - The modal element
 */
function showHintLoading(modal) {
    const hintOptions = modal.querySelector('.hint-options');
    
    // Clear the hint options
    hintOptions.innerHTML = '';
    
    // Create loading indicator
    const loading = document.createElement('div');
    loading.className = 'hint-loading';
    loading.innerHTML = `
        <div class="hint-spinner"></div>
        <p>Generating hint...</p>
    `;
    
    hintOptions.appendChild(loading);
}

/**
 * Show hint result in the modal
 * @param {HTMLElement} modal - The modal element
 * @param {string} type - The result type (success, error)
 * @param {string} message - The hint message
 */
function showHintResult(modal, type, message) {
    const hintOptions = modal.querySelector('.hint-options');
    
    // Clear the hint options
    hintOptions.innerHTML = '';
    
    // Create result container
    const result = document.createElement('div');
    result.className = `hint-result ${type}`;
    
    // Create message element
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'hint-close-button';
    closeButton.textContent = 'Got it';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    result.appendChild(messageElement);
    result.appendChild(closeButton);
    
    hintOptions.appendChild(result);
}

/**
 * Generate a hint based on the current game and level
 * @param {Object} game - The current game
 * @param {string} level - The hint level (beginner, intermediate, expert)
 * @returns {string} - The generated hint
 */
function generateHint(game, level) {
    // Get the categories from the game
    const categories = game.categories;
    
    // Get all cards on the board
    const cards = document.querySelectorAll('.card');
    
    // Get the current state of the board
    const boardState = Array.from(cards).map(card => {
        const text = card.textContent;
        const color = getCardColor(card);
        return { text, color };
    });
    
    // Find cards that are not correctly grouped
    const incorrectGroups = findIncorrectGroups(boardState, categories);
    
    // Generate hint based on the level
    switch (level) {
        case 'beginner':
            return generateBeginnerHint(categories, incorrectGroups);
        case 'intermediate':
            return generateIntermediateHint(categories, incorrectGroups);
        case 'expert':
            return generateExpertHint(categories, incorrectGroups);
        default:
            return 'Try looking for connections between the words. Group them into categories of 4 words each.';
    }
}

/**
 * Get the color of a card
 * @param {HTMLElement} card - The card element
 * @returns {string|null} - The color of the card or null if no color
 */
function getCardColor(card) {
    if (card.classList.contains('yellow')) return 'yellow';
    if (card.classList.contains('green')) return 'green';
    if (card.classList.contains('blue')) return 'blue';
    if (card.classList.contains('purple')) return 'purple';
    return null;
}

/**
 * Find incorrect groups on the board
 * @param {Array} boardState - The current state of the board
 * @param {Array} categories - The correct categories
 * @returns {Object} - Information about incorrect groups
 */
function findIncorrectGroups(boardState, categories) {
    // Group cards by color
    const colorGroups = {
        yellow: boardState.filter(card => card.color === 'yellow').map(card => card.text),
        green: boardState.filter(card => card.color === 'green').map(card => card.text),
        blue: boardState.filter(card => card.color === 'blue').map(card => card.text),
        purple: boardState.filter(card => card.color === 'purple').map(card => card.text),
        unassigned: boardState.filter(card => !card.color).map(card => card.text)
    };
    
    // Check each color group against the correct categories
    const incorrectGroups = {};
    
    Object.keys(colorGroups).forEach(color => {
        if (color === 'unassigned') return;
        
        const group = colorGroups[color];
        if (group.length === 0) return;
        
        // Find the matching category for this color
        const correctCategory = categories.find(cat => cat.color === color);
        
        // If no matching category, skip
        if (!correctCategory) return;
        
        // Check if all words in the group are in the correct category
        const correctWords = correctCategory.words;
        const incorrectWords = group.filter(word => !correctWords.includes(word));
        
        if (incorrectWords.length > 0) {
            incorrectGroups[color] = {
                groupName: correctCategory.name,
                correctWords,
                incorrectWords,
                missingWords: correctWords.filter(word => !group.includes(word))
            };
        }
    });
    
    return {
        colorGroups,
        incorrectGroups,
        unassignedWords: colorGroups.unassigned
    };
}

/**
 * Generate a beginner level hint
 * @param {Array} categories - The correct categories
 * @param {Object} incorrectGroups - Information about incorrect groups
 * @returns {string} - The generated hint
 */
function generateBeginnerHint(categories, incorrectGroups) {
    // If most cards are unassigned, give a general hint about categories
    if (incorrectGroups.unassignedWords.length > 8) {
        // Pick a random category to hint about
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        return `Look for words related to ${randomCategory.name.toLowerCase()}. There are 4 words in this category.`;
    }
    
    // If there are incorrect groups, give a hint about one of them
    const incorrectColors = Object.keys(incorrectGroups.incorrectGroups);
    if (incorrectColors.length > 0) {
        const randomColor = incorrectColors[Math.floor(Math.random() * incorrectColors.length)];
        const group = incorrectGroups.incorrectGroups[randomColor];
        return `The ${randomColor} group should contain words related to ${group.groupName.toLowerCase()}. Not all words in this group are correct.`;
    }
    
    // If no specific issues found, give a general hint
    return `Try to identify common themes among the words. Look for ${categories.map(c => c.name.toLowerCase()).join(', ')}.`;
}

/**
 * Generate an intermediate level hint
 * @param {Array} categories - The correct categories
 * @param {Object} incorrectGroups - Information about incorrect groups
 * @returns {string} - The generated hint
 */
function generateIntermediateHint(categories, incorrectGroups) {
    // If there are incorrect groups, give a more specific hint
    const incorrectColors = Object.keys(incorrectGroups.incorrectGroups);
    if (incorrectColors.length > 0) {
        const randomColor = incorrectColors[Math.floor(Math.random() * incorrectColors.length)];
        const group = incorrectGroups.incorrectGroups[randomColor];
        
        // Mention one correct word that should be in this group
        const correctWord = group.correctWords[Math.floor(Math.random() * group.correctWords.length)];
        
        return `The ${randomColor} group should be "${group.groupName}". "${correctWord}" is correctly placed in this group, but some other words don't belong.`;
    }
    
    // If most cards are unassigned, give a hint about two words that go together
    if (incorrectGroups.unassignedWords.length > 8) {
        // Pick a random category
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        // Pick two random words from this category
        const words = [...randomCategory.words];
        const word1 = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        const word2 = words[Math.floor(Math.random() * words.length)];
        
        return `"${word1}" and "${word2}" belong in the same group. They are related to ${randomCategory.name.toLowerCase()}.`;
    }
    
    // If no specific issues found, give a hint about one category
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return `One category is "${randomCategory.name}". Look for 4 words that fit this theme.`;
}

/**
 * Generate an expert level hint
 * @param {Array} categories - The correct categories
 * @param {Object} incorrectGroups - Information about incorrect groups
 * @returns {string} - The generated hint
 */
function generateExpertHint(categories, incorrectGroups) {
    // If there are incorrect groups, give a subtle hint
    const incorrectColors = Object.keys(incorrectGroups.incorrectGroups);
    if (incorrectColors.length > 0) {
        const randomColor = incorrectColors[Math.floor(Math.random() * incorrectColors.length)];
        const group = incorrectGroups.incorrectGroups[randomColor];
        
        // Mention one incorrect word
        if (group.incorrectWords.length > 0) {
            const incorrectWord = group.incorrectWords[Math.floor(Math.random() * group.incorrectWords.length)];
            return `"${incorrectWord}" doesn't seem to fit with the other words in the ${randomColor} group.`;
        }
    }
    
    // If most cards are unassigned, give a minimal hint
    if (incorrectGroups.unassignedWords.length > 8) {
        // Pick a random category
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        // Pick one random word from this category
        const word = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)];
        
        return `Consider what category "${word}" might belong to.`;
    }
    
    // If no specific issues found, give a very subtle hint
    return `Look for patterns and connections. Sometimes the most obvious grouping isn't the correct one.`;
}

export { setupAIHints }; 