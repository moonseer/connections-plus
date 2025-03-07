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

#### Step 4: Bug Fixes and Enhancements
- [x] Fixed process.env reference in GameData.js for browser compatibility
- [x] Added global state management via window.appState
- [x] Updated components to properly access the global state
- [x] Fixed port conflict issues in server.js with auto-port selection
- [x] Fixed drawing functionality by properly positioning the canvas
- [x] Added debugging logs to help troubleshoot drawing issues
- [x] Moved canvas inside game-board for better positioning
- [x] Improved drawing tool toggle functionality (click to activate/deactivate)
- [x] Fixed card movement after toggling drawing mode
- [x] Enhanced color coding to work with direct card clicks
- [x] Added visual feedback for selected cards and active tools
- [x] Fixed coordinate calculation for drawing on the canvas
- [x] Fixed color selection to only apply to newly clicked cards
- [x] Added count indicators to color tools to show group progress
- [x] Added visual feedback when a color group is complete (4 cards)
- [x] Improved state management when loading new games
- [x] Added tooltips to color tools showing card counts
- [x] Added ability to deselect colors by clicking on empty space
- [x] Added pulsing animation to active color tool
- [x] Added status message to show which color is currently selected
- [x] Fixed status message positioning to appear to the right of color tools
- [x] Improved toolbar layout to accommodate status messages
- [x] Repositioned status message to appear above color tools to avoid overlapping with UI elements
- [x] Added background and styling to status message for better visibility
- [x] Improved mobile responsiveness of status message

#### Step 5: Next Steps
- [x] Connect to a real GitHub repository for game data
- [x] Implement game browser for selecting historic games
- [x] Add AI hints functionality
- [ ] Improve the UI with animations and transitions
- [ ] Add user accounts and progress tracking
- [ ] Create mobile-responsive design improvements

#### Step 6: Real Game Data Integration
- [x] Connected to Eyefyre/NYT-Connections-Answers GitHub repository
- [x] Implemented data fetching and formatting from the repository
- [x] Created a game browser modal for selecting historic games
- [x] Added search functionality to filter games by date or ID
- [x] Implemented responsive design for the game browser
- [x] Added loading states and error handling

#### Step 7: AI Hints Implementation
- [x] Created AI hints component with three difficulty levels
- [x] Implemented hint generation based on game state and user progress
- [x] Added modal interface for selecting hint difficulty
- [x] Implemented loading state and animations for hint generation
- [x] Added hint history tracking in application state
- [x] Created responsive design for hint interface
- [x] Implemented different hint strategies based on difficulty level

### Implementation Details

#### File Structure
```
connections-plus/
├── index.html
├── server.js
├── start-server.js
├── package.json
├── src/
│   ├── main.js
│   ├── components/
│   │   ├── AIHints.js
│   │   ├── Card.js
│   │   ├── ColorCoding.js
│   │   ├── DragDrop.js
│   │   ├── DrawingTools.js
│   │   ├── GameBrowser.js
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
2. **Color Coding**: Cards can be assigned colors to represent categories, with visual indicators showing group progress.
3. **Drawing Tools**: Users can draw on the canvas to make notes, with toggle functionality for drawing mode.
4. **Game Submission**: Users can submit their guesses and get feedback on correct and incorrect groups.
5. **Game Selection**: Users can choose from daily, random, or historic games from a searchable browser.
6. **Real Game Data**: Connected to a GitHub repository with actual NYT Connections game data.
7. **AI Hints**: Get hints of varying difficulty when stuck on a puzzle.

#### Technical Implementation
- Vanilla JavaScript with modules for organization
- CSS variables for consistent styling
- Canvas API for drawing functionality
- Fetch API for loading game data
- Event delegation for efficient event handling
- Node.js server for serving the application
- Global state management via window.appState
- Visual feedback for user interactions

#### How to Run
1. Make sure Node.js is installed
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server
   - Or run `npm run start:auto` to automatically find an available port
4. Open a browser and navigate to the URL shown in the console (typically `http://localhost:8080`)

**Note on Port Conflicts**: If you encounter an `EADDRINUSE` error, it means the port is already in use. The server has been configured to use port 8080, but if that's also in use, you can:
- Modify the PORT variable in server.js to use a different port
- Use the `npm run start:auto` command which will automatically find an available port

#### Development
- Run `npm run dev` to start the server with nodemon for auto-reloading