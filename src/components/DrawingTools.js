// Drawing Tools Component

/**
 * Set up drawing tools functionality
 * @param {HTMLCanvasElement} canvas - The canvas element for drawing
 * @param {Object} state - The application state
 */
function setupDrawingTools(canvas, state) {
    const penTool = document.getElementById('pen-tool');
    const eraserTool = document.getElementById('eraser-tool');
    const clearDrawingBtn = document.getElementById('clear-drawing');
    
    // Get the 2D context from the canvas
    const ctx = canvas.getContext('2d');
    
    // Drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas size to match the game board
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Set up event listeners for drawing tools
    penTool.addEventListener('click', () => {
        // Toggle drawing mode
        state.drawingMode = !state.drawingMode;
        state.eraserMode = false;
        
        if (state.drawingMode) {
            updateActiveDrawingTool('pen');
            canvas.style.pointerEvents = 'auto';
            console.log('Pen tool activated, drawing mode:', state.drawingMode);
        } else {
            updateActiveDrawingTool(null);
            canvas.style.pointerEvents = 'none';
            console.log('Pen tool deactivated, drawing mode:', state.drawingMode);
        }
        
        // Make sure the canvas is visible and positioned correctly
        ensureCanvasIsReady();
    });
    
    eraserTool.addEventListener('click', () => {
        // Toggle eraser mode
        state.drawingMode = !state.drawingMode;
        state.eraserMode = true;
        
        if (state.drawingMode) {
            updateActiveDrawingTool('eraser');
            canvas.style.pointerEvents = 'auto';
            console.log('Eraser tool activated, drawing mode:', state.drawingMode);
        } else {
            updateActiveDrawingTool(null);
            canvas.style.pointerEvents = 'none';
            console.log('Eraser tool deactivated, drawing mode:', state.drawingMode);
        }
        
        // Make sure the canvas is visible and positioned correctly
        ensureCanvasIsReady();
    });
    
    clearDrawingBtn.addEventListener('click', () => {
        clearCanvas(ctx, canvas);
    });
    
    // Set up canvas event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    /**
     * Ensure the canvas is ready for drawing
     */
    function ensureCanvasIsReady() {
        // Make sure the canvas is visible
        canvas.style.display = 'block';
        
        // Set pointer events based on drawing mode
        canvas.style.pointerEvents = state.drawingMode ? 'auto' : 'none';
        
        // Set position and z-index
        canvas.style.position = 'absolute';
        canvas.style.zIndex = state.drawingMode ? '100' : '10';
        
        // Resize to make sure it covers the game board
        resizeCanvas();
    }
    
    /**
     * Resize the canvas to match the game board
     */
    function resizeCanvas() {
        const gameBoard = document.getElementById('game-board');
        const rect = gameBoard.getBoundingClientRect();
        
        // Set canvas dimensions to match the game board
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Since the canvas is now inside the game-board, we can use simpler positioning
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        
        // Log canvas position for debugging
        console.log('Canvas resized to:', rect.width, rect.height);
    }
    
    /**
     * Start drawing on the canvas
     * @param {MouseEvent} e - The mouse event
     */
    function startDrawing(e) {
        if (!state.drawingMode) return;
        
        isDrawing = true;
        
        // Get the correct coordinates relative to the canvas
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
        
        // Log to help debug
        console.log('Drawing started at:', lastX, lastY);
        
        // Draw a dot at the starting point
        ctx.beginPath();
        ctx.arc(lastX, lastY, state.eraserMode ? 10 : 1, 0, Math.PI * 2);
        ctx.fillStyle = state.eraserMode ? 'white' : 'rgba(0, 0, 0, 0.7)';
        ctx.fill();
    }
    
    /**
     * Draw on the canvas as the mouse moves
     * @param {MouseEvent} e - The mouse event
     */
    function draw(e) {
        if (!isDrawing || !state.drawingMode) return;
        
        // Get the correct coordinates relative to the canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Log to help debug
        console.log('Drawing at:', x, y);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        
        if (state.eraserMode) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.lineWidth = 2;
        }
        
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }
    
    /**
     * Stop drawing on the canvas
     */
    function stopDrawing() {
        if (isDrawing) {
            console.log('Drawing stopped');
        }
        isDrawing = false;
    }
    
    // Initialize the canvas
    ensureCanvasIsReady();
}

/**
 * Update the active drawing tool indicator
 * @param {string|null} tool - The selected tool ('pen', 'eraser', or null to deactivate)
 */
function updateActiveDrawingTool(tool) {
    // Remove active class from all drawing tools
    document.querySelectorAll('.drawing-tool').forEach(t => {
        t.classList.remove('active');
    });
    
    // Add active class to the selected tool
    if (tool === 'pen') {
        document.getElementById('pen-tool').classList.add('active');
    } else if (tool === 'eraser') {
        document.getElementById('eraser-tool').classList.add('active');
    }
}

/**
 * Clear the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {HTMLCanvasElement} canvas - The canvas element
 */
function clearCanvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log('Canvas cleared');
}

/**
 * Exit drawing mode
 * @param {Object} state - The application state
 */
function exitDrawingMode(state) {
    state.drawingMode = false;
    document.getElementById('drawing-layer').style.pointerEvents = 'none';
    document.querySelectorAll('.drawing-tool').forEach(tool => {
        tool.classList.remove('active');
    });
    console.log('Drawing mode exited');
}

export { setupDrawingTools, exitDrawingMode }; 