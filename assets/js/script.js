                                    // HTML Elements
const cells = document.querySelectorAll(".cell");
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

                                    // Sounds
const clickSound = new Audio ("assets/audio/click.mp3");
const victorySound = new Audio ("assets/audio/victory.mp3");
const buttonSound = new Audio ("assets/audio/button.mp3")

                                    // Event Listeners
cells.forEach((cell) => cell.addEventListener("click", playClick));
buttons.forEach((button) => button.addEventListener("click", playButton));
resetButton.addEventListener("click", startGame);


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
    // mute sound
}

function gameMode() {
    // switch between pvp and pvc game mode
}

function startGame() {
    // set player to X
    // set game to running
    // clear board
}

function clickCell() {
    // Mark cell
    // change turn
}

function changeTurn() {
   // switch between X and O player and symbol
}

function checkWinner() {
    // check if winning conditions are met
}

function checkDraw() {
    // check if draw conditions are met
    // unhide status text
}

function announceWinner() {
    // announce who won
    // unhide status text
}

                                    // Start Game
