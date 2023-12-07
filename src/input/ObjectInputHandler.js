import { InputHandler } from "./InputHandler.js";
import { makeThrowObjectCommand } from "./commands.js";

export class ObjectInputHandler extends InputHandler {
    constructor(canvas) {
        super(canvas);
    }

    handle(actor) {

        if(this.isPressed("KeyE")) {
           return makeThrowObjectCommand(actor);
        }
  
        return null;
    }
}