// MODEL ////////////////////////////////////////////////////////////////////////////////
const app = document.getElementById('app');

const winPatterns = [
    ["1of1", "2of1", "3of1",], /* 1st row */
    ["1of2", "2of2", "3of2",], /* 2nd row */
    ["1of3", "2of3", "3of3",], /* 3rd row */
    ["1of1", "1of2", "1of3",], /* 1st column */
    ["2of1", "2of2", "2of3",], /* 2nd column */
    ["3of1", "3of2", "3of3",], /* 3rd column */
    ["3of1", "2of2", "1of3",], /* across to top right */
    ["1of1", "2of2", "3of3",], /* across to top left */
]

const pcOptions = [
    "1of1",
    "2of1",
    "3of1",
    "1of2",
    "2of2",
    "3of2",
    "1of3",
    "2of3",
    "3of3",
]

let playerIs = "";
let pcIs = "";

let playerScore = 0;
let pcScore = 0;


// VIEW /////////////////////////////////////////////////////////////////////////////////
updateView()
function updateView() {
    let html = /*HTML*/ `
    <h2>PLAYER SCORE: ${playerScore}</h2>
    <h2>PC SCORE : ${pcScore}</h2>
    <div class="grid">
    <div onclick="yourTurn(this)" id="1of1"></div>
    <div onclick="yourTurn(this)" id="2of1"></div>
    <div onclick="yourTurn(this)" id="3of1"></div>
    <div onclick="yourTurn(this)" id="1of2"></div>
    <div onclick="yourTurn(this)" id="2of2"></div>
    <div onclick="yourTurn(this)" id="3of2"></div>
    <div onclick="yourTurn(this)" id="1of3"></div>
    <div onclick="yourTurn(this)" id="2of3"></div>
    <div onclick="yourTurn(this)" id="3of3"></div>
    <button onclick="playAs('X')">PLAY AS X</button>
    <button onclick="playAs('O')">PLAY AS O</button>
    <button onclick="updateView()">RESET</button>
    </div>
    `
    app.innerHTML = html
}



// CONTROLLER ///////////////////////////////////////////////////////////////////////////
// PLAYER TURN
function yourTurn(playerPick) {
    checkForWinPattern(playerIs);

    if (playerPick.classList == "unavailable") {
        return;
    } else {
        playerPick.innerHTML = playerIs;
        playerPick.classList.add("unavailable");
        if (checkForWinPattern(playerIs) == true) {
            playerScore++;
            updateView()
        }
    }
    setTimeout(pcTurn, 500);
}
// PC TURN
function pcTurn() {
    let pcPick = document.getElementById(pcOptions[generateRandomNumber(pcOptions.length)])
    checkForWinPattern(pcIs);
    generateRandomNumber(pcOptions.length)
    
    if (pcPick.classList == "unavailable") {
        pcTurn()
        // return;
    } else {
        pcPick.innerHTML = pcIs;
        pcPick.classList.add("unavailable");

        if (checkForWinPattern(pcIs) == true) {
            pcScore++;
            updateView()
        }
    }
}



function checkForWinPattern(symbol) {
    for (const pattern of winPatterns) {

        const [cell1, cell2, cell3] = pattern;
        const cell1Content = document.getElementById(cell1).innerHTML;
        const cell2Content = document.getElementById(cell2).innerHTML;
        const cell3Content = document.getElementById(cell3).innerHTML;

        if (cell1Content === symbol &&
            cell2Content === symbol &&
            cell3Content === symbol) {
            console.log("three in a row!");
            return true;
        }
    }
}




// Flips a coin to see who starts
function firstPlayer() {
    if (generateRandomNumber(2) == 0) {
        pcTurn()
    } else { return }
}

// Generates random number * parameter
function generateRandomNumber(parameter) {
    let randomNum = Math.floor(Math.random() * parameter);
    return randomNum;
}
// Player chooses symbol
function playAs(symbol) {
    playerIs = symbol;
    if (playerIs == "X") {
        pcIs = "O";
    } else if (playerIs == "O") {
        pcIs = "X";
    }
    firstPlayer()
}