// Main JavaScript for Connections-plus

// Import modules
import { createCards } from './components/Card.js';
import { setupDragging } from './components/DragDrop.js';
import { setupColorCoding } from './components/ColorCoding.js';
import { setupDrawingTools } from './components/DrawingTools.js';
import { setupGameControls } from './components/GameControls.js';
import { loadGame, getRandomGame } from './data/GameData.js';

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
};

// Initialize the app
function initApp() {
    // Set up event listeners for game selection
    dailyGameBtn.addEventListener('click', loadDailyGame);
    randomGameBtn.addEventListener('click', loadRandomGame);
    browseGamesBtn.addEventListener('click', showGameBrowser);
    
    // Initialize components
    setupColorCoding(state);
    setupDrawingTools(drawingLayer, state);
    setupGameControls(state);
    
    // Load a random game to start
    loadRandomGame();
}

// Load the daily game
async function loadDailyGame() {
    try {
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
        const game = await getRandomGame();
        renderGame(game);
    } catch (error) {
        console.error('Error loading random game:', error);
        showError('Failed to load random game. Please try again.');
    }
}

// Show the game browser modal
function showGameBrowser() {
    // To be implemented
    alert('Game browser coming soon!');
}

// Render the game on the board
function renderGame(game) {
    // Clear the board
    gameBoard.innerHTML = '';
    
    // Update state
    state.currentGame = game;
    state.selectedCards = [];
    
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
}

// Show error message
function showError(message) {
    // Simple error display for now
    alert(message);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 