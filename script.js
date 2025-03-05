let currentScript = "Art2.js"; // Default to Art2.js
let menuVisible = false;
let menuWidth = 250; // Width of the menu
let tobyImage;
let scriptLoaded = false; // Prevents multiple loads

function preload() {
  tobyImage = loadImage("toby1.png"); // Load Toby icon
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(16);

  // Load default script only once
  if (!scriptLoaded) {
    loadScript(currentScript);
    scriptLoaded = true;
  }
}

function draw() {
  background(0);

  // Draw menu
  drawMenu();

  // Display active script name
  fill(255);
  textSize(20);
  text("Active Script: " + currentScript, width / 2, height - 30);
}

// 📜 **Slide-out Menu**
function drawMenu() {
  let menuX = menuVisible ? 0 : -menuWidth;

  push();
  fill(30, 30, 30, 220);
  noStroke();
  rect(menuX, 0, menuWidth, height);

  fill(255);
  textSize(18);
  text("🎨 Switch Scripts", menuX + menuWidth / 2, 50);
  textSize(16);
  text("📁 Load Art1.js (Archive)", menuX + menuWidth / 2, 100);
  text("🖌️ Load Art2.js (Main)", menuX + menuWidth / 2, 140);
  text("🌌 Load Art3.js (Experimental)", menuX + menuWidth / 2, 180);
  pop();

  // Draw Toby icon as toggle button
  drawMenuToggle(menuX);
}

// 📜 **Toby Icon Toggle Button**
function drawMenuToggle(menuX) {
  let toggleX = menuX + menuWidth;
  image(tobyImage, toggleX, height / 2 - 25, 50, 50); // Toby icon
}

// 📜 **Handle Clicks**
function mousePressed() {
  let toggleX = (menuVisible ? 0 : -menuWidth) + menuWidth;

  // Toggle menu when clicking the Toby icon
  if (mouseX >= toggleX && mouseX <= toggleX + 50 &&
      mouseY >= height / 2 - 25 && mouseY <= height / 2 + 25) {
    menuVisible = !menuVisible;
    return;
  }

  // Check if user selects a script
  if (menuVisible) {
    if (mouseY > 80 && mouseY < 120) {
      switchScript("Art1.js");
    } else if (mouseY > 120 && mouseY < 160) {
      switchScript("Art2.js");
    } else if (mouseY > 160 && mouseY < 200) {
      switchScript("Art3.js");
    }
    menuVisible = false;
  }
}

// 📜 **Switch Scripts Dynamically & Prevent Double Loads**
function switchScript(newScript) {
  if (currentScript !== newScript) {
    currentScript = newScript;

    let oldScript = document.getElementById("dynamic-script");
    if (oldScript) {
      oldScript.remove();
    }

    loadScript(newScript);
  }
}

// 📜 **Load Script Dynamically**
function loadScript(scriptName) {
  let newScriptTag = document.createElement("script");
  newScriptTag.id = "dynamic-script";
  newScriptTag.src = scriptName;
  newScriptTag.defer = true;
  newScriptTag.onload = () => console.log(`Loaded ${scriptName}`);
  newScriptTag.onerror = () => console.error(`Failed to load ${scriptName}`);
  
  document.body.appendChild(newScriptTag);
}
