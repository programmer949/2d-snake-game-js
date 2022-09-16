const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const body = document.body;
const game = {
    box: 20,
    size: 400,
    gOver: false,
    clear: () => ctx.clearRect(0, 0, game.size, game.size),
    collisions: () => {
        if (snake.tails[0].x === apple.x && snake.tails[0].y === apple.y) {
            (apple.x = Math.floor(Math.random() * game.box)),
                (apple.y = Math.floor(Math.random() * game.box));
            snake.tailCount++;
        }
        for (let j = 3; j < snake.tails.length; j++)
            if (
                snake.tailCount > 0 &&
                snake.tails[0].x === snake.tails[j].x &&
                snake.tails[0].y === snake.tails[j].y
            )
                game.gOver = true;
    },
};
const snake = {
    tails: [],
    tailCount: 0,
    speedX: 0,
    speedY: 0,
    draw: () => {
        if (
            parseInt(snake.tails[0].x) < 0 ||
            parseInt(snake.tails[0].x) === game.box ||
            parseInt(snake.tails[0].y) < 0 ||
            parseInt(snake.tails[0].y) === game.box
        )
            return (game.gOver = true);
        parseInt((snake.tails[0].x += snake.speedX));
        parseInt((snake.tails[0].y += snake.speedY));

        ctx.fillStyle = "lime";
        for (let i = 0; i < snake.tails.length; i++)
            ctx.fillRect(
                snake.tails[i].x * game.box,
                snake.tails[i].y * game.box,
                game.box,
                game.box
            );
        snake.tails.unshift({ x: snake.tails[0].x, y: snake.tails[0].y });
        if (snake.tails.length - 1 > snake.tailCount) return snake.tails.pop();
    },
};
const apple = {
    x: Math.floor(Math.random() * game.box),
    y: Math.floor(Math.random() * game.box),
    draw: () => {
        ctx.fillStyle = "red";
        ctx.fillRect(
            apple.x * game.box,
            apple.y * game.box,
            game.box,
            game.box
        );
    },
};

const score = {
    color: "white",
    font: "18px sans-serif",
    draw: () => {
        ctx.fillStyle = score.color;
        ctx.font = score.font;
        ctx.fillText("Score: " + snake.tailCount, 10, 20, 80);
    },
};

snake.tails[0] = {
    x: Math.floor(Math.random() * game.box),
    y: Math.floor(Math.random() * game.box),
};

body.addEventListener("keydown", (e) => {
    if (e.keyCode == 37 && snake.speedX !== 1) {
        snake.speedY = 0;
        snake.speedX = -1;
    } else if (e.key == "a" && snake.speedX !== 1) {
        snake.speedY = 0;
        snake.speedX = -1;
    } else if (e.keyCode == 38 && snake.speedY !== 1) {
        snake.speedX = 0;
        snake.speedY = -1;
    } else if (e.key == "w" && snake.speedY !== 1) {
        snake.speedX = 0;
        snake.speedY = -1;
    } else if (e.keyCode == 39 && snake.speedX !== -1) {
        snake.speedY = 0;
        snake.speedX = 1;
    } else if (e.key == "d" && snake.speedX !== -1) {
        snake.speedX = 1;
        snake.speedY = 0;
    } else if (e.keyCode == 40 && snake.speedY !== -1) {
        snake.speedY = 1;
        snake.speedX = 0;
    } else if (e.key == "s" && snake.speedY !== -1) {
        snake.speedX = 0;
        snake.speedY = 1;
    }
});

const gLoop = () => {
    if (!game.gOver) {
        game.clear();
        game.collisions();
        apple.draw();
        snake.draw();
        score.draw();
    } else {
        alert("Game Over!");
        if (true) window.location.reload();
    }
    setTimeout(gLoop, 120);
};

gLoop();
