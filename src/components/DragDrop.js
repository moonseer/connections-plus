// Drag and Drop Component

/**
 * Set up dragging functionality for card elements
 * @param {NodeList|HTMLElement[]} cards - The card elements to make draggable
 */
function setupDragging(cards) {
    cards.forEach(card => {
        makeDraggable(card);
    });
}

/**
 * Make an element draggable
 * @param {HTMLElement} element - The element to make draggable
 */
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    /**
     * Handle mouse down event to start dragging
     * @param {MouseEvent} e - The mouse event
     */
    function dragMouseDown(e) {
        e.preventDefault();
        
        // Get the app state
        const appState = window.appState || {};
        
        // Skip if in drawing mode
        if (appState.drawingMode) {
            console.log('Drag prevented: Drawing mode is active');
            return;
        }
        
        // Get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Bring the card to the front
        element.style.zIndex = getHighestZIndex() + 1;
        
        // Add active class for styling
        element.classList.add('dragging');
        
        // Set up event listeners for drag and end
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        console.log('Started dragging card:', element.textContent);
    }
    
    /**
     * Handle mouse move event during dragging
     * @param {MouseEvent} e - The mouse event
     */
    function elementDrag(e) {
        e.preventDefault();
        
        // Calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Set the element's new position
        const newTop = (element.offsetTop - pos2);
        const newLeft = (element.offsetLeft - pos1);
        
        // Keep the card within the game board
        const gameBoard = document.getElementById('game-board');
        const boardRect = gameBoard.getBoundingClientRect();
        const cardRect = element.getBoundingClientRect();
        
        const minLeft = 0;
        const maxLeft = boardRect.width - cardRect.width;
        const minTop = 0;
        const maxTop = boardRect.height - cardRect.height;
        
        element.style.top = `${Math.max(minTop, Math.min(maxTop, newTop))}px`;
        element.style.left = `${Math.max(minLeft, Math.min(maxLeft, newLeft))}px`;
    }
    
    /**
     * Handle mouse up event to end dragging
     */
    function closeDragElement() {
        // Remove the active class
        element.classList.remove('dragging');
        
        // Stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
        
        console.log('Stopped dragging card');
    }
}

/**
 * Get the highest z-index among all cards
 * @returns {number} - The highest z-index value
 */
function getHighestZIndex() {
    const cards = document.querySelectorAll('.card');
    let highest = 0;
    
    cards.forEach(card => {
        const zIndex = parseInt(window.getComputedStyle(card).zIndex) || 0;
        if (zIndex > highest) {
            highest = zIndex;
        }
    });
    
    return highest;
}

/**
 * Reset all cards to their original grid positions
 */
function resetCardPositions() {
    const cards = document.querySelectorAll('.card');
    const gridSize = Math.ceil(Math.sqrt(cards.length));
    const cardWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-width'));
    const cardHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-height'));
    const spacing = 20;
    
    cards.forEach((card, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        
        card.style.left = `${col * (cardWidth + spacing) + spacing}px`;
        card.style.top = `${row * (cardHeight + spacing) + spacing}px`;
        card.style.zIndex = 1;
    });
    
    console.log('Reset all cards to grid positions');
}

export { setupDragging, resetCardPositions }; 