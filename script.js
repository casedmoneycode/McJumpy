javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Stickman properties
const stickmanWidth = 20;
const stickmanHeight = 50;
let stickmanX = 50;
let stickmanY = canvas.height - stickmanHeight;
let stickmanDY = 0; // Vertical speed
const gravity = 0.5;
let isJumping = false;

// Block properties
const blockWidth = 30;
const blockHeight = 40;
let blockX = canvas.width;
const blockSpeed = 5;

let score = 0;

function drawStickman() {
    ctx.fillStyle = 'black';
    ctx.fillRect(stickmanX, stickmanY, stickmanWidth, stickmanHeight);
}

function drawBlock() {
    ctx.fillStyle = 'red';
    ctx.fillRect(blockX, canvas.height - blockHeight, blockWidth, blockHeight);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Stickman movement
    stickmanY += stickmanDY;
    if (isJumping) {
      stickmanDY += gravity;
      if (stickmanY + stickmanHeight >= canvas.height) {
        stickmanY = canvas.height - stickmanHeight;
        isJumping = false;
        stickmanDY = 0;
      }
    }

    // Block movement
    blockX -= blockSpeed;
    if (blockX < -blockWidth) {
        blockX = canvas.width;
        score += Math.floor(Math.random() * 5) + 1; // Add random points
        console.log("Score:", score);
    }

    // Collision detection
    if (stickmanX < blockX + blockWidth &&
        stickmanX + stickmanWidth > blockX &&
        stickmanY < canvas.height - blockHeight &&
        stickmanY + stickmanHeight > canvas.height - blockHeight) {
        console.log("Game Over!");
        cancelAnimationFrame(gameLoop); // Stop the game loop
    }

    drawStickman();
    drawBlock();
    requestAnimationFrame(updateGame);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        stickmanDY = -10; // Initial jump velocity
    }
});

let gameLoop;
function startGame() {
    gameLoop = requestAnimationFrame(UpdateGame, 30);
}
startGame();
