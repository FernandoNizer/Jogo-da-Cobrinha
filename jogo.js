// Obter o canvas e o contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restart-button");

// Configurações do jogo
const blockSize = 10;
const width = canvas.width / blockSize;
const height = canvas.height / blockSize;

// Cria a cobra
let snake = [];
snake[0] = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
};

// Cria a comida
let food = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
};

// Direção da cobra
let direction = "right";

// Desenhar a cobra e a comida
function draw() {
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(
            snake[i].x * blockSize,
            snake[i].y * blockSize,
            blockSize,
            blockSize
        );
    }
}

// Atualizar o jogo
function update() {
    // Mover a cobra
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    // Mover a cabeça da cobra
    if (direction == "right") snake[0].x++;
    else if (direction == "left") snake[0].x--;
    else if (direction == "up") snake[0].y--;
    else if (direction == "down") snake[0].y++;

    // Detectar colisão com a parede
    if (snake[0].x >= width || snake[0].x < 0 || snake[0].y >= height || snake[0].y < 0) {
        
        document.getElementById("reload").style.display = ("block")
        //alert("Fim de Jogo!");
        //location.reload();
    }


    // Detectar colisão com a comida
    if (snake[0].x == food.x && snake[0].y == food.y) {
        food = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        };
        snake.push({
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
        });
    }
}

    
// Controle da cobra
document.addEventListener("keydown", (event) => {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    else if (event.keyCode == 38 && direction != "down") direction = "up";
    else if (event.keyCode == 39 && direction != "left") direction = "right";
    else if (event.keyCode == 40 && direction != "up") direction = "down";
});

// Loop do jogo
function loop() {
    update();
    draw();
    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 100);
}

// Iniciar o jogo
loop();

// Adicionar um event listener ao botão de reinício
restartButton.addEventListener("click", restartGame);

function handleKeyDown(event) {
    if (event.keyCode == 32 ) {
        restartGame();
    }
}

// Função para reiniciar o jogo
function restartGame() {
    location.reload();
}