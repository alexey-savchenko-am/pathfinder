import { InputHandler } from "./InputHandler.js";
import { makeMoveObjectCommand, makeSelectHeroCommand, makeSelectTileCommand } from "./commands.js";

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
  
        return null;
    }
}