let waves = [];
let numWaves = 5;
let colors = [];
let phase = 0;
let largeCircleSize;
let glowSpots = [];
let sigils = [];
let constellations = [];
let texturePoints = [];
let saveName;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // Generate a unique name for each save
  saveName = generateMysticName();

  // Define colors correctly
  colors = [
    color(10, 10, 30), // Deep dark blue sky
    color(50, 30, 100), // Soft purple gradient
    color(100, 180, 255), // Light blue dream-like waves
    color(180, 220, 255, 150), // Misty highlights
    color(30, 30, 30, 200), // Dark shadow depth
  ];

  largeCircleSize = width * 0.5; // Adjusted for balance

  // Generate abstract color waves
  for (let i = 0; i < numWaves; i++) {
    waves.push(new Wave(i * 0.2, colors[i % colors.length]));
  }

  // Generate all elements
  generateGlows();
  generateCalligraphicSigils();
  generateConstellations();
  generateTexture();
}

function draw() {
  background(10);

  // Gradient transition in the sky
  drawGradientBackground();

  // Textured distortions for depth
  drawTexture();

  // Draw surreal waves
  for (let wave of waves) {
    wave.display();
  }

  // Glowing ethereal elements
  drawGlowingSpots();

  // Foreground circle cutting the background
  drawForegroundCircle();

  // Abstract sacred sigils
  drawSigils();

  // Celestial constellations forming a story
  drawConstellations();

  // Abstract frog presence
  drawFrogBody();

  // Surreal frog eyes gazing up
  drawFrogEyes();

  // Anchoring pond
  drawPond();
}

// 🌊 **Layered Surreal Waves**
class Wave {
  constructor(offset, col) {
    this.offset = offset;
    this.col = col; // Ensure color is correctly assigned
  }

  display() {
    noStroke();
    fill(this.col);
    beginShape();

    for (let x = 0; x <= width; x += 10) {
      let y = map(noise(x * 0.005, this.offset + phase), 0, 1, height * 0.3, height * 0.7);
      vertex(x, y);
    }

    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}

// 🌌 **Gradient Sky**
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(10, 10, 30), color(80, 160, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

// 🔵 **Foreground Circle**
function drawForegroundCircle() {
  push();
  fill(10);
  noStroke();
  ellipse(width / 2, height * 0.6, largeCircleSize);
  pop();
}

// 🐸 **Abstract Frog**
function drawFrogBody() {
  push();
  fill(50, 120, 255, 180);
  noStroke();

  beginShape();
  let bodyCurve = [0.45, 0.6, 0.55, 0.75];
  for (let i = 0; i < bodyCurve.length; i++) {
    let x = width * bodyCurve[i];
    let y = height * (0.5 + i * 0.08);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

// 👀 **Eyes Looking Up**
function drawFrogEyes() {
  push();
  fill(0);
  noStroke();

  let eyeX = width * 0.55;
  let eyeY = height * 0.4;

  ellipse(eyeX, eyeY, 50, 50);
  ellipse(eyeX + 70, eyeY - 20, 50, 50);

  fill(255);
  ellipse(eyeX + 10, eyeY - 10, 20, 20);
  ellipse(eyeX + 80, eyeY - 30, 20, 20);
  pop();
}

// 🔮 **Sacred Calligraphy Sigils**
function generateCalligraphicSigils() {
  for (let i = 0; i < 3; i++) {
    sigils.push({
      x: random(width),
      y: random(height * 0.6),
      length: random(50, 150),
      angle: random(-PI / 3, PI / 3),
      bold: random(2, 5),
    });
  }
}

function drawSigils() {
  push();
  stroke(255, 200);
  strokeWeight(3);

  for (let sigil of sigils) {
    push();
    translate(sigil.x, sigil.y);
    rotate(sigil.angle);
    strokeWeight(sigil.bold);
    line(-sigil.length / 2, 0, sigil.length / 2, 0);
    ellipse(0, 0, 10, 10);
    pop();
  }
  pop();
}

// 🌟 **Constellations**
function generateConstellations() {
  for (let i = 0; i < 4; i++) {
    let points = [];
    for (let j = 0; j < int(random(3, 7)); j++) {
      points.push({ x: random(width), y: random(height * 0.4) });
    }
    constellations.push(points);
  }
}

function drawConstellations() {
  push();
  stroke(200, 200, 255, 150);
  strokeWeight(1.5);

  for (let constellation of constellations) {
    beginShape();
    for (let star of constellation) {
      vertex(star.x, star.y);
      ellipse(star.x, star.y, 5, 5);
    }
    endShape();
  }
  pop();
}

// ✨ **Floating Glows**
function generateGlows() {
  for (let i = 0; i < 4; i++) {
    glowSpots.push({ x: random(width), y: random(height), size: random(40, 100) });
  }
}

function drawGlowingSpots() {
  push();
  noStroke();
  fill(255, 180);
  for (let glow of glowSpots) {
    ellipse(glow.x, glow.y, glow.size);
  }
  pop();
}

// 🌊 **Subtle Texture**
function generateTexture() {
  for (let i = 0; i < 500; i++) {
    texturePoints.push({
      x: random(width),
      y: random(height),
      alpha: random(50, 150),
    });
  }
}

function drawTexture() {
  push();
  noStroke();
  for (let p of texturePoints) {
    fill(255, p.alpha);
    ellipse(p.x, p.y, 2, 2);
  }
  pop();
}

// 🔠 **Unique Save Name**
function generateMysticName() {
  let words1 = ["Astral", "Lunar", "Echo", "Celestial"];
  let words2 = ["Vision", "Sigil", "Mirage", "Frog"];
  let words3 = ["011", "072", "X9", "Gamma"];
  return words1[int(random(words1.length))] + "_" + words2[int(random(words2.length))] + "_" + words3[int(random(words3.length))];
}

// 📸 **Save Unique Image**
function mousePressed() {
  saveCanvas(saveName, 'jpg');
}
