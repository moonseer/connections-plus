// Game Data Module

// Sample game data for development (as fallback)
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
const GITHUB_REPO_URL = 'https://raw.githubusercontent.com/Eyefyre/NYT-Connections-Answers/main/connections.json';

// Check if we're in development mode
// In browser environment, process.env might not be available
const IS_DEVELOPMENT = false; // Set to false to use the real data

/**
 * Load game data from the repository
 * @param {string} gameId - The ID of the game to load, or 'daily' for today's game
 * @returns {Promise<Object>} - The game data
 */
async function loadGame(gameId) {
    try {
        // Fetch the full game list
        const games = await fetchGamesFromGitHub();
        
        if (gameId === 'daily') {
            // Get the most recent game
            const latestGame = games[games.length - 1];
            return formatGameData(latestGame);
        } else {
            // Find the game by ID
            const game = games.find(g => g.id.toString() === gameId.toString());
            if (game) {
                return formatGameData(game);
            }
        }
        
        throw new Error(`Game with ID ${gameId} not found`);
    } catch (error) {
        console.error('Error loading game:', error);
        
        // Fall back to sample data if available
        return loadSampleGame(gameId);
    }
}

/**
 * Format the game data from GitHub to match our application's format
 * @param {Object} githubGame - The game data from GitHub
 * @returns {Object} - The formatted game data
 */
function formatGameData(githubGame) {
    // Map the GitHub data format to our application's format
    const categories = githubGame.answers.map(answer => {
        // Map level to color
        const colorMap = {
            0: 'yellow',
            1: 'green',
            2: 'blue',
            3: 'purple'
        };
        
        return {
            name: answer.group,
            color: colorMap[answer.level],
            words: answer.members
        };
    });
    
    // Flatten all words into a single array and shuffle them
    const words = categories.flatMap(category => category.words);
    const shuffledWords = shuffleArray(words);
    
    return {
        id: githubGame.id.toString(),
        date: githubGame.date,
        categories: categories,
        words: shuffledWords
    };
}

/**
 * Fetch all games from the GitHub repository
 * @returns {Promise<Array>} - Array of games
 */
async function fetchGamesFromGitHub() {
    try {
        const response = await fetch(GITHUB_REPO_URL);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching games from GitHub:', error);
        throw error;
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
    try {
        // Fetch all games from GitHub
        const games = await fetchGamesFromGitHub();
        
        // Select a random game
        const randomIndex = Math.floor(Math.random() * games.length);
        const randomGame = games[randomIndex];
        
        return formatGameData(randomGame);
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
    try {
        // Fetch all games from GitHub
        const games = await fetchGamesFromGitHub();
        
        // Format the game list
        return games.map(game => ({
            id: game.id.toString(),
            date: game.date
        }));
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