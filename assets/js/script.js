// Wait for DOM to finish loading before starting the game
document.addEventListener("DOMContentLoaded", function () {
    startGame();
    
});

// HTML Elements
const cells = document.querySelectorAll(".cell");
const buttons = document.querySelectorAll(".button");
const turnTracker = document.getElementById("turn-tracker");
const statusText = document.getElementById("status-text");
const muteButton = document.getElementById("mute-button");
const resetButton = document.getElementById("reset-button");
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
feedbackButton.addEventListener("click", openFeedbackPopup);
closeFeedbackButton.addEventListener("click", closeFeedbackPopup);
instructionsButton.addEventListener("click", openInstructionsPopup);
closeInstructionsButton.addEventListener("click", closeInstructionsPopup);

// Functions
/**
 * This function opens the "Feedback" popup.
 */
function openFeedbackPopup() {
    document.getElementById("popup-feedback").style.display = "block";
    document.getElementById("close-feedback-button").style.display = "block";
    document.getElementById("feedback-button").style.display = "none";
    document.getElementById("popup-instructions").style.display = "none";
    document.getElementById("close-instructions-button").style.display = "none";
    document.getElementById("instructions-button").style.display = "block";
}

/**
 * This function hides the "Feedback" popup.
 */
function closeFeedbackPopup() {
    document.getElementById("popup-feedback").style.display = "none";
    document.getElementById("feedback-button").style.display = "block";
    document.getElementById("instructions-button").style.display = "block";
    document.getElementById("close-feedback-button").style.display = "none";
}

/**
 * This function opes the "Instructions" popup.
 */
function openInstructionsPopup() {
    document.getElementById("popup-instructions").style.display = "block";
    document.getElementById("instructions-button").style.display = "none";
    document.getElementById("close-instructions-button").style.display = "block";
    document.getElementById("popup-feedback").style.display = "none";
    document.getElementById("close-feedback-button").style.display = "none";
    document.getElementById("feedback-button").style.display = "block";
}

/**
 * This function hides the "Instructions" popup.
 */
function closeInstructionsPopup() {
    document.getElementById("popup-instructions").style.display = "none";
    document.getElementById("instructions-button").style.display = "block";
    document.getElementById("close-instructions-button").style.display = "none";
    document.getElementById("feedback-button").style.display = "block";
}

/**
 * This function plays the "clickSound" sound.
 */
function playClick() {
    clickSound.play();
}

/**
 * This function plays the "buttonSound" sound.
 */
function playButton() {
    buttonSound.play();
}

/**
 * This function plays the "victorySound" sound.
 */
function playVictory() {
    victorySound.play();
}

/**
 * This function mutes and unmutes all sounds.
 * It changes the text on the button to indicate whether clicking it will mute or unmute (play) the sound.
 */
function muteSound() {    
    if(clickSound.muted === true) {
        clickSound.muted = false;
        victorySound.muted = false;
        buttonSound.muted = false;
        muteButton.innerText = "Mute Sound";
    }
    else {
        clickSound.muted = true;
        victorySound.muted = true;
        buttonSound.muted = true;
        muteButton.innerText = "Play Sound";
    }
}

/**
 * This function (re-)starts the game.
 * The board is (re-) set to empty.
 * The turn is set to player_X
 * The status-text is set to hidden.
 */
function startGame() {
    // Set Player to X
    currPlayer = player_X;

    // Update turnTracker
    turnTracker.textContent = `${currPlayer}'s turn`;
    turnTracker.className = "visible";

    // Clear board
    cells.forEach((cell) => (cell.innerText = ""));
    board = ["", "", "", "", "", "", "", "", "",];

    // Game not over
    gameOver = false;

    // Hide status text
    statusText.className = "hidden";

    setHoverText();
}

/**
 * This function hovers a preview of the current player's symbol in a cell when hovering over the cell.
 * This function is adapted from Codebrainer.
 */
function setHoverText() {
    // Remove previous hover text
    cells.forEach((cell) => {
      cell.classList.remove("x-hover");
      cell.classList.remove("o-hover");
    });
    if (gameOver == false) {
    // Apply hover class based on current player's symbol
    const hoverClass = `${currPlayer.toLowerCase()}-hover`;
  
    cells.forEach((cell) => {
      if (cell.innerText == "") {
        cell.classList.add(hoverClass);
      }
    });
  }
}

/**
 * This function updates a cell when clicked.
 * Only empty cells can be updated.
 * When clicked, the current player's symbol appears in a cell.
 * It then changes to the nex player's turn.
 * Lastly, it checks for a win or draw.
 */
function clickCell(event) {
    if (gameOver == false) {
        // Only update empty cells
        const clickedCell = event.target;
        if (clickedCell.innerText) {
            return;
        }

        clickedCell.innerText = currPlayer;
        const cellIndex = Array.from(cells).indexOf(clickedCell);
        board[cellIndex] = currPlayer;

        changeTurn();

        setHoverText();

        checkWinner();
    }
}

/**
 * This function changes to the next player's turn based on the current player.
 */
function changeTurn() {
    if (currPlayer === player_X) { 
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }

    setHoverText();

    turnTracker.textContent = `${currPlayer}'s turn`;
}

/**
 * This function checks if a win has been achieved.
 * It compares the board against the winning combinations defined in winningCells.
 * If no win is achieved, it checks for a draw.
 * If a win is achieved, it announces a winner by unhiding the status-text.
 */
function checkWinner() {    
    let roundWon = false;

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
        gameOver = true;
    }
    else {
    checkDraw(roundWon);
    }
}

/**
 * This function checks for a Draw.
 * A Draw is achieved when all cells are filled and no winner is present.
 * If a Draw is achieved, it announces a Draw by unhiding the status-text.
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
        setHoverText();
    } 
}

/**
 * This function announces if a Win has been achieved.
 * It plays the "playVictory" sound.
 * It unhides the "status-text" and updates it to display the current player as the winner.
 */
function announceWinner() {
    // play Winner sound
    playVictory();
    gameOver = true;
    setHoverText();

    // hide turnTracker
    turnTracker.className = "hidden";

    // unhide and update status text
    statusText.className = "visible";
    if (currPlayer == player_X) {
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }
    statusText.innerText = `The winner is ${currPlayer}!`;
}

/**
 * * This function announces if a Draw has been achieved.
 * It plays the "playVictory" sound.
 * It unhides the "status-text" and updates it to display "Draw!"
 */
function announceDraw() {
    //play Winner sound
    playVictory();
    setHoverText();

    // hide turnTracker
    turnTracker.className = "hidden";

    // unhide and update status text
    statusText.className = "visible";
    statusText.innerText = "Draw!";
}