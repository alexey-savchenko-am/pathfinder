import { Vector2D } from "../Vector2D.js";
import { InputHandler } from "./InputHandler.js";
import { 
    makeMoveObjectCommand, 
    makeMoveToVectorCommand, 
    makeSelectHeroCommand,
  
 } from "./commands.js";

 import {   LEFT, RIGHT, UP, DOWN } from "./InputHandler.js";

export class WorldInputHandler extends InputHandler {
    constructor(canvas) {
        super(canvas);
    }

    handle(actor) {
          
        if(this._mouseState.isRightPressed) {
            this._mouseState.isRightPressed = false;
            //return makeSelectTileCommand(actor, this._mouseState.coordinates.x, this._mouseState.coordinates.y);
            return makeMoveObjectCommand(actor, this._mouseState.coordinates.x, this._mouseState.coordinates.y);
        }

        if( this._mouseState.isLeftPressed) {
            this._mouseState.isLeftPressed = false;
            return makeSelectHeroCommand(actor, this._mouseState.coordinates.x, this._mouseState.coordinates.y);
        }

        if(this.isPressed(UP)) {
            return makeMoveToVectorCommand(actor, new Vector2D(-1, 0));
        }

        if(this.isPressed(DOWN)) {
            return makeMoveToVectorCommand(actor, new Vector2D(1, 0));
        }

        if(this.isPressed(LEFT)) {
            return makeMoveToVectorCommand(actor, new Vector2D(0, -1));
        }

        if(this.isPressed(RIGHT)) {
            return makeMoveToVectorCommand(actor, new Vector2D(0, 1));
        }
  
        return null;
    }
}