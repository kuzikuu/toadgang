let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;               // Center position of the bouncing emoji
let vx, vy;             // Velocity of the emoji
let emojiSize = 100;    // Enlarged emoji size (used for both drawing and collision detection)
const cornerThreshold = 5; // Pixel threshold for detecting a corner hit

let tobyImage;          
let scoreboardPositions = []; // Stores positions for scoreboard markers

// Flags to avoid multiple triggers per collision
let wallCollisionTriggered = false;
let cornerCollisionTriggered = false;

// Menu variables
let menuVisible = false;
let menuIconSize = 50;  // Size for the tiny Toby icon

function preload() {
  // Load the image that will be used as the scoreboard marker and for the menu icon
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
  // Clear the canvas completely (no trailing effect)
  background(0);
  
  // Draw all scoreboard markers (toby images) on the canvas
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Draw the menu icon in the top-left corner (and the menu if visible)
  drawMenuIcon();
  if (menuVisible) {
    drawMenu();
  }
  
  // Update the emoji's position
  x += vx;
  y += vy;
  
  // --- Wall Collision Detection & Emoji Cycling ---
  let collided = false;
  
  // Left wall
  if (x - emojiSize / 2 <= 0) {
    vx = abs(vx);
    collided = true;
  }
  // Right wall
  else if (x + emojiSize / 2 >= width) {
    vx = -abs(vx);
    collided = true;
  }
  // Top wall
  if (y - emojiSize / 2 <= 0) {
    vy = abs(vy);
    collided = true;
  }
  // Bottom wall
  else if (y + emojiSize / 2 >= height) {
    vy = -abs(vy);
    collided = true;
  }
  
  // Cycle the emoji if a wall collision occurred (only once per collision)
  if (collided && !wallCollisionTriggered) {
    currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
    wallCollisionTriggered = true;
  }
  if (!collided) {
    wallCollisionTriggered = false;
  }
  
  // --- Corner Collision Detection & Scoreboard Marker ---
  let hitCorner = false;
  
  // Check top-left corner
  if (abs(x - emojiSize / 2) < cornerThreshold && abs(y - emojiSize / 2) < cornerThreshold) {
    hitCorner = true;
  }
  // Check top-right corner
  else if (abs(x + emojiSize / 2 - width) < cornerThreshold && abs(y - emojiSize / 2) < cornerThreshold) {
    hitCorner = true;
  }
  // Check bottom-left corner
  else if (abs(x - emojiSize / 2) < cornerThreshold && abs(y + emojiSize / 2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  // Check bottom-right corner
  else if (abs(x + emojiSize / 2 - width) < cornerThreshold && abs(y + emojiSize / 2 - height) < cornerThreshold) {
    hitCorner = true;
  }
  
  if (hitCorner && !cornerCollisionTriggered) {
    // Place a toby1 image randomly on the canvas as a scoreboard marker
    let randX = random(0, width - tobyImage.width);
    let randY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randX, y: randY });
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

function drawMenuIcon() {
  let iconX = 10;
  let iconY = 10;
  // Draw the tiny Toby icon for the menu
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
  
  // Draw a semi-transparent menu background
  fill(50, 50, 50, 200);
  noStroke();
  rect(menuX, menuY, menuW, menuH, 5);
  
  // Display menu options (you can customize these options as needed)
  fill(255);
  textSize(16);
  text("Load Archive:", menuX + menuW / 2, menuY + 25);
  text("1. Old School VHS", menuX + menuW / 2, menuY + 50);
  text("2. Original Script", menuX + menuW / 2, menuY + 75);
}

function mousePressed() {
  // Toggle the menu when the menu icon is clicked
  let iconX = 10;
  let iconY = 10;
  if (mouseX >= iconX && mouseX <= iconX + menuIconSize &&
      mouseY >= iconY && mouseY <= iconY + menuIconSize) {
    menuVisible = !menuVisible;
  }
}
