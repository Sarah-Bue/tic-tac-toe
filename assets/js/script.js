// When page is loaded, set sound to unmute and game to start

                                    // HTML Elements
const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const buttons = document.querySelectorAll(".button")
const statusText = document.getElementById("status-text");
const muteButton = document.getElementById("mute-button");
const resetButton = document.getElementById("reset-button");
const gameModeButton = document.getElementById("game-mode-button");

                                    // Game Elements
const player_X = "X";
const player_O = "O";
let currPlayer = player_X;
let gameRunning = false;
let gameOver = false;
const boardFill = Array (cells.length);
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
const buttonSound = new Audio ("assets/audio/button.mp3")
clickSound.muted = false;
victorySound.muted = false;
buttonSound.muted = false;

                                    // Event Listeners
cells.forEach((cell) => cell.addEventListener("click", playClick));
buttons.forEach((button) => button.addEventListener("click", playButton));
resetButton.addEventListener("click", startGame);
muteButton.addEventListener("click", muteSound);
gameModeButton.addEventListener("click", switchGameMode);

                                    // Functions
function playClick() {
    clickSound.play();
}

function playButton() {
    buttonSound.play();
}

function playVictory() {
    victorySound.play();
}

function muteSound() {
    // unmute when clicked again and sound is currently muted ? 
    clickSound.muted = true;
    victorySound.muted = true;
    buttonSound.muted = true;
    console.log("sound muted");
}

function switchGameMode() {
    // switch between pvp and pvc game mode
}

function startGame() {
    // set Player to X
    currPlayer = player_X;
    // start Game
    gameRunning = true;
    // clear board
    cells.forEach((cell) => (cell.innerText = ""));
    boardFill.fill(null);
console.log("Hi there")
}

startGame();

function clickCell(event) {
    // don't update if cell is not empty
    const cell = event.target;
    const cellNumber = cell.dataset.index;
    if (cell.innerText != "") {
        return;
    }
    else {
        cell.innerText = player_X;
    }



    // change turn
    changeTurn();

}

function changeTurn() {
    // currPlayer === player_X ? currPlayer = player_0 : currPlayer = player_X
    if (currPlayer === player_X) {
        currPlayer = player_O;
    }
    else {
        currPlayer = player_X;
    }
}

function checkWinner() {
    // check if winning conditions are met
    gameOver = true;
    playVictory();
    announceWinner();
}

function checkDraw() {
    // check if draw conditions are met
    gameOver = true;
    playVictory();
    announceWinner();
}

function announceWinner() {
    // Announce Winner

    // unhide status text
    statusText.className = "visible";
}


                                    // Start Game

