// When page is loaded, set sound to unmute and game to start

                                    // HTML Elements
const cells = document.querySelectorAll(".cell");
// const board = document.getElementById("board");                     // unused
const buttons = document.querySelectorAll(".button");
const statusText = document.getElementById("status-text");
const muteButton = document.getElementById("mute-button");
const resetButton = document.getElementById("reset-button");
const gameModeButton = document.getElementById("game-mode-button");

                                    // Game Elements
const player_X = "X";
const player_O = "O";
let currPlayer = player_X;
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", "",];
const winningCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

                                    // Sounds
const clickSound = new Audio ("assets/audio/click.mp3");
const victorySound = new Audio ("assets/audio/victory.mp3");
const buttonSound = new Audio ("assets/audio/button.mp3");
clickSound.muted = false;
victorySound.muted = false;
buttonSound.muted = false;

                                    // Event Listeners
cells.forEach((cell) => cell.addEventListener("click", (event) => {
    playClick();
    clickCell(event);
}));
buttons.forEach((button) => button.addEventListener("click", playButton));
resetButton.addEventListener("click", startGame);
muteButton.addEventListener("click", muteSound);
gameModeButton.addEventListener("click", switchGameMode);

                                    // Functions
/**
 * This function plays the "clickSound" sound
 */
function playClick() {
    clickSound.play();
}

/**
 * This function plays the "buttonSound" sound
 */
function playButton() {
    buttonSound.play();
}

/**
 * This function plays the "victorySound" sound
 */
function playVictory() {
    victorySound.play();
}

/**
 * This function mutes all sounds
 */
function muteSound() {
    // unmute when clicked again and sound is currently muted ? 
    clickSound.muted = true;
    victorySound.muted = true;
    buttonSound.muted = true;
}

/**
 * This function switches between the two game modes: Player-vs-Player and Player-vs-Computer
 */
function switchGameMode() {
    // switch between pvp and pvc game mode
}

/**
 * This function (re-)starts the game by resetting the board to empty and setting the turn to be player_X 
 */
function startGame() {
    // set Player to X
    currPlayer = player_X;
    // clear board
    cells.forEach((cell) => (cell.innerText = ""));
    // game not over
    gameOver = false;
}

/**
 * This function updates a cell when clicked.
 * Only empty cells can be updated.
 * When clicked, the current player's symbol appears in a cell.
 * It then changes to the nex player's turn.
 * Lastly, it checks for a win or draw.
 */
function clickCell(event) {
    // don't update if cell is not empty
    const clickedCell = event.target;
    // const cellIndex = clickedCell.getAttribute("data-cell-index");

    if (clickedCell.innerText) {
        return;
    }
    // update cell with current player's symbol
    clickedCell.innerText = currPlayer;

    console.log(clickedCell);
    // change turn function
    changeTurn();
    // check winner function
    checkWinner();
    // check draw function
    checkDraw();
}

/**
 * This function changes to the next player's turn based on the current player
 */
function changeTurn() {
    // currPlayer === player_X ? currPlayer = player_0 : currPlayer = player_X
    if (currPlayer === player_X) {
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }
}

/**
 * This function checks if a win has been achieved
 * It compares the board against the winning combinations defined in winningCells
 * If no win is achieved, it checks for a draw
 * If a win is achieved, it announces a winner
 */
function checkWinner() {    
    let roundWon = false;

    // for (let winningCell of winningCells) {         // for (let i = 0; i < winningCells.length; i++) 
    for (let i = 0; i < winningCells.length; i++) {
        const combo = winningCells[i];
        const cellA = board[combo[0]];
        const cellB = board[combo[1]];
        const cellC = board[combo[2]];

        // Check if cells aren't empty
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        // Check if cells match
        if (cellA == cellB && cellA == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        console.log("we have a winner");
    }

    // If no Winner, check for a Draw
    checkDraw();
}

/**
 * This function checks for a draw
 * If a draw is achieved, it announces a draw
 */
function checkDraw() {
    var isFull = true;
    for (var i = 0; i < cells. length; i++) { 
        if (cells[i]. innerText === "") {
            isFull = false;
            break;
        }
    }
    if (isFull && !gameOver) {
        gameOver = true;
        announceDraw();
    }
}


/**
 * This function announces if a win has been achieved
 * It plays the "playVictory" sound
 * It unhides the "status-text" and updates it to display the current player as the winner
 */
function announceWinner() {
    // play Winner sound
    playVictory();

    // unhide status text
    statusText.className = "visible";

    // update status text
    statusText.innerText = `The winner is ${currPlayer}!`
}

/**
 * * This function announces if a draw has been achieved
 * It plays the "playVictory" sound
 * It unhides the "status-text" and updates it to display "Draw!"
 */
function announceDraw() {
    //play Winner sound
    playVictory();

    // unhide status text
    statusText.className = "visible";

    // update status text
    statusText.innerText = "Draw!";
}

                                    // Start Game
// startGame(); 