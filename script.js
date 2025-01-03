let emojiList = ['🔵', '🟧', '🌀', '🍃'];
let currentPalette = 0;
let tobyImage;

function preload() {
  tobyImage = loadImage('toby1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  textSize(100);
  text(emojiList[currentPalette], mouseX, mouseY);
  if (frameCount % 1 === 0) {
    currentPalette = (currentPalette + 1) % emojiList.length;
  }
}

function mousePressed() {
  image(tobyImage, mouseX - tobyImage.width / 2, mouseY - tobyImage.height / 2);
}