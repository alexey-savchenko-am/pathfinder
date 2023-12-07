import { GameObject } from "../GameObject.js";

export class Light extends GameObject {
    constructor(position, width, height, animation) {
        super(position, width, height);
        this._animation = animation;
    }


    update(timestamp) {
        //this._animation.update(timestamp);
    }

    draw(ctx) {
        this._animation.draw(ctx, this._centerX, this._centerY, this.width, this.height);
    }
}