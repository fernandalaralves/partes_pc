let rows = 8;
let cols = 8;
let minesCount = 10;
let board = [];
let revealedCount = 0;
let gameOver = false;

function initGame() {
    board = [];
    revealedCount = 0;
    gameOver = false;
    document.getElementById("status").textContent = "";
    
    const game = document.getElementById("game");
    game.innerHTML = "";
    game.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    
    // Inicializa o tabuleiro
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = { mine: false, revealed: false, adjacent: 0 };
        }
    }

    // Coloca minas
    let placed = 0;
    while (placed < minesCount) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (!board[r][c].mine) {
            board[r][c].mine = true;
            placed++;
        }
    }

    // Calcula números adjacentes
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!board[r][c].mine) {
                board[r][c].adjacent = countAdjacentMines(r, c);
            }
        }
    }

    // Cria células no DOM
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => revealCell(r, c));
            game.appendChild(cell);
        }
    }
}

function countAdjacentMines(r, c) {
    let count = 0;
    for (let i = r-1; i <= r+1; i++) {
        for (let j = c-1; j <= c+1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
                if (board[i][j].mine) count++;
            }
        }
    }
    return count;
}

function revealCell(r, c) {
    if (gameOver || board[r][c].revealed) return;

    const cellDiv = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
    board[r][c].revealed = true;
    cellDiv.classList.add("revealed");
    
    if (board[r][c].mine) {
        cellDiv.textContent = "💣";
        cellDiv.classList.add("mine");
        endGame(false);
        return;
    }

    revealedCount++;
    if (board[r][c].adjacent > 0) {
        cellDiv.textContent = board[r][c].adjacent;
    } else {
        // Revela células vizinhas automaticamente
        for (let i = r-1; i <= r+1; i++) {
            for (let j = c-1; j <= c+1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols) {
                    revealCell(i, j);
                }
            }
        }
    }

    if (revealedCount === rows*cols - minesCount) {
        endGame(true);
    }
}

function endGame(win) {
    gameOver = true;
    const status = document.getElementById("status");
    if (win) {
        status.textContent = "Parabéns! Você venceu!";
        status.style.color = "green";
    } else {
        status.textContent = "Você perdeu! 💥";
        status.style.color = "red";
        // Revela todas as minas
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c].mine) {
                    const cellDiv = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
                    cellDiv.textContent = "💣";
                    cellDiv.classList.add("mine", "revealed");
                }
            }
        }
    }
}

initGame();
