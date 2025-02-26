javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Stickman properties (same as before)
const stickmanWidth = 20;
const stickmanHeight = 50;
let stickmanX = 50;
let stickmanY = canvas.height - stickmanHeight;
let stickmanDY = 0;
const gravity = 0.5;
let isJumping = false;

// Block properties (same as before)
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stickmanY += stickmanDY;
    if (isJumping) {
        stickmanDY += gravity;
        if (stickmanY + stickmanHeight >= canvas.height) {
            stickmanY = canvas.height - stickmanHeight;
            isJumping = false;
            stickmanDY = 0;
        }
    }

    blockX -= blockSpeed;
    if (blockX < -blockWidth) {
        blockX = canvas.width;
        score += Math.floor(Math.random() * 5) + 1;
        console.log("Score:", score);
    }

    if (stickmanX < blockX + blockWidth &&
        stickmanX + stickmanWidth > blockX &&
        stickmanY < canvas.height - blockHeight &&
        stickmanY + stickmanHeight > canvas.height - blockHeight) {
        console.log("Game Over!");
        cancelAnimationFrame(gameLoop); // *** CORRECTED: Use cancelAnimationFrame ***
    }

    drawStickman();
    drawBlock();
    gameLoop = requestAnimationFrame(updateGame); // Store the requestAnimationFrame ID
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        stickmanDY = -10;
    }
});

let gameLoop;
function startGame() {
    gameLoop = requestAnimationFrame(updateGame);
}

startGame();
