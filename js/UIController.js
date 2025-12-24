/**
 * UIController - Handles user interface interactions
 */
class UIController {
    constructor(physicsEngine, renderer) {
        this.engine = physicsEngine;
        this.renderer = renderer;
        this.canvas = renderer.canvas;
        this.spawnType = 'circle'; // Default spawn type
        
        this.init();
    }

    /**
     * Initialize UI event listeners
     */
    init() {
        // Gravity slider
        const gravitySlider = document.getElementById('gravity');
        const gravityValue = document.getElementById('gravityValue');
        gravitySlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            gravityValue.textContent = value.toFixed(1);
            this.engine.setGravity(value);
        });

        // Friction slider
        const frictionSlider = document.getElementById('friction');
        const frictionValue = document.getElementById('frictionValue');
        frictionSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            frictionValue.textContent = value.toFixed(2);
            this.engine.setFriction(value);
        });

        // Restitution (bounciness) slider
        const restitutionSlider = document.getElementById('restitution');
        const restitutionValue = document.getElementById('restitutionValue');
        restitutionSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            restitutionValue.textContent = value.toFixed(2);
            this.engine.setRestitution(value);
        });

        // Spawn circle button
        const spawnCircleBtn = document.getElementById('spawnCircle');
        spawnCircleBtn.addEventListener('click', () => {
            this.spawnType = 'circle';
            this.highlightButton(spawnCircleBtn);
        });

        // Spawn box button
        const spawnBoxBtn = document.getElementById('spawnBox');
        spawnBoxBtn.addEventListener('click', () => {
            this.spawnType = 'box';
            this.highlightButton(spawnBoxBtn);
        });

        // Reset button
        const resetBtn = document.getElementById('reset');
        resetBtn.addEventListener('click', () => {
            this.engine.clearObjects();
        });

        // Canvas click event
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.spawnObject(x, y);
        });

        // Canvas hover for preview
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        // Highlight the default spawn button
        this.highlightButton(spawnCircleBtn);
    }

    /**
     * Highlight the active spawn button
     */
    highlightButton(activeBtn) {
        const buttons = [
            document.getElementById('spawnCircle'),
            document.getElementById('spawnBox')
        ];
        
        buttons.forEach(btn => {
            if (btn === activeBtn) {
                btn.style.opacity = '1';
                btn.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.6)';
            } else {
                btn.style.opacity = '0.7';
                btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    /**
     * Spawn an object at the given position
     */
    spawnObject(x, y) {
        const obj = new PhysicsObject(x, y, this.spawnType);
        
        // Adjust position for boxes (center them on click point)
        if (this.spawnType === 'box') {
            obj.position.x -= obj.width / 2;
            obj.position.y -= obj.height / 2;
        }
        
        this.engine.addObject(obj);
    }

    /**
     * Get mouse position for preview
     */
    getMousePosition() {
        return {
            x: this.mouseX,
            y: this.mouseY,
            type: this.spawnType
        };
    }
}
