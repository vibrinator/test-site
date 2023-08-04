// Constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Snake properties
let snake = [{ x: 10, y: 10 }];
let dx = gridSize;
let dy = 0;
let apple = { x: 15, y: 10 };
let snakeLength = 1;

// Game loop
function main() {
    update();
    draw();
    requestAnimationFrame(main);
}

function update() {
    // Move the snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with apple
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        // Grow the snake
        snakeLength++;
        // Place the apple at a random location
        apple = { x: Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize };
    } else {
        // Remove the last element of the snake to simulate movement
        if (snake.length > snakeLength) {
            snake.pop();
        }
    }

    // Check for collision with boundaries
    if (snake[0].x < 0 || snake[0].x >= canvasWidth || snake[0].y < 0 || snake[0].y >= canvasHeight) {
        endGame();
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            endGame();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the snake
    ctx.fillStyle = "#00FF00";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the apple
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

// Handle keyboard input
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const keyPressed = event.key;
    const isGoingUp = dy === -gridSize;
    const isGoingDown = dy === gridSize;
    const isGoingRight = dx === gridSize;
    const isGoingLeft = dx === -gridSize;

    if (keyPressed === "ArrowUp" && !isGoingDown) {
        dx = 0;
        dy = -gridSize;
    }

    if (keyPressed === "ArrowDown" && !isGoingUp) {
        dx = 0;
        dy = gridSize;
    }

    if (keyPressed === "ArrowLeft" && !isGoingRight) {
        dx = -gridSize;
        dy = 0;
    }

    if (keyPressed === "ArrowRight" && !isGoingLeft) {
        dx = gridSize;
        dy = 0;
    }
}

// Game Over function
function endGame() {
    alert("Game Over!");
    snake = [{ x: 10, y: 10 }];
    dx = gridSize;
    dy = 0;
    apple = { x: 15, y: 10 };
    snakeLength = 1;
}

// Start the game loop
main();
