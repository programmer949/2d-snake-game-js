const game = {
    box: 20,
    minColumn: 1,
    minRow: 1,
    maxColumn: 20,
    maxRow: 20,
    running: false,
    fps: 8,
};
const snake = {
    x: Math.floor(Math.random() * game.maxColumn) + game.minColumn,
    y: Math.floor(Math.random() * game.maxRow) + game.minRow,
    dx: 0,
    dy: 0,
    direction: null,
};
const food = { x: 11, y: 11 };
const main = document.querySelector("main");
const body = document.body;

const drawSnake = () => {
    const snakeDiv = document.createElement("div");
    snakeDiv.style.gridColumnStart = snake.x;
    snakeDiv.style.gridRowStart = snake.y;
    snakeDiv.className = "snake";
    main.append(snakeDiv);
    const snakeBody = document.querySelectorAll(".snake");
    const snakeHead = snakeBody[0];
    snakeBody.length > 1 ? snakeHead.remove() : null;
};

const moveSnake = () => {
    snake.x += snake.dx;
    snake.y += snake.dy;
};

const collisions = () => {
    if (snake.x > game.maxColumn) return (snake.x = game.minColumn);
    if (snake.y > game.maxRow) return (snake.y = game.minRow);
    if (snake.x < game.minColumn) return (snake.x = game.maxColumn);
    if (snake.y < game.minRow) return (snake.y = game.maxRow);
    const tails = Array.from(document.querySelectorAll(".snake"));
    const headX = tails[0].style.gridColumnStart;
    const headY = tails[0].style.gridRowStart;
    if (
        tails.some((tail, index) => {
            if (index <= 1) return false;
            return (
                headX == tail.style.gridColumnStart &&
                headY == tail.style.gridRowStart
            );
        })
    ) {
        game.over = true;
        setTimeout(() => location.reload(), 300);
    }
    if (
        tails.some(
            (tail) =>
                tail.style.gridColumnStart == food.x &&
                tail.style.gridRowStart == food.y
        )
    ) {
        const tail = document.createElement("div");
        tail.style.gridColumnStart = snake.x;
        tail.style.gridRowStart = snake.y;
        tail.className = "snake";
        main.append(tail);
        const foodDiv = document.querySelector(".food");
        foodDiv ? foodDiv.remove() : null;
        food.x = Math.floor(Math.random() * game.maxColumn) + game.minColumn;
        food.y = Math.floor(Math.random() * game.maxRow) + game.minRow;
        spawnFood();
    }
};

const spawnFood = () => {
    const tails = Array.from(document.querySelectorAll(".snake"));
    if (
        tails.some(
            (tail) =>
                tail.style.gridColumnStart == food.x &&
                tail.style.gridRowStart == food.y
        )
    ) {
        food.x = Math.floor(Math.random() * game.maxColumn) + game.minColumn;
        food.y = Math.floor(Math.random() * game.maxRow) + game.minRow;
    }
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.className = "food";
    main.append(foodElement);
};

const checkGame = () => {
    if (game.over) {
        const badMessageContainer = document.createElement("div");
        const message = document.createElement("h1");
        badMessageContainer.className = "bad-message-container";
        message.innerText = "You Lose";
        message.className = "bad-message";
        badMessageContainer.append(message);
        body.append(badMessageContainer);
    }
};

spawnFood();
drawSnake();

setInterval(() => {
    if (game.running && !game.over) {
        drawSnake();
        moveSnake();
        collisions();
        checkGame();
    }
}, 1000 / game.fps);

window.addEventListener("keydown", (e) => {
    if (
        (e.key.toLowerCase() == "a" || e.key == "ArrowLeft") &&
        snake.direction != "right" &&
        snake.dx >= 0
    ) {
        snake.dy = 0;
        snake.direction = "left";
        snake.dx--;
        !game.running ? (game.running = true) : null;
    }
    if (
        (e.key.toLowerCase() == "w" || e.key == "ArrowUp") &&
        snake.direction != "down" &&
        snake.dy >= 0
    ) {
        snake.dx = 0;
        snake.direction = "up";
        snake.dy--;
        !game.running ? (game.running = true) : null;
    }
    if (
        (e.key.toLowerCase() == "d" || e.key == "ArrowRight") &&
        snake.direction != "left" &&
        snake.dx <= 0
    ) {
        snake.dy = 0;
        snake.direction = "right";
        snake.dx++;
        !game.running ? (game.running = true) : null;
    }
    if (
        (e.key.toLowerCase() == "s" || e.key == "ArrowDown") &&
        snake.direction != "up" &&
        snake.dy <= 0
    ) {
        snake.dx = 0;
        snake.direction = "down";
        snake.dy++;
        !game.running ? (game.running = true) : null;
    }
});
