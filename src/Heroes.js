import { Hero } from "./Hero.js";
import { CroppableSprite } from "./Sprite.js";
import { resources } from "../Resources.js";
import { Vector2D } from "./Vector2D.js";

export class GirlHero extends Hero {
    constructor(position) {
        super(new CroppableSprite({
            resource: resources.images.hero,
            frameSize: new Vector2D(75, 75),
            hFrames: 4,
            vFrames: 4
        }),
        position, 
        75, 75);
    }
};