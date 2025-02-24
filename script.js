let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;           // Emoji (ball) center position
let vx, vy;         // Emoji (ball) velocity
let diameter = 50;  // Used for text size and collision detection

let tobyImage;      
let scoreboardPositions = []; // Array to store positions where toby1 is placed

// Flags to ensure single event trigger per collision
let wallCollisionTriggered = false;
let cornerCollisionTriggered = false;
const cornerThreshold = 5; // Pixel threshold to detect a corner hit

function preload() {
  // Load the image that will be used for scoreboard markers
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(diameter);
  // Start the emoji at the center of the canvas
  x = width / 2;
  y = height / 2;
  // Set initial velocities
  vx = 5;
  vy = 3;
}

function draw() {
  // Create a VHS-style trailing effect with a semi-transparent background
  background(0, 20);
  
  // Draw all scoreboard markers (toby1 images) in the background
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Update emoji position
  x += vx;
  y += vy;
  
  // --- Wall Collision Detection & Emoji Cycling ---
  let collidedWall = false;
  
  // Check right wall
  if (x + diameter/2 >= width) { 
    vx = -abs(vx);
    collidedWall = true;
  }
  // Check left wall
  if (x - diameter/2 <= 0) {
    vx = abs(vx);
    collidedWall = true;
  }
  // Check bottom wall
  if (y + diameter/2 >= height) {
    vy = -abs(vy);
    collidedWall = true;
  }
  // Check top wall
  if (y - diameter/2 <= 0) {
    vy = abs(vy);
    collidedWall = true;
  }
  
  // Cycle to the next emoji on any wall collision (only once per hit)
  if (collidedWall && !wallCollisionTriggered) {
    currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
    wallCollisionTriggered = true;
  }
  if (!collidedWall) {
    wallCollisionTriggered = false;
  }
  
  // --- Corner Collision Detection & Scoreboard Marker ---
  let hitCorner = false;
  
  // Top-left corner
  if (abs(x - diameter/2) < cornerThreshold && abs(y - diameter/2) < cornerThreshold) {
    hitCorner = true;
  }
  // Top-right corner
  else if (abs(x + diameter/2 - width) < cornerThreshold && abs(y - diameter/2) < cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-left corner
  else if (abs(x - diameter/2) < cornerThreshold && abs(y + diameter/2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-right corner
  else if (abs(x + diameter/2 - width) < cornerThreshold && abs(y + diameter/2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  
  // When a corner hit is detected (and not already triggered), add a new marker
  if (hitCorner && !cornerCollisionTriggered) {
    let randomX = random(0, width - tobyImage.width);
    let randomY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randomX, y: randomY });
    cornerCollisionTriggered = true;
  }
  if (!hitCorner) {
    cornerCollisionTriggered = false;
  }
  
  // --- Draw the bouncing emoji ---
  fill(255);
  noStroke();
  text(emojiList[currentEmojiIndex], x, y);
}
