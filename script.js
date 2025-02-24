let tobyImage;
let posX, posY;
let velX, velY;
let menuVisible = false;
let iconSize = 50;  // Size for the tiny Toby icon

function preload() {
  // Load the main Toby image (used for both the bouncing logo and the icon)
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start roughly in the center of the canvas
  posX = width / 2 - tobyImage.width / 2;
  posY = height / 2 - tobyImage.height / 2;
  // Set initial velocities for the bouncing effect
  velX = 5;
  velY = 3;
}

function draw() {
  // Semi-transparent background for that VHS trail effect
  background(0, 20);
  
  // Update bouncing logo position
  posX += velX;
  posY += velY;
  if (posX <= 0 || posX + tobyImage.width >= width) {
    velX *= -1;
  }
  if (posY <= 0 || posY + tobyImage.height >= height) {
    velY *= -1;
  }
  
  // Draw the bouncing logo
  image(tobyImage, posX, posY);
  
  // Draw the tiny Toby icon in the top-left corner
  drawIcon();
  
  // If the menu is toggled on, display it
  if (menuVisible) {
    drawMenu();
  }
}

function drawIcon() {
  let iconX = 10;
  let iconY = 10;
  // Use the same image scaled down for the icon
  image(tobyImage, iconX, iconY, iconSize, iconSize);
  // Optional: draw a border around the icon
  stroke(255);
  noFill();
  rect(iconX, iconY, iconSize, iconSize);
}

function drawMenu() {
  // Define the menu dimensions and position
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
  text("Load Archive:", menuX + 10, menuY + 25);
  text("1. Old School VHS", menuX + 10, menuY + 50);
  text("2. Original Script", menuX + 10, menuY + 75);
}

function mousePressed() {
  // Check if the user clicks on the tiny icon (top-left corner)
  if (mouseX >= 10 && mouseX <= 10 + iconSize && mouseY >= 10 && mouseY <= 10 + iconSize) {
    menuVisible = !menuVisible; // Toggle the menu on or off
  } else if (menuVisible) {
    // If the menu is visible, check if one of the options is clicked
    let menuX = 10;
    let menuY = 70;
    let menuWidth = 200;
    let optionHeight = 25;
    
    // Ensure the click is within the menu's horizontal bounds
    if (mouseX >= menuX && mouseX <= menuX + menuWidth) {
      // Option 1: "Old School VHS" (assumed clickable region)
      if (mouseY >= menuY + 30 && mouseY < menuY + 30 + optionHeight) {
        loadScript("vhs");
      }
      // Option 2: "Original Script"
      if (mouseY >= menuY + 55 && mouseY < menuY + 55 + optionHeight) {
        loadScript("original");
      }
    }
  }
}

function loadScript(scriptName) {
  // This function can be customized to load a new page or swap the current script.
  // For example, you might use window.location.href to navigate to an archived version.
  if (scriptName === "vhs") {
    // Redirect to the VHS style script page (e.g., vhs.html)
    window.location.href = "vhs.html";
  } else if (scriptName === "original") {
    // Redirect to the archived original script page (e.g., archive.html)
    window.location.href = "archive.html";
  }
  // If desired, you could also dynamically swap canvas sketches instead of a redirect.
}
