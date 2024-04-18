// Wait for DOM to finish loading before starting the game
document.addEventListener("DOMContentLoaded", function () {
    startGame();
})
                                    // HTML Elements
const cells = document.querySelectorAll(".cell");
const buttons = document.querySelectorAll(".button");
const statusText = document.getElementById("status-text");
const muteButton = document.getElementById("mute-button");
const resetButton = document.getElementById("reset-button");
const gameModeButton = document.getElementById("game-mode-button");
const feedbackButton = document.getElementById("feedback-button");
const closeFeedbackButton = document.getElementById("close-feedback-button");
const instructionsButton = document.getElementById("instructions-button");
const closeInstructionsButton = document.getElementById("close-instructions-button");

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
feedbackButton.addEventListener("click", openFeedbackPopup);
closeFeedbackButton.addEventListener("click", closeFeedbackPopup);
instructionsButton.addEventListener("click", openInstructionsPopup);
closeInstructionsButton.addEventListener("click", closeInstructionsPopup);

                                    // Functions

function openFeedbackPopup() {
    document.getElementById("popup-feedback").style.display = "block";
    document.getElementById("feedback-button").style.display = "none";
    document.getElementById("instructions-button").style.display = "none";
}

function closeFeedbackPopup() {
    document.getElementById("popup-feedback").style.display = "none";
    document.getElementById("feedback-button").style.display = "block";
}

function openInstructionsPopup() {
    document.getElementById("popup-instructions").style.display = "block";
    document.getElementById("instructions-button").style.display = "none";
    document.getElementById("feedback-button").style.display = "none";
}

function closeInstructionsPopup() {
    document.getElementById("popup-instructions").style.display = "none";
    document.getElementById("instructions-button").style.display = "block";
}

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
 * This function (re-)starts the game.
 * The board is (re-) set to empty.
 * The turn is set to player_X
 * The status-text is set to hidden.
 */
function startGame() {
    // set Player to X
    currPlayer = player_X;
    // clear board
    cells.forEach((cell) => (cell.innerText = ""));
    board = ["", "", "", "", "", "", "", "", "",];

    // game not over
    gameOver = false;

    // hide status text
    statusText.className = "hidden";
}

/**
 * This function updates a cell when clicked.
 * Only empty cells can be updated.
 * When clicked, the current player's symbol appears in a cell.
 * It then changes to the nex player's turn.
 * Lastly, it checks for a win or draw.
 */
function clickCell(event) {
    // Only update empty cells
    const clickedCell = event.target;
    if (clickedCell.innerText) {
        return;
    }

    /* 
    // Exit function (don't update cells) if there is a winner
    if (roundWon) {
        return;
    }

    //Exit function (don't update cells) if there is a draw
    if (isFull) {
        return;
    } */

    // update cell with current player's symbol
    clickedCell.innerText = currPlayer;

    // get index of clicked cell
    const cellIndex = Array.from(cells).indexOf(clickedCell);

    // update the board array with current player's symbol
    board[cellIndex] = currPlayer;

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
    if (currPlayer === player_X) {                                  // currPlayer = (currPlayer == player_X) ? player_0 : player_X;
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }
}

/**
 * This function checks if a win has been achieved.
 * It compares the board against the winning combinations defined in winningCells.
 * If no win is achieved, it checks for a draw.
 * If a win is achieved, it announces a winner by unhiding the status-text.
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
        announceWinner();
    }

    // If no Winner, check for a Draw
    checkDraw();
}

/**
 * This function checks for a draw.
 * A draw is achieved when all cells are filled and no winner is present.
 * If a draw is achieved, it announces a draw by unhiding the status-text.
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
    if (currPlayer == player_X) {
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }
    statusText.innerText = `The winner is ${currPlayer}!`;
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

/**
 * This function locks the board when a winner or a draw has been achieved.
 * No marks can be placed when the board is locked
 */
function lockBoard() {
    
}