let angleX = 1.2; // Initial tilt
let angleZ = 0; // Initial rotation
let numTurns = 8; // Number of spiral loops
let numPoints = 400; // Number of points in the screw
let spiralRadius;
let tubeRadius;
let heightFactor;
let lastMouseX, lastMouseY;
let isDragging = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Adjust sizes dynamically for mobile
  spiralRadius = min(width, height) * 0.35; // Scale based on screen size
  tubeRadius = spiralRadius * 0.06;
  heightFactor = tubeRadius * 0.5;
}

function draw() {
  background(230);
  lights(); // Enables lighting for metallic reflections

  rotateX(PI / angleX); // Adjust viewing angle
  rotateZ(angleZ); // Apply continuous rotation or manual rotation

  // Create metallic shading
  let materialColor = color(50, 100, 200);
  ambientMaterial(materialColor);
  specularMaterial(200); // Enhances reflections

  // Draw the unwinding screw spiral
  for (let i = 0; i < numPoints; i++) {
    let t = map(i, 0, numPoints, 0, TWO_PI * numTurns); // Screw rotation
    let r = spiralRadius - (i / numPoints) * 50; // Taper inward
    let x = r * cos(t);
    let y = r * sin(t);
    let z = (i * heightFactor) - heightFactor * numPoints / 2; // Creates depth

    push();
    translate(x, y, z);
    sphere(tubeRadius); // Small spheres forming the screw
    pop();
  }

  // Gradual auto-rotation
  if (!isDragging) {
    angleZ += 0.01;
  }
}

// 📱 **Touch & Drag to Rotate**
function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  isDragging = true;
}

function mouseDragged() {
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  angleZ += dx * 0.005; // Rotate horizontally
  angleX += dy * 0.01; // Adjust tilt slightly
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  isDragging = false;
}

// 📱 **Resize Canvas for Mobile**
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  spiralRadius = min(width, height) * 0.35;
  tubeRadius = spiralRadius * 0.06;
  heightFactor = tubeRadius * 0.5;
}