var boxes = $('.boxed');
var clearButton = $('#clear-button');
var turnText = $('#turn-text');
var playWinStatus = $('#play-win-status-text');
var xWinsDisplay = $('#x-wins-count');
var oWinsDisplay = $('#o-wins-count');

var xWinsCount = 0;
var oWinsCount = 0;
var turn = 0;
var amountClicked = 0;
var playerHasWon = false
var xSequence = [];
var oSequence = [];

const winningVariations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function contains(currentCombo, winningCombo) {
    var check = 0;

    for (let i = 0; i < winningCombo.length; i++) {
        for (let j = 0; j < currentCombo.length; j++) {
            if (winningCombo[i] === currentCombo[j]) check++;
        }
    }

    if (check === 3) return true;
    return false;
}

function checkWinner(currentCombo) {
    for (let i = 0; i < winningVariations.length; i++) {
        winningCombo = winningVariations[i];
        if (contains(currentCombo, winningVariations[i])) {
            playerHasWon = true;
            return true;
        }
    }
    return false;
}

function marker() {
    if (amountClicked === 9 || playerHasWon) return;

    if ($(this).html() === " ") {
        if (turn === 0) {
            amountClicked++;
            $(this).text("X");
            turn = 1;
            turnText.text("O's");
            xSequence.push(parseInt(this.id));

            if (checkWinner(xSequence)) {
                turnText.text("X");
                playWinStatus.text("has won the game!");
                xWinsCount++;
                xWinsDisplay.text(xWinsCount);
                return;
            }

            if (amountClicked === 9) {
                turnText.html("<br>");
                playWinStatus.text("tie game!");
            }

            return;
        }

        if (turn === 1) {
            amountClicked++;
            $(this).text("O");
            turn = 0;
            turnText.text("X's");
            oSequence.push(parseInt(this.id));

            if (checkWinner(oSequence)) {
                turnText.text("O");
                playWinStatus.text("has won the game!");
                $('h1').text("X can $uck ma thick di©k!!!")
                oWinsCount++;
                oWinsDisplay.text(oWinsCount);
                return;
            }

            if (amountClicked === 9) {
                turnText.html("<br>");
                playWinStatus.text("tie game!");
                oWinsCount++;
            }

            return;
        }
    }
}

function clearBoard() {
    playerHasWon = false;
    amountClicked = 0;
    turn = 0;
    xSequence = [];
    oSequence = [];
    turnText.text("X's");
    playWinStatus.text("turn to play")
    boxes.text(" ");
}

boxes.click(marker);

clearButton.click(clearBoard);