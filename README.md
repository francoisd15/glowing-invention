# Interactive Physics Simulation

An interactive physics simulation demo built with HTML5 Canvas and JavaScript, demonstrating gravity, friction, and collision physics.

![Physics Simulation Demo](https://github.com/user-attachments/assets/0d4191c3-284a-485b-bde5-52378da5253f)

## Features

### Real-Time Physics Simulation
- **Gravity** - Objects fall with realistic acceleration
- **Friction** - Air and ground friction for natural movement
- **Collisions** - Elastic collisions between objects with impulse-based physics
- **Boundaries** - Objects bounce off walls and floor

### Interactive Controls
- **Gravity Slider** (0-2) - Adjust the strength of gravitational pull
- **Friction Slider** (0.8-1) - Control air resistance and damping
- **Bounciness Slider** (0-1) - Set object elasticity/restitution
- **Spawn Buttons** - Choose to spawn circles or boxes
- **Click to Spawn** - Click anywhere on canvas to create objects
- **Reset Button** - Clear all objects from the scene

### Object Types
- **Circles** - Random sizes with collision detection
- **Boxes** - Random rectangular shapes
- Each object has a unique color and mass proportional to its size

## How to Use

1. **Open the simulation**
   ```bash
   # Simply open index.html in your web browser
   # Or use a local server:
   python3 -m http.server 8000
   # Then navigate to http://localhost:8000
   ```

2. **Interact with the simulation**
   - Click on the canvas to spawn objects at your mouse position
   - Use the "Spawn Circle" or "Spawn Box" buttons to select object type
   - Adjust the sliders to change physics parameters in real-time
   - Watch objects fall, bounce, and collide
   - Click "Reset Scene" to start fresh

## Deployment (GitHub Pages)

The project is a static site and can be deployed automatically:

1. In your repository settings, under **Pages**, select **Source: GitHub Actions**.
2. The included workflow `.github/workflows/deploy.yml` publishes the site on every push to `main`.
3. Once the workflow finishes, GitHub provides a public URL (also shown in the workflow output) where the simulation is live.

## Code Architecture

The simulation is built with clean, modular JavaScript:

- **`Vector2D.js`** - 2D vector mathematics for physics calculations
- **`PhysicsObject.js`** - Object class supporting circles and boxes
- **`PhysicsEngine.js`** - Core physics simulation engine
  - Gravity application
  - Friction/damping
  - Collision detection and response
  - Boundary checking
- **`Renderer.js`** - Canvas rendering system
  - Object drawing
  - Velocity indicators
  - UI overlays
- **`UIController.js`** - User interface and input handling
  - Slider controls
  - Button interactions
  - Canvas click events
- **`main.js`** - Application entry point and animation loop

## Physics Implementation

### Gravity
Objects experience constant downward acceleration based on their mass:
```javascript
gravityForce = new Vector2D(0, gravity * mass)
```

### Friction
Velocity is reduced each frame to simulate air resistance:
```javascript
velocity *= friction  // friction typically 0.98
```

### Collisions
Impulse-based collision resolution between objects:
- Detects overlaps between circles, boxes, and circle-box combinations
- Calculates collision normal and relative velocity
- Applies impulse to separate objects and reverse velocities
- Accounts for object masses and restitution (bounciness)

### Boundaries
Objects bounce off the canvas edges with configurable restitution. Ground friction is applied when objects are resting on the floor.

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript (classes, arrow functions)
- requestAnimationFrame

## License

Open source - feel free to use and modify!
