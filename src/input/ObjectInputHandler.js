import { InputHandler } from "./InputHandler.js";
import { makeMoveCommand } from "./commands.js";

export class ObjectInputHandler extends InputHandler {
    constructor(canvas) {
        super(canvas);
    }

    handle(actor) {

        if(this._mouseState.isLeftPressed) {
           // return makeMoveCommand(actor, this._mouseState.coordinates.x, this._mouseState.coordinates.y);
        }
  
        return null;
    }
}