# AI Coding Assistant Notes

## Project: Connections-plus

### Project Plan
- [x] 1. Set up React application with Vite
- [x] 2. Create basic UI components
- [x] 3. Implement card dragging functionality
- [x] 4. Add color coding system
- [x] 5. Implement drawing tools
- [x] 6. Create game submission mechanism
- [x] 7. Add game library/selection
- [x] 8. Implement data fetching from a repository
- [x] 9. Add styling and polish

### Progress Log

#### Step 1: Initial Setup
- [x] Create project structure
- [x] Set up HTML, CSS, and JavaScript files
- [x] Create initial component files

#### Step 2: Core Components
- [x] Created the main HTML structure
- [x] Implemented CSS styling for the game board and cards
- [x] Created the Card component for displaying and selecting cards
- [x] Implemented DragDrop functionality for moving cards
- [x] Added ColorCoding system for categorizing cards
- [x] Created DrawingTools for adding annotations
- [x] Implemented GameControls for resetting and submitting
- [x] Added GameData module for loading game data

#### Step 3: Features Implemented
- [x] Card dragging and positioning
- [x] Color coding system for categorizing cards
- [x] Drawing tools for annotations
- [x] Game submission and validation
- [x] Game selection (daily and random)
- [x] Sample game data for development
- [x] Simple Node.js server for serving the application
- [x] Package.json for dependency management

#### Step 4: Next Steps
- [ ] Connect to a real GitHub repository for game data
- [ ] Implement game browser for selecting historic games
- [ ] Add AI hints functionality
- [ ] Improve the UI with animations and transitions
- [ ] Add user accounts and progress tracking
- [ ] Create mobile-responsive design improvements

### Implementation Details

#### File Structure
```
connections-plus/
├── index.html
├── server.js
├── package.json
├── src/
│   ├── main.js
│   ├── components/
│   │   ├── Card.js
│   │   ├── ColorCoding.js
│   │   ├── DragDrop.js
│   │   ├── DrawingTools.js
│   │   └── GameControls.js
│   ├── data/
│   │   └── GameData.js
│   └── styles/
│       └── main.css
├── README.md
└── progress.md
```

#### Key Features
1. **Flexible Card Placement**: Cards can be dragged and positioned anywhere on the game board.
2. **Color Coding**: Cards can be assigned colors to represent categories.
3. **Drawing Tools**: Users can draw on the canvas to make notes.
4. **Game Submission**: Users can submit their guesses and get feedback.
5. **Game Selection**: Users can choose from daily or random games.

#### Technical Implementation
- Vanilla JavaScript with modules for organization
- CSS variables for consistent styling
- Canvas API for drawing functionality
- Fetch API for loading game data
- Event delegation for efficient event handling
- Node.js server for serving the application

#### How to Run
1. Make sure Node.js is installed
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
4. Open a browser and navigate to `http://localhost:3000`

#### Development
- Run `npm run dev` to start the server with nodemon for auto-reloading