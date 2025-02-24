let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentEmojiIndex = 0;

let x, y;             // Center position of the bouncing emoji
let vx, vy;           // Velocity
let emojiSize = 150;  // Big emoji size for better visibility and higher chance of corner hits

let cornerCounter = 0;  // Count of exact corner hits
let cornerHitFlag = false;  // Prevent multiple counts for one collision

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(emojiSize);
  // Start at the top-left corner (so you immediately register a hit)
  x = emojiSize / 2;
  y = emojiSize / 2;
  // Set diagonal velocity
  vx = 5;
  vy = 5;
}

function draw() {
  // Clear background fully (no trailing effect)
  background(0);

  // Draw the corner hit counter at the top center
  fill(255);
  textSize(32);
  text("Corner Hits: " + cornerCounter, width / 2, 40);
  
  // Reset text size for the emoji
  textSize(emojiSize);
  
  // Draw the bouncing emoji
  fill(255);
  text(emojiList[currentEmojiIndex], x, y);
  
  // Update position
  x += vx;
  y += vy;
  
  // --- Wall Collision & Emoji Cycling ---
  // Check left wall
  if (x - emojiSize / 2 <= 0) {
    x = emojiSize / 2;  // Force exact collision
    vx = abs(vx);       // Bounce to the right
    cycleEmoji();
  }
  // Check right wall
  if (x + emojiSize / 2 >= width) {
    x = width - emojiSize / 2;  // Force exact collision
    vx = -abs(vx);              // Bounce to the left
    cycleEmoji();
  }
  // Check top wall
  if (y - emojiSize / 2 <= 0) {
    y = emojiSize / 2;  // Force exact collision
    vy = abs(vy);       // Bounce downward
    cycleEmoji();
  }
  // Check bottom wall
  if (y + emojiSize / 2 >= height) {
    y = height - emojiSize / 2; // Force exact collision
    vy = -abs(vy);              // Bounce upward
    cycleEmoji();
  }
  
  // --- Exact Corner Detection ---
  // Determine if the emoji is exactly touching a corner:
  let atLeft = (x - emojiSize / 2 === 0);
  let atRight = (x + emojiSize / 2 === width);
  let atTop = (y - emojiSize / 2 === 0);
  let atBottom = (y + emojiSize / 2 === height);
  
  let isCorner = ( (atLeft && atTop) || (atLeft && atBottom) ||
                   (atRight && atTop) || (atRight && atBottom) );
  
  if (isCorner && !cornerHitFlag) {
    cornerCounter++;
    cornerHitFlag = true;
  }
  if (!isCorner) {
    cornerHitFlag = false;
  }
}

function cycleEmoji() {
  currentEmojiIndex = (currentEmojiIndex + 1) % emojiList.length;
}
