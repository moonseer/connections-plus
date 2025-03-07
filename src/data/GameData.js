// Game Data Module

// Sample game data for development
const sampleGames = [
    {
        id: 'sample1',
        date: '2023-01-01',
        categories: [
            {
                name: 'Types of Bread',
                color: 'yellow',
                words: ['SOURDOUGH', 'BAGUETTE', 'CIABATTA', 'FOCACCIA']
            },
            {
                name: 'Parts of a Book',
                color: 'green',
                words: ['CHAPTER', 'INDEX', 'PREFACE', 'APPENDIX']
            },
            {
                name: 'Celestial Bodies',
                color: 'blue',
                words: ['MOON', 'PLANET', 'COMET', 'ASTEROID']
            },
            {
                name: 'Card Games',
                color: 'purple',
                words: ['POKER', 'BRIDGE', 'HEARTS', 'SOLITAIRE']
            }
        ],
        words: [
            'SOURDOUGH', 'BAGUETTE', 'CIABATTA', 'FOCACCIA',
            'CHAPTER', 'INDEX', 'PREFACE', 'APPENDIX',
            'MOON', 'PLANET', 'COMET', 'ASTEROID',
            'POKER', 'BRIDGE', 'HEARTS', 'SOLITAIRE'
        ]
    },
    {
        id: 'sample2',
        date: '2023-01-02',
        categories: [
            {
                name: 'Weather Phenomena',
                color: 'yellow',
                words: ['HURRICANE', 'BLIZZARD', 'TORNADO', 'THUNDERSTORM']
            },
            {
                name: 'Musical Instruments',
                color: 'green',
                words: ['PIANO', 'VIOLIN', 'TRUMPET', 'DRUMS']
            },
            {
                name: 'Mythical Creatures',
                color: 'blue',
                words: ['DRAGON', 'PHOENIX', 'UNICORN', 'GRIFFIN']
            },
            {
                name: 'Board Games',
                color: 'purple',
                words: ['MONOPOLY', 'CHESS', 'SCRABBLE', 'CLUE']
            }
        ],
        words: [
            'HURRICANE', 'BLIZZARD', 'TORNADO', 'THUNDERSTORM',
            'PIANO', 'VIOLIN', 'TRUMPET', 'DRUMS',
            'DRAGON', 'PHOENIX', 'UNICORN', 'GRIFFIN',
            'MONOPOLY', 'CHESS', 'SCRABBLE', 'CLUE'
        ]
    }
];

// GitHub repository URL for game data
const GITHUB_REPO_URL = 'https://raw.githubusercontent.com/username/connections-archive/main';

/**
 * Load game data from the repository
 * @param {string} gameId - The ID of the game to load
 * @returns {Promise<Object>} - The game data
 */
async function loadGame(gameId) {
    // For development, use sample data
    if (process.env.NODE_ENV === 'development' || !GITHUB_REPO_URL.includes('username')) {
        return loadSampleGame(gameId);
    }
    
    try {
        // In production, fetch from GitHub repository
        const response = await fetch(`${GITHUB_REPO_URL}/games/${gameId}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load game: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error loading game:', error);
        
        // Fall back to sample data if available
        return loadSampleGame(gameId);
    }
}

/**
 * Load a sample game for development
 * @param {string} gameId - The ID of the game to load
 * @returns {Object} - The sample game data
 */
function loadSampleGame(gameId) {
    if (gameId === 'daily') {
        // Return the first sample game as the daily game
        return Promise.resolve(sampleGames[0]);
    }
    
    // Find the game by ID
    const game = sampleGames.find(g => g.id === gameId);
    
    if (game) {
        return Promise.resolve(game);
    }
    
    // If not found, return the first sample game
    return Promise.resolve(sampleGames[0]);
}

/**
 * Get a random game from the available games
 * @returns {Promise<Object>} - A random game
 */
async function getRandomGame() {
    // For development, use sample data
    if (process.env.NODE_ENV === 'development' || !GITHUB_REPO_URL.includes('username')) {
        const randomIndex = Math.floor(Math.random() * sampleGames.length);
        return Promise.resolve(sampleGames[randomIndex]);
    }
    
    try {
        // In production, fetch the list of available games
        const response = await fetch(`${GITHUB_REPO_URL}/games/index.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load game index: ${response.status} ${response.statusText}`);
        }
        
        const gameIndex = await response.json();
        
        // Select a random game from the index
        const randomGame = gameIndex[Math.floor(Math.random() * gameIndex.length)];
        
        // Load the selected game
        return await loadGame(randomGame.id);
    } catch (error) {
        console.error('Error getting random game:', error);
        
        // Fall back to sample data
        const randomIndex = Math.floor(Math.random() * sampleGames.length);
        return Promise.resolve(sampleGames[randomIndex]);
    }
}

/**
 * Get the list of available games
 * @returns {Promise<Array>} - The list of available games
 */
async function getGameList() {
    // For development, use sample data
    if (process.env.NODE_ENV === 'development' || !GITHUB_REPO_URL.includes('username')) {
        return Promise.resolve(sampleGames.map(game => ({
            id: game.id,
            date: game.date
        })));
    }
    
    try {
        // In production, fetch the list of available games
        const response = await fetch(`${GITHUB_REPO_URL}/games/index.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load game index: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error getting game list:', error);
        
        // Fall back to sample data
        return Promise.resolve(sampleGames.map(game => ({
            id: game.id,
            date: game.date
        })));
    }
}

// Shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export { loadGame, getRandomGame, getGameList }; 