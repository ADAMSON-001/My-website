// Pong Game Implementation in JavaScript

// Setup the canvas
const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Game settings
const paddleWidth = 10, paddleHeight = 100, ballSize = 10;
let player1Score = 0, player2Score = 0;

// Paddle positions
const player1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2 };  
const player2 = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };  

// Ball position and velocity
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 4,
    dx: 4,
    dy: 4
};

// Control variables for paddles
let upPressed = false, downPressed = false;

// Function to draw paddles and ball
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw Player 1 paddle
    context.fillStyle = '#FFF';
    context.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    // Draw Player 2 paddle
    context.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);
    // Draw ball
    context.beginPath();
    context.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    context.fill();
}

// Function to update game state
function update() {
    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top/bottom walls
    if (ball.y + ballSize > canvas.height || ball.y - ballSize < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (ball.x < player1.x + paddleWidth && ball.y > player1.y && ball.y < player1.y + paddleHeight ||
        ball.x > player2.x - ballSize && ball.y > player2.y && ball.y < player2.y + paddleHeight) {
        ball.dx *= -1;
    }

    // AI for Player 2
    if (ball.y > player2.y + paddleHeight / 2) {
        player2.y += 4;
    } else {
        player2.y -= 4;
    }

    // Score update
    if (ball.x + ballSize < 0) {
        player2Score++;
        resetBall();
    }
    if (ball.x - ballSize > canvas.width) {
        player1Score++;
        resetBall();
    }
}

// Function to reset ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() < 0.5 ? 1 : -1);
    ball.dy = 4 * (Math.random() < 0.5 ? 1 : -1);
}

// Function to handle keydown events
function keyDownHandler(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    }
    if (event.key === 'ArrowDown') {
        downPressed = true;
    }
}

// Function to handle keyup events
function keyUpHandler(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    }
    if (event.key === 'ArrowDown') {
        downPressed = false;
    }
}

// Update player1 paddle based on mouse
canvas.addEventListener('mousemove', (event) => {
    let relativeY = event.clientY - canvas.getBoundingClientRect().top;
    if (relativeY > 0 && relativeY < canvas.height) {
        player1.y = relativeY - paddleHeight / 2;
    }
});

// Main game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Event listeners for keyboard
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Start the game loop
requestAnimationFrame(gameLoop);