const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const grid = 20;                 // 20x20 = 400px
const tile = canvas.width / grid;

let snake, dir, food, score, best, dead, loopId;
let speed = "normal";            // slow | normal | fast

const speedMap = {
  slow: 140,
  normal: 100,
  fast: 70,
};

function reset() {
  snake = [{ x: 10, y: 10 }];
  dir = { x: 1, y: 0 };
  placeFood();
  score = 0;
  dead = false;
  updateHud();
  clearInterval(loopId);
  loopId = setInterval(tick, speedMap[speed]);
}

function placeFood() {
  while (true) {
    food = {
      x: Math.floor(Math.random() * grid),
      y: Math.floor(Math.random() * grid),
    };
    if (!snake.some(seg => seg.x === food.x && seg.y === food.y)) break;
  }
}

function tick() {
  // Próxima cabeça
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  // Colisão com parede
  if (head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid) {
    return gameOver();
  }
  // Colisão com o próprio corpo
  if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    return gameOver();
  }

  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    if (score > best) {
      best = score;
      localStorage.setItem("snake_best", best);
    }
    placeFood();
    updateHud();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  // fundo
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // quadriculado leve
  ctx.strokeStyle = "#1b1b1b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= grid; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tile, 0);
    ctx.lineTo(i * tile, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * tile);
    ctx.lineTo(canvas.width, i * tile);
    ctx.stroke();
  }

  // comida
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(food.x * tile, food.y * tile, tile, tile);

  // cobra
  snake.forEach((seg, idx) => {
    ctx.fillStyle = idx === 0 ? "#2ecc71" : "#27ae60";
    ctx.fillRect(seg.x * tile, seg.y * tile, tile, tile);
  });
}

function gameOver() {
  dead = true;
  clearInterval(loopId);
  // overlay
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = "16px sans-serif";
  ctx.fillText("Clique em Reiniciar para jogar de novo", canvas.width / 2, canvas.height / 2 + 16);
}

function updateHud() {
  document.getElementById("score").textContent = score;
  document.getElementById("best").textContent = best ?? 0;
  document.getElementById("speedLabel").textContent =
    speed === "slow" ? "Lento" : speed === "fast" ? "Rápido" : "Normal";
}

function setDir(nx, ny) {
  // evita virar 180º
  if (snake.length > 1 && snake[0].x + nx === snake[1].x && snake[0].y + ny === snake[1].y) return;
  dir = { x: nx, y: ny };
}

document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if (k === "arrowup" || k === "w") setDir(0, -1);
  else if (k === "arrowdown" || k === "s") setDir(0, 1);
  else if (k === "arrowleft" || k === "a") setDir(-1, 0);
  else if (k === "arrowright" || k === "d") setDir(1, 0);
});

document.getElementById("btnRestart").addEventListener("click", reset);

// velocidade via dropdown
document.querySelectorAll(".dropdown-item").forEach(btn => {
  btn.addEventListener("click", () => {
    const chosen = btn.getAttribute("data-speed");
    if (speed !== chosen) {
      speed = chosen;
      updateHud();
      if (!dead) {
        clearInterval(loopId);
        loopId = setInterval(tick, speedMap[speed]);
      }
    }
  });
});

// carrega recorde
best = parseInt(localStorage.getItem("snake_best") || "0", 10);

// inicia
reset();
draw();
