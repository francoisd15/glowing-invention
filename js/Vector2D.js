/**
 * Vector2D - A 2D vector class for physics calculations
 */
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Add another vector to this vector
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Subtract another vector from this vector
     */
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Multiply vector by a scalar
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide vector by a scalar
     */
    divide(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    /**
     * Get the magnitude (length) of the vector
     */
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalize the vector (make it unit length)
     */
    normalize() {
        const mag = this.magnitude();
        if (mag > 0) {
            this.divide(mag);
        }
        return this;
    }

    /**
     * Get the dot product with another vector
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calculate distance to another vector
     */
    distanceTo(vector) {
        const dx = vector.x - this.x;
        const dy = vector.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Create a copy of this vector
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Set the vector components
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Static method to create a vector from two points
     */
    static fromPoints(p1, p2) {
        return new Vector2D(p2.x - p1.x, p2.y - p1.y);
    }

    /**
     * Static method to add two vectors
     */
    static add(v1, v2) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Static method to subtract two vectors
     */
    static subtract(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }
}
