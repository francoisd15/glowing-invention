/**
 * Renderer - Handles drawing objects on the canvas
 */
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    /**
     * Clear the canvas
     */
    clear() {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Draw all objects
     */
    drawObjects(objects) {
        this.clear();
        
        for (let obj of objects) {
            if (obj.type === 'circle') {
                this.drawCircle(obj);
            } else {
                this.drawBox(obj);
            }
        }

        // Draw object count
        this.drawInfo(objects.length);
    }

    /**
     * Draw a circle object
     */
    drawCircle(obj) {
        this.ctx.beginPath();
        this.ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = obj.color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();

        // Draw velocity indicator (small line)
        if (obj.velocity.magnitude() > 0.5) {
            this.ctx.beginPath();
            this.ctx.moveTo(obj.position.x, obj.position.y);
            const endX = obj.position.x + obj.velocity.x * 2;
            const endY = obj.position.y + obj.velocity.y * 2;
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    /**
     * Draw a box object
     */
    drawBox(obj) {
        this.ctx.fillStyle = obj.color;
        this.ctx.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(obj.position.x, obj.position.y, obj.width, obj.height);

        // Draw velocity indicator (small line from center)
        if (obj.velocity.magnitude() > 0.5) {
            const centerX = obj.position.x + obj.width / 2;
            const centerY = obj.position.y + obj.height / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            const endX = centerX + obj.velocity.x * 2;
            const endY = centerY + obj.velocity.y * 2;
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    /**
     * Draw information text
     */
    drawInfo(objectCount) {
        this.ctx.fillStyle = '#333';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Objects: ${objectCount}`, 10, 20);
    }

    /**
     * Draw a spawn preview at mouse position
     */
    drawSpawnPreview(x, y, type, radius = 20) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        
        if (type === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#667eea';
            this.ctx.fill();
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.closePath();
        } else {
            this.ctx.fillStyle = '#667eea';
            this.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
        }
        
        this.ctx.restore();
    }
}
