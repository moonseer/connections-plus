// Game Browser Component
import { getGameList, loadGame } from '../data/GameData.js';

/**
 * Set up the game browser functionality
 * @param {Function} onGameSelected - Callback function when a game is selected
 */
async function setupGameBrowser(onGameSelected) {
    // Create the game browser modal
    const modal = createGameBrowserModal();
    
    // Add the modal to the DOM
    document.body.appendChild(modal);
    
    // Load the game list
    try {
        const games = await getGameList();
        populateGameList(games, modal, onGameSelected);
    } catch (error) {
        console.error('Error loading game list:', error);
        showError(modal, 'Failed to load game list. Please try again.');
    }
    
    // Show the modal
    showModal(modal);
}

/**
 * Create the game browser modal
 * @returns {HTMLElement} - The modal element
 */
function createGameBrowserModal() {
    // Create the modal container
    const modal = document.createElement('div');
    modal.className = 'game-browser-modal';
    
    // Create the modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'game-browser-content';
    
    // Create the modal header
    const header = document.createElement('div');
    header.className = 'game-browser-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Game Browser';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => {
        hideModal(modal);
    });
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create the search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search by date (YYYY-MM-DD)';
    searchInput.className = 'search-input';
    
    searchContainer.appendChild(searchInput);
    
    // Create the game list container
    const gameListContainer = document.createElement('div');
    gameListContainer.className = 'game-list-container';
    
    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading games...';
    
    gameListContainer.appendChild(loadingIndicator);
    
    // Add event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filterGameList(gameListContainer, searchTerm);
    });
    
    // Assemble the modal
    modalContent.appendChild(header);
    modalContent.appendChild(searchContainer);
    modalContent.appendChild(gameListContainer);
    
    modal.appendChild(modalContent);
    
    return modal;
}

/**
 * Populate the game list in the modal
 * @param {Array} games - The list of games
 * @param {HTMLElement} modal - The modal element
 * @param {Function} onGameSelected - Callback function when a game is selected
 */
function populateGameList(games, modal, onGameSelected) {
    const gameListContainer = modal.querySelector('.game-list-container');
    
    // Clear the loading indicator
    gameListContainer.innerHTML = '';
    
    // Sort games by date (newest first)
    games.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create the game list
    const gameList = document.createElement('div');
    gameList.className = 'game-list';
    
    // Add games to the list
    games.forEach(game => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.dataset.id = game.id;
        gameItem.dataset.date = game.date;
        
        const gameDate = document.createElement('span');
        gameDate.className = 'game-date';
        gameDate.textContent = formatDate(game.date);
        
        const gameId = document.createElement('span');
        gameId.className = 'game-id';
        gameId.textContent = `#${game.id}`;
        
        gameItem.appendChild(gameDate);
        gameItem.appendChild(gameId);
        
        // Add click event listener
        gameItem.addEventListener('click', async () => {
            try {
                // Show loading state
                gameItem.classList.add('loading');
                
                // Load the selected game
                const selectedGame = await loadGame(game.id);
                
                // Hide the modal
                hideModal(modal);
                
                // Call the callback function
                onGameSelected(selectedGame);
            } catch (error) {
                console.error('Error loading game:', error);
                showError(modal, `Failed to load game #${game.id}. Please try again.`);
                
                // Remove loading state
                gameItem.classList.remove('loading');
            }
        });
        
        gameList.appendChild(gameItem);
    });
    
    gameListContainer.appendChild(gameList);
}

/**
 * Filter the game list based on search term
 * @param {HTMLElement} gameListContainer - The game list container
 * @param {string} searchTerm - The search term
 */
function filterGameList(gameListContainer, searchTerm) {
    const gameItems = gameListContainer.querySelectorAll('.game-item');
    
    gameItems.forEach(item => {
        const date = item.dataset.date.toLowerCase();
        const id = item.dataset.id.toLowerCase();
        
        if (date.includes(searchTerm) || id.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Format a date string
 * @param {string} dateString - The date string in YYYY-MM-DD format
 * @returns {string} - The formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Show the modal
 * @param {HTMLElement} modal - The modal element
 */
function showModal(modal) {
    modal.style.display = 'flex';
    
    // Add animation class
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
    
    // Add event listener to close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    });
    
    // Add event listener to close modal when pressing Escape
    document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Hide the modal
 * @param {HTMLElement} modal - The modal element
 */
function hideModal(modal) {
    modal.classList.remove('visible');
    
    // Remove the modal after animation completes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Remove event listener
    document.removeEventListener('keydown', handleEscapeKey);
}

/**
 * Handle Escape key press to close the modal
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.game-browser-modal');
        if (modal) {
            hideModal(modal);
        }
    }
}

/**
 * Show an error message in the modal
 * @param {HTMLElement} modal - The modal element
 * @param {string} message - The error message
 */
function showError(modal, message) {
    const gameListContainer = modal.querySelector('.game-list-container');
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Clear the container
    gameListContainer.innerHTML = '';
    
    // Add the error message
    gameListContainer.appendChild(errorMessage);
}

export { setupGameBrowser }; 