// Main JavaScript for Connections-plus

// Import modules
import { createCards } from './components/Card.js';
import { setupDragging } from './components/DragDrop.js';
import { setupColorCoding } from './components/ColorCoding.js';
import { setupDrawingTools } from './components/DrawingTools.js';
import { setupGameControls } from './components/GameControls.js';
import { loadGame, getRandomGame } from './data/GameData.js';
import { setupGameBrowser } from './components/GameBrowser.js';
import { setupAIHints } from './components/AIHints.js';

// DOM Elements
const gameBoard = document.getElementById('game-board');
const drawingLayer = document.getElementById('drawing-layer');
const dailyGameBtn = document.getElementById('daily-game');
const randomGameBtn = document.getElementById('random-game');
const browseGamesBtn = document.getElementById('browse-games');

// App State
const state = {
    currentGame: null,
    selectedCards: [],
    currentColor: null,
    drawingMode: false,
    eraserMode: false,
    hintHistory: [] // Track hints that have been given
};

// Make state globally available for components
window.appState = state;

// Initialize the app
function initApp() {
    console.log('Initializing Connections-plus app');
    
    // Set up event listeners for game selection
    dailyGameBtn.addEventListener('click', loadDailyGame);
    randomGameBtn.addEventListener('click', loadRandomGame);
    browseGamesBtn.addEventListener('click', showGameBrowser);
    
    // Initialize components
    setupColorCoding(state);
    setupDrawingTools(drawingLayer, state);
    setupGameControls(state);
    setupAIHints(state, onHintRequested);
    
    // Load a random game to start
    loadRandomGame();
    
    // Log initial state
    console.log('Initial state:', { ...state });
}

/**
 * Handle hint requested event
 * @param {string} level - The hint level
 * @param {string} hint - The generated hint
 */
function onHintRequested(level, hint) {
    // Add the hint to the history
    state.hintHistory.push({
        level,
        hint,
        timestamp: new Date().toISOString()
    });
    
    console.log(`Hint requested (${level}):`, hint);
}

// Load the daily game
async function loadDailyGame() {
    try {
        console.log('Loading daily game...');
        const game = await loadGame('daily');
        renderGame(game);
    } catch (error) {
        console.error('Error loading daily game:', error);
        showError('Failed to load daily game. Please try again.');
    }
}

// Load a random game
async function loadRandomGame() {
    try {
        console.log('Loading random game...');
        const game = await getRandomGame();
        renderGame(game);
    } catch (error) {
        console.error('Error loading random game:', error);
        showError('Failed to load random game. Please try again.');
    }
}

// Show the game browser modal
function showGameBrowser() {
    console.log('Opening game browser...');
    setupGameBrowser(renderGame);
}

// Render the game on the board
function renderGame(game) {
    console.log('Rendering game:', game);
    
    // Clear the board
    gameBoard.innerHTML = '';
    
    // Re-add the canvas since we cleared the board
    const canvas = document.createElement('canvas');
    canvas.id = 'drawing-layer';
    canvas.className = 'drawing-layer';
    gameBoard.appendChild(canvas);
    
    // Update state
    state.currentGame = game;
    state.selectedCards = [];
    state.currentColor = null;
    state.drawingMode = false;
    state.eraserMode = false;
    state.hintHistory = []; // Reset hint history for new game
    
    // Create cards
    const cards = createCards(game.words);
    
    // Add cards to the board
    cards.forEach(card => {
        gameBoard.appendChild(card);
    });
    
    // Setup dragging for cards
    setupDragging(gameBoard.querySelectorAll('.card'));
    
    // Arrange cards in a grid
    arrangeCardsInGrid();
    
    // Re-initialize components with the new canvas
    setupDrawingTools(canvas, state);
    
    // Reset color tools
    resetColorTools();
    
    // Update the page title with the game date
    if (game.date) {
        document.title = `Connections-plus - ${formatDate(game.date)}`;
    }
}

/**
 * Format a date string
 * @param {string} dateString - The date string in YYYY-MM-DD format
 * @returns {string} - The formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Reset color tools to their initial state
 */
function resetColorTools() {
    // Remove active class from all color tools
    document.querySelectorAll('.color-tool').forEach(tool => {
        tool.classList.remove('active');
        tool.classList.remove('complete');
        tool.removeAttribute('data-count');
        tool.title = '';
    });
    
    console.log('Reset color tools');
}

// Arrange cards in a grid layout
function arrangeCardsInGrid() {
    const cards = gameBoard.querySelectorAll('.card');
    const gridSize = Math.ceil(Math.sqrt(cards.length));
    const cardWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-width'));
    const cardHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-height'));
    const spacing = 20;
    
    cards.forEach((card, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        card.style.left = `${col * (cardWidth + spacing) + spacing}px`;
        card.style.top = `${row * (cardHeight + spacing) + spacing}px`;
    });
    
    console.log(`Arranged ${cards.length} cards in a ${gridSize}x${gridSize} grid`);
}

// Show error message
function showError(message) {
    // Simple error display for now
    alert(message);
    console.error('Error:', message);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 