document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const restartButton = document.getElementById('restart');
    const xScoreElement = document.getElementById('x-score');
    const oScoreElement = document.getElementById('o-score');
    const xPlayerElement = document.querySelector('.x-player');
    const oPlayerElement = document.querySelector('.o-player');
    
    // Audio Elements
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const drawSound = document.getElementById('drawSound');
    
    // Game State
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let xScore = 0;
    let oScore = 0;
    
    // Winning Conditions
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Initialize the game
    const initGame = () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
            cell.style.pointerEvents = 'auto';
        });
        
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        updatePlayerTurn();
        removeWinningLine();
    };
    
    // Handle cell click
    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) return;
        
        // Play click sound
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        // Update game state and UI
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        // Check for win or draw
        const result = checkResult();
        
        if (result === 'win') {
            handleWin();
        } else if (result === 'draw') {
            handleDraw();
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    };
    
    // Check game result
    const checkResult = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                return 'win';
            }
        }
        
        return !gameState.includes('') ? 'draw' : 'continue';
    };
    
    // Handle win
    const handleWin = () => {
        gameActive = false;
        
        // Play win sound
        if (winSound) {
            winSound.currentTime = 0;
            winSound.play();
        }
        
        // Update score
        if (currentPlayer === 'X') {
            xScore++;
            xScoreElement.textContent = xScore;
        } else {
            oScore++;
            oScoreElement.textContent = oScore;
        }
        
        status.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningCells();
        drawWinningLine();
    };
    
    // Handle draw
    const handleDraw = () => {
        gameActive = false;
        
        // Play draw sound
        if (drawSound) {
            drawSound.currentTime = 0;
            drawSound.play();
        }
        
        status.textContent = "Game ended in a draw!";
    };
    
    // Highlight winning cells
    const highlightWinningCells = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                cells[a].classList.add('winning-cell');
                cells[b].classList.add('winning-cell');
                cells[c].classList.add('winning-cell');
                break;
            }
        }
    };
    
    // Draw winning line
    const drawWinningLine = () => {
        // This is a simplified version - you can enhance it to actually draw lines
        // For a complete solution, you would need to calculate positions and draw SVG lines
        console.log("Drawing winning line would go here");
    };
    
    // Remove winning line
    const removeWinningLine = () => {
        // Remove any existing winning line
    };
    
    // Update player turn UI
    const updatePlayerTurn = () => {
        status.textContent = `Player ${currentPlayer}'s turn`;
        
        if (currentPlayer === 'X') {
            xPlayerElement.classList.add('active');
            oPlayerElement.classList.remove('active');
        } else {
            oPlayerElement.classList.add('active');
            xPlayerElement.classList.remove('active');
        }
    };
    
    // Reset the current game
    const resetGame = () => {
        initGame();
    };
    
    // Restart the entire match (reset scores)
    const restartMatch = () => {
        xScore = 0;
        oScore = 0;
        xScoreElement.textContent = '0';
        oScoreElement.textContent = '0';
        initGame();
    };
    
    // Event Listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    restartButton.addEventListener('click', restartMatch);
    
    // Initialize the game
    initGame();
});