var winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

var cells = document.querySelectorAll('.cell');
var restartButton = document.getElementById("restart");

var board;
var currentPlayer;
var gameOver;
var lastMoves; // останні ходи кожного гравця

function init() {
    board = ['','','','','','','','',''];
    currentPlayer = "X";
    gameOver = false;
    lastMoves = { "X": [], "O": [] };

    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        
        if (!cells[i].hasAttribute('data-index')) {
            cells[i].setAttribute('data-index', i);
        }
    }

    
}

function clickCell() {
    var idx = parseInt(this.getAttribute('data-index'), 10);

    if (board[idx] === '' && !gameOver) {
        // ставимо хід
        board[idx] = currentPlayer;
        this.innerText = currentPlayer;

        // додаємо хід у масив останніх ходів
        lastMoves[currentPlayer].push(idx);

        // перевірка перемоги перед видаленням старих ходів
        if (checkWin()) {
            alert("Гравець " + currentPlayer + " переміг!");
            gameOver = true;
            return;
        }

        // перевірка нічиї
        if (board.indexOf("") === -1) {
            alert("Нічия!");
            gameOver = true;
            return;
        }

        // видалення найстарішого ходу, якщо їх більше 3
        if (lastMoves[currentPlayer].length > 3) {
            var removeId = lastMoves[currentPlayer][0]; // перший хід
            lastMoves[currentPlayer] = lastMoves[currentPlayer].slice(1); // новий масив без першого
            board[removeId] = '';
            cells[removeId].innerText = '';
        }

        // зміна гравця
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        document.getElementById('current-player').innerText = currentPlayer;
    }
}

function checkWin() {
    for (var i = 0; i < winningCombos.length; i++) {
        var combo = winningCombos[i];
        var a = combo[0], b = combo[1], c = combo[2];

        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

// підключення кліків
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', clickCell);
}

restartButton.addEventListener('click', init);

// старт гри
init();
