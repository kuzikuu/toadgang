let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;           // Emoji center position
let vx, vy;         // Emoji velocity
let diameter = 150; // Large emoji size for better visibility & higher chance of corner hits

let tobyImage;      
let scoreboardPositions = []; // Where scoreboard markers (toby1) are placed

// Flags to prevent multiple triggers per event
let cornerTriggered = false;
let collisionTriggered = false;
const cornerThreshold = 10;  // Loosened tolerance for detecting a corner hit (in pixels)

// Menu variables
let menuVisible = false;
let menuIconSize = 50;  // Size for the tiny Toby icon (menu button)

function preload() {
  // Load the image for the scoreboard marker and menu icon
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(diameter);
  // Start in the center of the canvas
  x = width / 2;
  y = height / 2;
  // Set initial velocities
  vx = 5;
  vy = 3;
}

function draw() {
  // Clear the canvas completely (no trailing effect)
  background(0);
  
  // Draw scoreboard markers (toby1 images) that have been placed
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Draw the menu icon in the top-left corner and, if active, the menu options
  drawMenuIcon();
  if (menuVisible) {
    drawMenu();
  }
  
  // Update emoji position
  x += vx;
  y += vy;
  
  // --- Wall Collision & Emoji Cycling ---
  let collided = false;
  
  // Bounce off left/right walls
  if (x + diameter / 2 >= width || x - diameter / 2 <= 0) {
    vx *= -1;
    collided = true;
  }
  // Bounce off top/bottom walls
  if (y + diameter / 2 >= height || y - diameter / 2 <= 0) {
    vy *= -1;
    collided = true;
  }
  
  // Cycle emoji on collision (only once per hit)
  if (collided && !collisionTriggered) {
    currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
    collisionTriggered = true;
  }
  if (!collided) {
    collisionTriggered = false;
  }
  
  // --- Corner Detection & Scoreboard Marker ---
  let hitCorner = false;
  
  // Top-left corner
  if (abs(x - diameter / 2) <= cornerThreshold && abs(y - diameter / 2) <= cornerThreshold) {
    hitCorner = true;
  }
  // Top-right corner
  else if (abs(x + diameter / 2 - width) <= cornerThreshold && abs(y - diameter / 2) <= cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-left corner
  else if (abs(x - diameter / 2) <= cornerThreshold && abs(y + diameter / 2 - height) <= cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-right corner
  else if (abs(x + diameter / 2 - width) <= cornerThreshold && abs(y + diameter / 2 - height) <= cornerThreshold) {
    hitCorner = true;
  }
  
  if (hitCorner && !cornerTriggered) {
    // Place the toby1 image randomly on the canvas as a scoreboard marker
    let randomX = random(0, width - tobyImage.width);
    let randomY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randomX, y: randomY });
    cornerTriggered = true;
  }
  if (!hitCorner) {
    cornerTriggered = false;
  }
  
  // --- Draw the bouncing emoji ---
  fill(255);
  noStroke();
  text(emojiList[currentEmojiIndex], x, y);
}

function drawMenuIcon() {
  let iconX = 10;
  let iconY = 10;
  // Draw a tiny Toby image as the menu button
  image(tobyImage, iconX, iconY, menuIconSize, menuIconSize);
  stroke(255);
  noFill();
  rect(iconX, iconY, menuIconSize, menuIconSize);
}

function drawMenu() {
  let menuX = 10;
  let menuY = 70;
  let menuW = 200;
  let menuH = 100;
  
  fill(50, 50, 50, 200);
  noStroke();
  rect(menuX, menuY, menuW, menuH, 5);
  
  fill(255);
  textSize(16);
  text("Load Archive:", menuX + menuW / 2, menuY + 25);
  text("1. Old School VHS", menuX + menuW / 2, menuY + 50);
  text("2. Original Script", menuX + menuW / 2, menuY + 75);
}

function mousePressed() {
  // Toggle menu visibility if the menu icon is clicked
  let iconX = 10;
  let iconY = 10;
  if (mouseX >= iconX && mouseX <= iconX + menuIconSize &&
      mouseY >= iconY && mouseY <= iconY + menuIconSize) {
    menuVisible = !menuVisible;
  }
}
