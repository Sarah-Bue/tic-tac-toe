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
    // this might make more sense as a toggle between mute / on 
    clickSound.muted = true;
    victorySound.muted = true;
    buttonSound.muted = true;
    console.log("sound muted");
}




function switchGameMode() {
    // switch between pvp and pvc game mode
}

function startGame() {
    currPlayer = player_X;
    gameRunning = true;
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
    playVictory();
    announceWinner();
}

function checkDraw() {
    // check if draw conditions are met
    // unhide status text
    playVictory();
    announceWinner();
}

function announceWinner() {
    // announce who won
    // unhide status text
}

                                    // Start Game

muteSound();