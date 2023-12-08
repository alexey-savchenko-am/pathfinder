import { Hero, Direction } from "./Hero.js";
import { Sprite, CroppableSprite } from "../Sprite.js";
import { resources } from "../../Resources.js";
import { Vector2D } from "../Vector2D.js";
import { Sphere } from "./Sphere.js";
import { soundPlayer } from "../../SoundPlayer.js";

export class GirlHero extends Hero {
    constructor(position, inputHandler) {
        super(new CroppableSprite({
            resource: resources.images.hero,
            frameSize: new Vector2D(74, 75),
            hFrames: 4,
            vFrames: 4
        }),
        position, 
        75, 75, inputHandler);

        this._sphere = new Sphere(this._position.clone(), 28, 30);
    }

    
    throwObject() {
        let throwVector = null;
        const speed = 0.1;
        switch(this._currentDirection) {
            case Direction.DOWN:
                throwVector = new Vector2D(speed, 0);
                break;
            case Direction.UP:
                throwVector = new Vector2D(-speed, 0);
                break;
            case Direction.LEFT:
                throwVector = new Vector2D(0, -speed);
                break;
            case Direction.RIGHT:
                throwVector = new Vector2D(0, speed);
                break;    
        }

        this._sphere.throwTowards(throwVector);
        this.inventory.shift();
    }


    frame(timestamp) {
        super.frame(timestamp);
        this._sphere.update(timestamp);

        if(!this._sphere.isThrown) {
            this._sphere.setPosition(this._position);
        }
    }

    draw(ctx) {
        super.draw(ctx);

        if(this.inventory.length > 0 || this._sphere.isThrown) {
            this._sphere.draw(ctx, this._currentDirection);
        }
    }
};