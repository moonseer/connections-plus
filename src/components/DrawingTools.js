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
        state.drawingMode = true;
        state.eraserMode = false;
        updateActiveDrawingTool('pen');
        canvas.style.pointerEvents = 'auto';
    });
    
    eraserTool.addEventListener('click', () => {
        state.drawingMode = true;
        state.eraserMode = true;
        updateActiveDrawingTool('eraser');
        canvas.style.pointerEvents = 'auto';
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
     * Resize the canvas to match the game board
     */
    function resizeCanvas() {
        const gameBoard = document.getElementById('game-board');
        const rect = gameBoard.getBoundingClientRect();
        
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.top = `${rect.top}px`;
        canvas.style.left = `${rect.left}px`;
    }
    
    /**
     * Start drawing on the canvas
     * @param {MouseEvent} e - The mouse event
     */
    function startDrawing(e) {
        if (!state.drawingMode) return;
        
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    /**
     * Draw on the canvas as the mouse moves
     * @param {MouseEvent} e - The mouse event
     */
    function draw(e) {
        if (!isDrawing || !state.drawingMode) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        
        if (state.eraserMode) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx.lineWidth = 20;
        } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.lineWidth = 2;
        }
        
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    /**
     * Stop drawing on the canvas
     */
    function stopDrawing() {
        isDrawing = false;
    }
}

/**
 * Update the active drawing tool indicator
 * @param {string} tool - The selected tool ('pen' or 'eraser')
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
}

export { setupDrawingTools, exitDrawingMode }; 