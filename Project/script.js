var winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

var cells = document.querySelectorAll('.cell');
var restartButton = document.getElementById("restart");

var boerd;
var currentPlayer;
var gameOver;

function init() {
    boerd = ['','','','','','','','',''];
    currentPlayer = "X";
    gameOver = false;
    console.log(boerd)

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        
        if (!cells[i].hasAttribute('data-index')) {
            cells[i].setAttribute('data-index', i);
        }
    }
}

function clickCell() {
    var idx = parseInt(this.getAttribute('data-index'), 10);

    if (boerd[idx] === '' && !gameOver) {
        boerd[idx] = currentPlayer;
        this.innerText = currentPlayer;

        if (checkWin()) {
            alert("Игрок " + currentPlayer + " Победил!");
            gameOver = true;
            return;
        }

        if (boerd.indexOf("") === -1) {
            alert("Ничья!");
            gameOver = true;
            return;
        }

        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

function checkWin() {
    for (var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        var a = combo[0], b = combo[1], c = combo[2];

        if (boerd[a] === currentPlayer && boerd[b] === currentPlayer && boerd[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', clickCell);
}

restartButton.addEventListener('click', init);

init();
