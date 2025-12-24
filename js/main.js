/**
 * Main application entry point
 * Initializes the physics simulation and starts the animation loop
 */

// Get canvas element
const canvas = document.getElementById('canvas');

// Initialize modules
const renderer = new Renderer(canvas);
const physicsEngine = new PhysicsEngine(canvas.width, canvas.height);
const uiController = new UIController(physicsEngine, renderer);

// Create initial scene with some objects
function createInitialScene() {
    // Add a few circles at different positions
    const circle1 = new PhysicsObject(200, 100, 'circle');
    const circle2 = new PhysicsObject(400, 150, 'circle');
    const circle3 = new PhysicsObject(600, 100, 'circle');
    
    physicsEngine.addObject(circle1);
    physicsEngine.addObject(circle2);
    physicsEngine.addObject(circle3);
    
    // Add a few boxes
    const box1 = new PhysicsObject(300, 200, 'box');
    const box2 = new PhysicsObject(500, 200, 'box');
    
    physicsEngine.addObject(box1);
    physicsEngine.addObject(box2);
}

// Animation loop
let lastTime = 0;
function animate(currentTime) {
    // Calculate delta time (in case we need it for smooth animation)
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Update physics
    physicsEngine.update();

    // Render scene
    renderer.drawObjects(physicsEngine.objects);

    // Draw spawn preview if mouse is over canvas
    const mousePos = uiController.getMousePosition();
    if (mousePos.x !== null && mousePos.y !== null) {
        renderer.drawSpawnPreview(mousePos.x, mousePos.y, mousePos.type);
    }

    // Continue animation loop
    requestAnimationFrame(animate);
}

// Initialize the simulation
function init() {
    console.log('Physics simulation initialized');
    createInitialScene();
    requestAnimationFrame(animate);
}

// Start the simulation when the page loads
window.addEventListener('load', init);
