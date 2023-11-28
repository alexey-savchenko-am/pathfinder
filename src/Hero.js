import { GameObject } from "./GameObject.js";
import { Vector2D } from "./Vector2D.js";
import { Animation } from "./animation/Animation.js";
import { 
    stayPattern,
    walkDownPattern, 
    walkUpPattern, 
    walkLeftPattern, 
    walkRightPattern 
} from "./animation/animationPatterns.js";



const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
  };

export class Hero extends GameObject {

    constructor(sprite, position, width, height) {
        super(position, width, height);
        this._destinationQueue = [];
        this._isMoving = false;
        this._sprite = sprite;
        this._animation = new Animation(sprite, stayPattern);
    }

    moveToTile(vector) {
        this.moveTo(vector.getCol * this._tileSize, vector.getRow * this._tileSize);
    } 

    moveTo(x, y) {
        this._isMoving = true;

        x = Math.floor(x / this._tileSize) * this._tileSize;
        y = Math.floor(y / this._tileSize) * this._tileSize;

        const lastDestination = this._destinationQueue.length > 0 
            ? this._destinationQueue[this._destinationQueue.length - 1]
            : {x : this._x, y: this._y};

        const delta = this.getDelta(lastDestination.x, lastDestination.y, x, y);

        const angle = Math.atan2(delta.dy, delta.dx);
        
        const direction = this.radiansToDirection(angle);
     
        this._destinationQueue.push({ x, y, angle, direction });      
    }


     radiansToDirection(radians) {
        var degrees = radians * (180 / Math.PI);

        if (degrees >= -45 && degrees < 45) {
            return Direction.RIGHT;
        } else if (degrees >= 45 && degrees < 135) {
            return Direction.DOWN;
        } else if ((degrees >= 135 && degrees <= 180) || (degrees >= -180 && degrees < -135)) {
            return Direction.LEFT;
        } else if (degrees >= -135 && degrees < -45) {
            return Direction.UP;
        }
    }
    


    frame(timestamp) {

        this._animation.update(timestamp);

        if(this._destinationQueue.length === 0) {
            this._animation.setAnimationPattern(stayPattern);
            return;
        }

        let destination = this._destinationQueue[0];

        switch(destination.direction)
        {
            case Direction.DOWN:
                this._animation.setAnimationPattern(walkDownPattern);
                break;
            case Direction.UP:
                this._animation.setAnimationPattern(walkUpPattern);
                break;
            case Direction.LEFT:
                this._animation.setAnimationPattern(walkLeftPattern);
                 break;
            case Direction.RIGHT:
                this._animation.setAnimationPattern(walkRightPattern);
                break;
        }
       


        const delta = this.getDelta(this._x, this._y, destination.x, destination.y);
        const distance = Math.sqrt(delta.dx * delta.dx + delta.dy * delta.dy);

        if(distance < 5) {
            this._destinationQueue.shift();

            if(this.onEndpointReach) {
                this.onEndpointReach(destination.x, destination.y);

                if(this._destinationQueue.length === 0) {
                    this._isMoving = false;
                }
                
            }
            return;
        }

        const deltaX = this._x + 5 * Math.cos(destination.angle);
        const deltaY = this._y + 5 * Math.sin(destination.angle);

        this._position = new Vector2D(deltaY / this._tileSize, deltaX / this._tileSize);
        this._x = deltaX;
        this._y = deltaY;
    }


    draw(ctx) {

        if(this._selected) {
            ctx.strokeRect(this._x, this._y, this.width, this.height);
        }

        this._animation.draw(ctx, this._x, this._y, this.width, this.height);
    }
}