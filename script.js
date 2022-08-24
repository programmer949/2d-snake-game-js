const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const body = document.body;
let screen = 400;
class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const snakeBody = [];
let gOver = false;
let box = 20;
let snake = {
    x: Math.floor(Math.random() * box),
    y: Math.floor(Math.random() * box),
    length: 0,
};
let apple = {
    x: Math.floor(Math.random() * box),
    y: Math.floor(Math.random() * box),
};
let velocity = { x: 0, y: 0 };
let score = 0;

const changeSnakePos = () => {
    snake.x = snake.x + velocity.x;
    snake.y = snake.y + velocity.y;
};

const checkGame = () => {
    gOver = false;
    if (velocity.x === 0 && velocity.y === 0) return false;
    else if (snake.x < 0) gOver = true;
    else if (snake.x === box) gOver = true;
    else if (snake.y < 0) gOver = true;
    else if (snake.y === box) gOver = true;
    for (let i = 0; i < snakeBody.length; i++)
        if (snakeBody[i].x === snake.x && snakeBody[i].y === snake.y)
            gOver = true;
    if (gOver) {
        alert("Game Over!");
        if (true) window.location.reload();
    }
};

const clear = () => {
    ctx.clearRect(0, 0, screen, screen);
};

const checkCollisions = () => {
    if (snake.x === apple.x && snake.y === apple.y) {
        apple.x = Math.floor(Math.random() * box);
        apple.y = Math.floor(Math.random() * box);
        snake.length++;
        score++;
    }
};

const drawScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "18px sans-serif";
    ctx.fillText("Score: " + score, 10, 20, 80);
};

const drawApple = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * box, apple.y * box, box, box);
};

const drawSnake = () => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(snake.x * box, snake.y * box, box, box);
    for (let i = 0; i < snakeBody.length; i++)
        ctx.fillRect(snakeBody[i].x * box, snakeBody[i].y * box, box, box);
    snakeBody.push(new Tail(snake.x, snake.y));
    if (snakeBody.length > snake.length) return snakeBody.shift();
    ctx.fillRect(snake.x * box, snake.y * box, box, box);
};

const gameLoop = () => {
    changeSnakePos();
    checkGame();
    if (gOver) return;
    clear();
    checkCollisions();
    drawScore();
    drawApple();
    drawSnake();
    setTimeout(gameLoop, 100);
};

body.addEventListener("keydown", (e) => {
    if (e.keyCode == 37 && velocity.x !== 1) {
        velocity.x = -1;
        velocity.y = 0;
    } else if (e.key == "a" && velocity.x !== 1) {
        velocity.x = -1;
        velocity.y = 0;
    } else if (e.keyCode == 38 && velocity.y !== 1) {
        velocity.y = -1;
        velocity.x = 0;
    } else if (e.key == "w" && velocity.y !== 1) {
        velocity.y = -1;
        velocity.x = 0;
    } else if (e.keyCode == 39 && velocity.x !== -1) {
        velocity.y = 0;
        velocity.x = 1;
    } else if (e.key == "d" && velocity.x !== -1) {
        velocity.y = 0;
        velocity.x = 1;
    } else if (e.keyCode == 40 && velocity.y !== -1) {
        velocity.y = 1;
        velocity.x = 0;
    } else if (e.key == "s" && velocity.y !== -1) {
        velocity.y = 1;
        velocity.x = 0;
    }
});

gameLoop();
