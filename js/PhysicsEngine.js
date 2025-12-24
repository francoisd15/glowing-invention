/**
 * PhysicsEngine - Handles physics simulation including gravity, friction, and collisions
 */
class PhysicsEngine {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.objects = [];
        
        // Physics parameters
        this.gravity = 0.5;
        this.friction = 0.98;
        this.restitution = 0.7; // Default bounciness for all objects
    }

    /**
     * Add an object to the simulation
     */
    addObject(obj) {
        obj.restitution = this.restitution;
        this.objects.push(obj);
    }

    /**
     * Remove all objects from the simulation
     */
    clearObjects() {
        this.objects = [];
    }

    /**
     * Update all objects in the simulation
     */
    update() {
        // Apply forces to all objects
        for (let obj of this.objects) {
            // Apply gravity
            const gravityForce = new Vector2D(0, this.gravity * obj.mass);
            obj.applyForce(gravityForce);
            
            // Update object physics
            obj.update();
            
            // Apply friction (damping)
            obj.velocity.multiply(this.friction);
        }

        // Check for collisions
        this.handleCollisions();

        // Check boundary collisions
        this.handleBoundaryCollisions();
    }

    /**
     * Handle collisions between objects
     */
    handleCollisions() {
        // Check each pair of objects
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const obj1 = this.objects[i];
                const obj2 = this.objects[j];

                if (obj1.collidesWith(obj2)) {
                    this.resolveCollision(obj1, obj2);
                }
            }
        }
    }

    /**
     * Resolve collision between two objects
     */
    resolveCollision(obj1, obj2) {
        // Calculate collision normal
        const normal = Vector2D.subtract(obj2.position, obj1.position);
        const distance = normal.magnitude();
        
        if (distance === 0) return; // Prevent division by zero
        
        normal.normalize();

        // Calculate relative velocity
        const relativeVelocity = Vector2D.subtract(obj2.velocity, obj1.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);

        // Don't resolve if objects are moving apart
        if (velocityAlongNormal > 0) return;

        // Calculate restitution (bounciness)
        const restitution = Math.min(obj1.restitution, obj2.restitution);

        // Calculate impulse scalar
        const impulseScalar = -(1 + restitution) * velocityAlongNormal;
        const totalMass = obj1.mass + obj2.mass;
        const impulse = impulseScalar / totalMass;

        // Apply impulse to objects
        const impulseVector = normal.clone().multiply(impulse);
        obj1.velocity.subtract(impulseVector.clone().multiply(obj2.mass));
        obj2.velocity.add(impulseVector.clone().multiply(obj1.mass));

        // Separate overlapping objects
        const overlap = this.calculateOverlap(obj1, obj2);
        if (overlap > 0) {
            const separation = normal.clone().multiply(overlap * 0.5);
            obj1.position.subtract(separation.clone());
            obj2.position.add(separation);
        }
    }

    /**
     * Calculate overlap between two objects
     */
    calculateOverlap(obj1, obj2) {
        if (obj1.type === 'circle' && obj2.type === 'circle') {
            const distance = obj1.position.distanceTo(obj2.position);
            return (obj1.radius + obj2.radius) - distance;
        } else if (obj1.type === 'box' && obj2.type === 'box') {
            const dx = Math.abs(obj1.position.x - obj2.position.x);
            const dy = Math.abs(obj1.position.y - obj2.position.y);
            const overlapX = (obj1.width + obj2.width) / 2 - dx;
            const overlapY = (obj1.height + obj2.height) / 2 - dy;
            return Math.min(overlapX, overlapY);
        } else {
            // Simplified overlap for mixed types
            return 1;
        }
    }

    /**
     * Handle collisions with boundaries (walls)
     */
    handleBoundaryCollisions() {
        for (let obj of this.objects) {
            const bounds = obj.getBounds();

            // Left wall
            if (bounds.left < 0) {
                if (obj.type === 'circle') {
                    obj.position.x = obj.radius;
                } else {
                    obj.position.x = 0;
                }
                obj.velocity.x *= -obj.restitution;
            }

            // Right wall
            if (bounds.right > this.width) {
                if (obj.type === 'circle') {
                    obj.position.x = this.width - obj.radius;
                } else {
                    obj.position.x = this.width - obj.width;
                }
                obj.velocity.x *= -obj.restitution;
            }

            // Top wall
            if (bounds.top < 0) {
                if (obj.type === 'circle') {
                    obj.position.y = obj.radius;
                } else {
                    obj.position.y = 0;
                }
                obj.velocity.y *= -obj.restitution;
            }

            // Bottom wall (floor)
            if (bounds.bottom > this.height) {
                if (obj.type === 'circle') {
                    obj.position.y = this.height - obj.radius;
                } else {
                    obj.position.y = this.height - obj.height;
                }
                obj.velocity.y *= -obj.restitution;
                
                // Apply extra friction when on the ground
                if (Math.abs(obj.velocity.y) < 0.5) {
                    obj.velocity.y = 0;
                    obj.velocity.x *= 0.95; // Ground friction
                }
            }
        }
    }

    /**
     * Update physics parameters
     */
    setGravity(gravity) {
        this.gravity = gravity;
    }

    setFriction(friction) {
        this.friction = friction;
    }

    setRestitution(restitution) {
        this.restitution = restitution;
        // Update all existing objects
        for (let obj of this.objects) {
            obj.restitution = restitution;
        }
    }
}
