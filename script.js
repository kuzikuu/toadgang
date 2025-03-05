let currentScript = "Art2.js"; // Default to new script
let menuVisible = false;
let menuIconSize = 50; // Menu button size
let tobyImage;

function preload() {
  tobyImage = loadImage('toby1.png'); // Menu button icon
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(0);
  
  // Draw menu icon and menu
  drawMenuIcon();
  if (menuVisible) {
    drawMenu();
  }

  // Display active script text
  fill(255);
  textSize(20);
  text("Active Script: " + currentScript, width / 2, height - 30);
}

function drawMenuIcon() {
  let iconX = 10;
  let iconY = 10;
  image(tobyImage, iconX, iconY, menuIconSize, menuIconSize);
}

function drawMenu() {
  let menuX = 10;
  let menuY = 70;
  let menuW = 220;
  let menuH = 130;
  
  fill(50, 50, 50, 200);
  noStroke();
  rect(menuX, menuY, menuW, menuH, 10);
  
  fill(255);
  textSize(16);
  text("Switch Scripts:", menuX + menuW / 2, menuY + 25);
  text("1. Art1.js (Archive)", menuX + menuW / 2, menuY + 60);
  text("2. Art2.js (Active)", menuX + menuW / 2, menuY + 90);
}

function mousePressed() {
  let iconX = 10;
  let iconY = 10;

  // Toggle menu visibility if the menu icon is clicked
  if (mouseX >= iconX && mouseX <= iconX + menuIconSize &&
      mouseY >= iconY && mouseY <= iconY + menuIconSize) {
    menuVisible = !menuVisible;
    return;
  }

  // Check if user selects an option
  if (menuVisible) {
    if (mouseY > 60 && mouseY < 90) {
      currentScript = "Art1.js"; // Load archived script
    } else if (mouseY > 90 && mouseY < 120) {
      currentScript = "Art2.js"; // Reload main script
    }
    menuVisible = false;
  }
}
