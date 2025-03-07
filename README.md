# Connections-plus
An improved UI for playing the NYT Connections Game.

Did you ever wish you could move around and temporarily label cards in the game? Well, this UI lets you do all that and more.

## Features

### Current Features
- **Flexible Card Placement**: Move cards anywhere on the screen to visually organize your thoughts
- **Color Coding**: Make guesses about card categories by color-coding them without submitting
  - Visual indicators show group progress with card counts
  - Pulsing animation highlights the active color tool
  - Visual feedback when a color group is complete (4 cards)
- **Drawing Tools**: Add notes and annotations directly on the screen with toggle functionality
- **Game Submission**: Submit your final answers when ready and select the order
- **Game Library**: Pick from a collection of historic games to play
  - Search functionality to filter games by date or ID
  - Browse through a comprehensive archive of past games
  - Loading states and error handling for smooth user experience
- **Real Game Data**: Connected to a GitHub repository with actual NYT Connections game data
- **AI Hints**: Get hints of varying difficulty when you're stuck:
  - Beginner: General guidance about possible connections
  - Intermediate: Specific clues about one category
  - Expert: Minimal nudges to preserve the challenge
- **Mobile Responsive**: Optimized layout for mobile devices
- **Visual Feedback**: Status messages, animations, and tooltips enhance the user experience

### Upcoming Features
- **Save Progress**: Save your game state to continue later
- **Custom Games**: Create and share your own Connections puzzles
- **Statistics**: Track your performance over time
- **Enhanced Animations**: Improved UI with additional animations and transitions
- **User Accounts**: Personal profiles with progress tracking

## How to Play

1. **Select a Game**: Choose from the daily puzzle, a random game, or browse the archive
2. **Organize Cards**: Drag cards to group them as you explore possible connections
3. **Test Categories**: Use the color-coding feature to mark potential groups
4. **Take Notes**: Use the drawing tools to jot down ideas
5. **Get Hints**: If you're stuck, use the AI hints feature for guidance
6. **Submit**: When confident, submit your answer to see if you're correct

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
- Global state management for consistent application state
- Responsive design for mobile and desktop compatibility

## Data Source

This project uses data from the [NYT-Connections-Answers](https://github.com/Eyefyre/NYT-Connections-Answers) repository by Eyefyre. The data is used to provide historic NYT Connections games.

## Contributing

[Contribution guidelines will go here]

## License

[License information will go here]