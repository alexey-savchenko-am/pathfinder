import { GameObject } from "../GameObject.js";
import { Sprite } from "../Sprite.js";
import { resources } from "../../Resources.js";
import { Direction } from "./Hero.js";
import { events } from "../../Events.js";

export class Sphere extends GameObject {
    constructor(position, width, height) {
        super(position, width, height);
        
        this._sprite = new Sprite({
            resource: resources.images.candle
        });

        this._isThrowing = false;
        this._throwDirection = null;
    }

    get isThrown() {
        return this._isThrowing;
    }

    getBoundedBlocks() {
        return [
            new Vector2D(Math.ceil(this._position.getRow), Math.ceil(this._position.getCol)),
            this._position.left(),
            this._position.right(),
            this._position.top(),
            this._position.bottom(),
            this._position.topLeft(),
            this._position.topRight(),
            this._position.bottomLeft(),
            this._position.bottomRight(),

            this._position.left().left(),
            this._position.left().left().top(),
            this._position.left().left().bottom(),
            this._position.right().right(),
            this._position.right().right().top(),
            this._position.right().right().bottom(),
            this._position.top().top(),
            this._position.top().top().left(),
            this._position.top().top().right(),
            this._position.bottom().bottom(),
            this._position.bottom().bottom().left(),
            this._position.bottom().bottom().right(),

            this._position.topLeft().topLeft(),
            this._position.topRight().topRight(),
            this._position.bottomLeft().bottomLeft(),
            this._position.bottomRight().bottomRight(),

        ];
    }


    throwTowards(vector) {
        this._isThrowing = true;
        this._throwDirection = vector;
    }

    stopThrowing() {
        this._isThrowing = false;
        this._throwDirection = null;
    }

    update(timestamp) {
        if(this._isThrowing) {
            const newPosition = this.getPosition.add(this._throwDirection);
            this.setPosition(newPosition);
            events.emit("OBJECT_THROWING", { object: this, position: newPosition } );
        }
        
    }

    draw(ctx, direction) {
        switch(direction) {
            case Direction.DOWN: 
                this._sprite.draw(ctx, this._centerX, this._centerY + 10, this.width, this.height);
                break;
            case Direction.UP: 
                if(this._isThrowing) {
                    this._sprite.draw(ctx, this._centerX, this._centerY + 10, this.width, this.height);
                }
                break;
            case Direction.LEFT: 
                this._sprite.draw(ctx, this._centerX - 19, this._centerY + 10, this.width, this.height);
                break;
            case Direction.RIGHT: 
                this._sprite.draw(ctx, this._centerX + 19, this._centerY + 10, this.width, this.height);
                break;
        }
    }
}