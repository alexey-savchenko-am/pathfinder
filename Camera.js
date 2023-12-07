import { events } from "./Events.js";
import { GameObject } from "./src/GameObject.js";
import { Vector2D } from "./src/Vector2D.js";


export class Camera extends GameObject {
    constructor() {
        super(new Vector2D(0,0));
        events.on("HERO_POSITION", this, position => {
            //console.log(position);

            const width = 16;
            const height = 10;

            // 2400 - 
            let row = -position.getRow + height/2;

            let col = -position.getCol + width/2;

            if(row > 0)
            {
                row = 0;
            }

            if(col > 0)
            {
                col = 0;
            }

            //5 10
            if(row < -10)
            {

                row = -10;
            }

            if(col < -16)
            {
                col = -16;
            }

            //console.log(row , col);
            this.setPosition(new Vector2D(row, col ));

            //console.log(this._x, this._y);
         });
         
    }
}