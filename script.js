let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;            // Center position of the bouncing emoji
let vx, vy;          // Velocity of the emoji
let emojiSize = 100; // Enlarged emoji size (also used for collision detection)

let tobyImage;
let scoreboardPositions = []; // Positions where toby1 images are placed

// Flags to avoid multiple triggers per collision
let wallCollisionTriggered = false;
let cornerCollisionTriggered = false;
const cornerThreshold = 5; // Pixel threshold for corner detection

// Menu variables
let menuVisible = false;
let iconSize = 50; // Size for the tiny Toby icon

function preload() {
  // Load the image for scoreboard markers and the menu icon
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(emojiSize);
  // Start the bouncing emoji at the center of the canvas
  x = width / 2;
  y = height / 2;
  // Set initial velocities
  vx = 5;
  vy = 3;
}

function draw() {
  // Remove the trailing effect by fully clearing the canvas each frame
  background(0);
  
  // Draw the scoreboard markers (toby1 images) in the background
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Draw the menu Toby icon and the menu if toggled visible
  drawIcon();
  if (menuVisible) {
    drawMenu();
  }
  
  // Update emoji position
  x += vx;
  y += vy;
  
  // --- Wall Collision Detection & Emoji Cycling ---
  let collidedWall = false;
  
  // Check right wall
  if (x + emojiSize / 2 >= width) {
    vx = -abs(vx);
    collidedWall = true;
  }
  // Check left wall
  if (x - emojiSize / 2 <= 0) {
    vx = abs(vx);
    collidedWall = true;
  }
  // Check bottom wall
  if (y + emojiSize / 2 >= height) {
    vy = -abs(vy);
    collidedWall = true;
  }
  // Check top wall
  if (y - emojiSize / 2 <= 0) {
    vy = abs(vy);
    collidedWall = true;
  }
  
  // Cycle the emoji on any wall collision (only once per hit)
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
  if (abs(x - emojiSize / 2) < cornerThreshold && abs(y - emojiSize / 2) < cornerThreshold) {
    hitCorner = true;
  }
  // Top-right corner
  else if (abs(x + emojiSize / 2 - width) < cornerThreshold && abs(y - emojiSize / 2) < cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-left corner
  else if (abs(x - emojiSize / 2) < cornerThreshold && abs(y + emojiSize / 2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  // Bottom-right corner
  else if (abs(x + emojiSize / 2 - width) < cornerThreshold && abs(y + emojiSize / 2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  
  // If a corner is hit (and not already triggered), add a new scoreboard marker
  if (hitCorner && !cornerCollisionTriggered) {
    let randomX = random(0, width - tobyImage.width);
    let randomY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randomX, y: randomY });
    cornerCollisionTriggered = true;
  }
  if (!hitCorner) {
    cornerCollisionTriggered = false;
  }
  
  // --- Draw the Bouncing Emoji ---
  fill(255);
  noStroke();
  text(emojiList[currentEmojiIndex], x, y);
}

function drawIcon() {
  let iconX = 10;
  let iconY = 10;
  // Draw the tiny Toby icon in the top-left corner
  image(tobyImage, iconX, iconY, iconSize, iconSize);
  stroke(255);
  noFill();
  rect(iconX, iconY, iconSize, iconSize);
}

function drawMenu() {
  // Define menu dimensions and position
  let menuX = 10;
  let menuY = 70;
  let menuWidth = 200;
  let menuHeight = 100;
  
  // Draw a semi-transparent background for the menu
  fill(50, 50, 50, 200);
  noStroke();
  rect(menuX, menuY, menuWidth, menuHeight, 5);
  
  // Display menu text options
  fill(255);
  textSize(16);
  text("Load Archive:", menuX + menuWidth / 2, menuY + 25);
  text("1. Old School VHS", menuX + menuWidth / 2, menuY + 50);
  text("2. Original Script", menuX + menuWidth / 2, menuY + 75);
}

function mousePressed() {
  // If the tiny Toby icon is clicked, toggle the menu
  let iconX = 10;
  let iconY = 10;
  if (mouseX >= iconX && mouseX <= iconX + iconSize && mouseY >= iconY && mouseY <= iconY + iconSize) {
    menuVisible = !menuVisible;
  }
}
