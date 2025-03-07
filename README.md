# Connections-plus
An improved UI for playing the NYT Connections Game.

Did you ever wish you could move around and temporarily label cards in the game? Well, this UI lets you do all that and more.

## Features

### Current Features
- **Flexible Card Placement**: Move cards anywhere on the screen to visually organize your thoughts
- **Color Coding**: Make guesses about card categories by color-coding them without submitting
- **Drawing Tools**: Add notes and annotations directly on the screen
- **Game Submission**: Submit your final answers when ready. And select the order.
- **Game Library**: Pick from a collection of historic games to play
- **Real Game Data**: Connected to a GitHub repository with actual NYT Connections game data

### Upcoming Features
- **AI Assistance**: Get hints of varying difficulty when you're stuck
  - Beginner hints: General guidance about possible connections
  - Intermediate hints: Specific clues about one category
  - Expert hints: Minimal nudges to preserve the challenge
- **Save Progress**: Save your game state to continue later
- **Custom Games**: Create and share your own Connections puzzles
- **Statistics**: Track your performance over time

## How to Play

1. **Select a Game**: Choose from the daily puzzle, a random game, or browse the archive
2. **Organize Cards**: Drag cards to group them as you explore possible connections
3. **Test Categories**: Use the color-coding feature to mark potential groups
4. **Take Notes**: Use the drawing tools to jot down ideas
5. **Submit**: When confident, submit your answer to see if you're correct

## How to Run

1. Make sure Node.js is installed
2. Clone this repository
3. Run `npm install` to install dependencies
4. Run `npm start` to start the server on port 8080
   - Or run `npm run start:auto` to automatically find an available port
5. Open a browser and navigate to the URL shown in the console (typically `http://localhost:8080`)

**Note**: If port 8080 is already in use, you can modify the PORT variable in server.js to use a different port, or use the `npm run start:auto` command which will automatically find an available port.

## Development

- Run `npm run dev` to start the server with nodemon for auto-reloading

## Technical Details

The application is built with:
- Vanilla JavaScript with modules for organization
- CSS variables for consistent styling
- Canvas API for drawing functionality
- Fetch API for loading game data from GitHub
- Event delegation for efficient event handling
- Node.js server for serving the application

## Data Source

This project uses data from the [NYT-Connections-Answers](https://github.com/Eyefyre/NYT-Connections-Answers) repository by Eyefyre. The data is used to provide historic NYT Connections games.

## Contributing

[Contribution guidelines will go here]

## License

[License information will go here]