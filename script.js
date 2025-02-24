let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;           // Ball (emoji) position
let vx, vy;         // Ball velocity
let diameter = 50;  // Used for text size and collision detection

let tobyImage;      
let scoreboardPositions = []; // Array to store positions for scoreboard markers

let cornerTriggered = false;  // Prevent multiple triggers for the same hit
const cornerThreshold = 2;    // Allowable error in pixels for detecting an exact corner

function preload() {
  // Load the image that will be used as the scoreboard marker
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(diameter);
  // Start the ball in the center of the canvas
  x = width / 2;
  y = height / 2;
  // Initial velocities (adjust for speed/direction)
  vx = 5;
  vy = 3;
}

function draw() {
  // Create a VHS trail effect with a semi-transparent background
  background(0, 20);
  
  // Draw all the scoreboard markers (toby1 images) in the background
  for (let pos of scoreboardPositions) {
    image(tobyImage, pos.x, pos.y);
  }
  
  // Update ball position
  x += vx;
  y += vy;
  
  // Bounce off the left/right walls
  if (x + diameter/2 >= width || x - diameter/2 <= 0) {
    vx *= -1;
  }
  // Bounce off the top/bottom walls
  if (y + diameter/2 >= height || y - diameter/2 <= 0) {
    vy *= -1;
  }
  
  // Check if the ball is touching one of the four corners.
  // We check the ball’s edge positions against the canvas edges.
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
  
  // If a corner hit is detected (and not already triggered for this hit)
  if (hitCorner && !cornerTriggered) {
    // Randomly determine where to place the toby1 image in the background
    let randomX = random(0, width - tobyImage.width);
    let randomY = random(0, height - tobyImage.height);
    scoreboardPositions.push({ x: randomX, y: randomY });
    cornerTriggered = true;
  }
  
  // Reset the corner trigger once the ball is no longer in a corner region
  if (!hitCorner) {
    cornerTriggered = false;
  }
  
  // Draw the bouncing ball as an emoji
  fill(255);
  noStroke();
  text(emojiList[currentEmojiIndex], x, y);
  
  // Cycle to the next emoji for a dynamic effect
  currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
}
