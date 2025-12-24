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
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw subtle grid
        this.ctx.strokeStyle = '#E1E4E8';
        this.ctx.lineWidth = 0.5;
        const gridSize = 50;
        for (let i = 0; i <= this.width; i += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.height);
            this.ctx.stroke();
        }
        for (let i = 0; i <= this.height; i += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.width, i);
            this.ctx.stroke();
        }
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
        // Draw shadow
        this.ctx.beginPath();
        this.ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.fill();
        
        // Offset shadow for depth
        this.ctx.beginPath();
        this.ctx.arc(obj.position.x + 2, obj.position.y + 2, obj.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        this.ctx.fill();
        
        // Draw circle
        this.ctx.beginPath();
        this.ctx.arc(obj.position.x, obj.position.y, obj.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = obj.color;
        this.ctx.fill();
        
        // Draw border
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw highlight
        this.ctx.beginPath();
        const highlightX = obj.position.x - obj.radius * 0.3;
        const highlightY = obj.position.y - obj.radius * 0.3;
        const highlightRadius = obj.radius * 0.4;
        this.ctx.arc(highlightX, highlightY, highlightRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fill();
        this.ctx.closePath();

        // Draw velocity indicator
        if (obj.velocity.magnitude() > 0.5) {
            this.ctx.beginPath();
            this.ctx.moveTo(obj.position.x, obj.position.y);
            const endX = obj.position.x + obj.velocity.x * 2;
            const endY = obj.position.y + obj.velocity.y * 2;
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = 'rgba(110, 168, 211, 0.6)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Velocity arrow head
            const angle = Math.atan2(obj.velocity.y, obj.velocity.x);
            const arrowSize = 5;
            this.ctx.beginPath();
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
            this.ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
            this.ctx.closePath();
            this.ctx.fillStyle = 'rgba(110, 168, 211, 0.6)';
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    /**
     * Draw a box object
     */
    drawBox(obj) {
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
        
        // Offset shadow for depth
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        this.ctx.fillRect(obj.position.x + 2, obj.position.y + 2, obj.width, obj.height);
        
        // Draw box
        this.ctx.fillStyle = obj.color;
        this.ctx.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
        
        // Draw border
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(obj.position.x, obj.position.y, obj.width, obj.height);
        
        // Draw highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.fillRect(obj.position.x + 2, obj.position.y + 2, obj.width - 4, obj.height * 0.3);

        // Draw velocity indicator
        if (obj.velocity.magnitude() > 0.5) {
            const centerX = obj.position.x + obj.width / 2;
            const centerY = obj.position.y + obj.height / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            const endX = centerX + obj.velocity.x * 2;
            const endY = centerY + obj.velocity.y * 2;
            this.ctx.lineTo(endX, endY);
            this.ctx.strokeStyle = 'rgba(69, 69, 185, 0.6)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Velocity arrow head
            const angle = Math.atan2(obj.velocity.y, obj.velocity.x);
            const arrowSize = 5;
            this.ctx.beginPath();
            this.ctx.moveTo(endX, endY);
            this.ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6));
            this.ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6));
            this.ctx.closePath();
            this.ctx.fillStyle = 'rgba(69, 69, 185, 0.6)';
            this.ctx.fill();
            this.ctx.closePath();
        }
    }

    /**
     * Draw information text
     */
    drawInfo(objectCount) {
        // Semi-transparent background for info box
        this.ctx.fillStyle = 'rgba(28, 33, 40, 0.8)';
        this.ctx.strokeStyle = 'rgba(110, 168, 211, 0.5)';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(8, 8, 160, 40);
        this.ctx.strokeRect(8, 8, 160, 40);
        
        // Text
        this.ctx.fillStyle = '#6EA8D3';
        this.ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        this.ctx.fillText(`Objects: ${objectCount}`, 16, 30);
        
        this.ctx.fillStyle = '#9EC99E';
        this.ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        this.ctx.fillText('Click to spawn', 16, 44);
    }

    /**
     * Draw a spawn preview at mouse position
     */
    drawSpawnPreview(x, y, type, radius = 20) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.6;
        
        if (type === 'circle') {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Preview circle
            this.ctx.fillStyle = '#6EA8D3';
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.strokeStyle = 'rgba(11, 83, 170, 0.7)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        } else {
            // Shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            
            // Preview box
            this.ctx.fillStyle = '#4545B9';
            this.ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            this.ctx.strokeStyle = 'rgba(69, 69, 185, 0.7)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
        }
        
        this.ctx.restore();
    }
}
