import { events } from "../../Events.js";
import { resources } from "../../Resources.js";
import { soundPlayer } from "../../SoundPlayer.js";
import { GameObject } from "../GameObject.js";
import { Vector2D } from "../Vector2D.js";
import { Animation } from "../animation/Animation.js";
import { 
    stayUpPattern,
    stayDownPattern,
    stayLeftPattern,
    stayRightPattern,
    walkDownPattern, 
    walkUpPattern, 
    walkLeftPattern, 
    walkRightPattern 
} from "../animation/animationPatterns.js";
import { ObjectInputHandler } from "../input/ObjectInputHandler.js";



export const Direction = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
  };

export class Hero extends GameObject {

    constructor(sprite, position, width, height, inputHandler) {
        super(position, width, height, inputHandler);
        this._destinationQueue = [];
        this._isMoving = false;
        this._sprite = sprite;
        this._animation = new Animation(sprite, stayDownPattern);
        this._prevPosition = position.clone();
        this._currentDirection = Direction.DOWN;
        this._inventory = [];

        events.on("HERO_POSITION", this, () => {
            //soundPlayer.playSound(resources.sounds.move);
        });
    }

    pickUpItem(item) {
        this._currentDirection = Direction.UP;
        this._inventory.push(item);
        soundPlayer.playSound(resources.sounds.pickup);
    }

    get inventory() {
        return this._inventory;
    }

    moveToTile(vector) {
        this.moveTo(vector.getCol * this._tileSize, vector.getRow * this._tileSize);
    } 

    cancelMoving() {
        this._isMoving = false;
        this._destinationQueue = [];
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

            switch(this._currentDirection)
            {
                case Direction.DOWN:
                    this._animation.setAnimationPattern(stayDownPattern);
                    break;
                case Direction.UP:
                    this._animation.setAnimationPattern(stayUpPattern);
                    break;
                case Direction.LEFT:
                    this._animation.setAnimationPattern(stayLeftPattern);
                     break;
                case Direction.RIGHT:
                    this._animation.setAnimationPattern(stayRightPattern);
                    break;
            }

            return;
        }

        events.emit("HERO_POSITION", this._position);
        let destination = this._destinationQueue[0];
        this._currentDirection = destination.direction;

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

            if(this._destinationQueue.length === 0) {
                this._isMoving = false;
            }

            return;
        }

        const deltaX = this._x + 5 * Math.cos(destination.angle);
        const deltaY = this._y + 5 * Math.sin(destination.angle);

        this._prevPosition = this._position.clone();

        const newPosition = new Vector2D(deltaY / this._tileSize, deltaX / this._tileSize);

        /*
        this._position = new Vector2D(deltaY / this._tileSize, deltaX / this._tileSize);
        this._x = deltaX;
        this._y = deltaY;
        */
        this.setPosition(newPosition);
        this._x = deltaX;
        this._y = deltaY;

    }

    draw(ctx) {

        if(this._selected) {
            ctx.strokeRect(this._x, this._y, this.width, this.height);
        }

        this._animation.draw(ctx, this._centerX, this._centerY, this.width, this.height);
    }
}