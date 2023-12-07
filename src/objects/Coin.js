import { events } from "../../Events.js";
import { resources } from "../../Resources.js";
import { soundPlayer } from "../../SoundPlayer.js";
import { GameObject } from "../GameObject.js";

export class Coin extends GameObject {
    constructor(position, width, height, animation) {
        super(position, width, height);
        this._animation = animation;

        events.on("HERO_POSITION", this, position => {
            if(!this._isMarkAsDeleted && this.getPosition.equalsTo(position)) {
                this._isMarkAsDeleted = true;
                soundPlayer.playSound(resources.sounds.coin);
            }
        });
    }

    update(timestamp) {

    }

    draw(ctx) {
        if(!this._isMarkAsDeleted) {
            this._animation.draw(ctx, this._centerX, this._centerY, this.width, this.height);
        }
    }
}