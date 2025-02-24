let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;           // Emoji position
let vx, vy;         // Emoji velocity
let diameter = 50;  // Used for text size and collision detection

let tobyImage;      
let scoreboardPositions = []; // Stores positions where the scoreboard markers are placed

// Flags to prevent multiple triggers for the same event
let cornerTriggered = false;   // For corner hits
let collisionTriggered = false;  // For any wall collision
const cornerThreshold = 2;       // Allowable error in pixels for detecting an exact corner

function preload() {
  // Load the image for the scoreboard marker
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(diameter);
  // Start in the center of the canvas
  x = width / 2;
  y = height / 2;
  // Set initial velocities (adjust to control speed/direction)
  vx = 5;
  vy = 3;
}

function draw() {
  // Semi-transparent background creates a VHS-style trailing effect
  background(0, 20);
  
  // Draw all scoreboard markers in the background
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Update emoji position
  x += vx;
  y += vy;
  
  // Check for wall collisions and bounce the emoji:
  let collided = false;
  
  // Bounce off left/right walls
  if (x + diameter/2 >= width || x - diameter/2 <= 0) {
    vx *= -1;
    collided = true;
  }
  // Bounce off top/bottom walls
  if (y + diameter/2 >= height || y - diameter/2 <= 0) {
    vy *= -1;
    collided = true;
  }
  
  // Cycle emoji on collision, but only once per hit:
  if (collided && !collisionTriggered) {
    currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
    collisionTriggered = true;
  }
  if (!collided) {
    collisionTriggered = false;
  }
  
  // Check if the emoji touches any of the four exact corners:
  let hitCorner = false;
  
  // Top-left corner
  if (abs(x - diameter/2) <= cornerThreshold && abs(y - diameter/2) <= cornerThreshold) {
    hitCorner = true;
  }
  // Top-right corner
  else if (abs(x + diameter/2 - width) <= cornerThreshold && abs(y - diameter/2) <= cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-left corner
  else if (abs(x - diameter/2) <= cornerThreshold && abs(y + diameter/2 - height) <= cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-right corner
  else if (abs(x + diameter/2 - width) <= cornerThreshold && abs(y + diameter/2 - height) <= cornerThreshold) {
    hitCorner = true;
  }
  
  if (hitCorner && !cornerTriggered) {
    // Place the toby1 image randomly in the background
    let randomX = random(0, width - tobyImage.width);
    let randomY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randomX, y: randomY });
    cornerTriggered = true;
  }
  if (!hitCorner) {
    cornerTriggered = false;
  }
  
  // Draw the bouncing emoji
  fill(255);
  noStroke();
  text(emojiList[currentEmojiIndex], x, y);
}
