/**
 * PhysicsObject - Represents an object in the physics simulation
 */
class PhysicsObject {
    constructor(x, y, type = 'circle') {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.acceleration = new Vector2D(0, 0);
        this.type = type; // 'circle' or 'box'
        
        // Object properties
        if (type === 'circle') {
            this.radius = 15 + Math.random() * 20; // Random radius between 15-35
            this.mass = this.radius * 0.1; // Mass proportional to radius
        } else {
            this.width = 20 + Math.random() * 40; // Random width between 20-60
            this.height = 20 + Math.random() * 40; // Random height between 20-60
            this.mass = (this.width * this.height) * 0.01; // Mass proportional to area
        }
        
        // Random color
        this.color = this.getRandomColor();
        
        // Physics properties
        this.restitution = 0.7; // Bounciness (0 = no bounce, 1 = perfect bounce)
    }

    /**
     * Generate a random color
     */
    getRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
            '#F8B739', '#52B788', '#E63946', '#457B9D'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Apply a force to the object
     */
    applyForce(force) {
        // F = ma, so a = F/m
        const acceleration = force.clone().divide(this.mass);
        this.acceleration.add(acceleration);
    }

    /**
     * Update the object's physics
     */
    update(deltaTime = 1) {
        // Update velocity based on acceleration
        this.velocity.add(this.acceleration);
        
        // Update position based on velocity
        this.position.add(this.velocity.clone().multiply(deltaTime));
        
        // Reset acceleration for next frame
        this.acceleration.set(0, 0);
    }

    /**
     * Check if this object collides with another object
     */
    collidesWith(other) {
        if (this.type === 'circle' && other.type === 'circle') {
            return this.circleCircleCollision(other);
        } else if (this.type === 'box' && other.type === 'box') {
            return this.boxBoxCollision(other);
        } else {
            return this.circleBoxCollision(this, other);
        }
    }

    /**
     * Circle-circle collision detection
     */
    circleCircleCollision(other) {
        const distance = this.position.distanceTo(other.position);
        return distance < (this.radius + other.radius);
    }

    /**
     * Box-box collision detection (AABB)
     */
    boxBoxCollision(other) {
        return (
            this.position.x < other.position.x + other.width &&
            this.position.x + this.width > other.position.x &&
            this.position.y < other.position.y + other.height &&
            this.position.y + this.height > other.position.y
        );
    }

    /**
     * Circle-box collision detection (simplified)
     */
    circleBoxCollision(circle, box) {
        if (circle.type === 'box' && box.type === 'circle') {
            [circle, box] = [box, circle];
        }
        
        // Find closest point on box to circle center
        const closestX = Math.max(box.position.x, Math.min(circle.position.x, box.position.x + box.width));
        const closestY = Math.max(box.position.y, Math.min(circle.position.y, box.position.y + box.height));
        
        // Calculate distance
        const dx = circle.position.x - closestX;
        const dy = circle.position.y - closestY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circle.radius;
    }

    /**
     * Get bounds for boundary collision
     */
    getBounds() {
        if (this.type === 'circle') {
            return {
                left: this.position.x - this.radius,
                right: this.position.x + this.radius,
                top: this.position.y - this.radius,
                bottom: this.position.y + this.radius
            };
        } else {
            return {
                left: this.position.x,
                right: this.position.x + this.width,
                top: this.position.y,
                bottom: this.position.y + this.height
            };
        }
    }
}
