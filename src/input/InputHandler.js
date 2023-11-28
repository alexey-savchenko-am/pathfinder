import { makeMoveCommand, makeSelectTileCommand } from "./commands.js";

export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"


export class InputHandler {

    constructor(canvas) {

      this._mouseState = {
        isLeftPressed: false,
        isRightPressed: false,
        coordinates: { x: 0, y: 0 }
      };

      this._canvas = canvas;
      this.handleMouseDown = this.handleMouseDown.bind(this); 
      this.handleMouseUp = this.handleMouseUp.bind(this); 
      this._canvas.addEventListener('mousedown', this.handleMouseDown);
      this._canvas.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown(event) {
      if (event.button === 0) {
        this._mouseState.isLeftPressed = true;
      } else if (event.button === 2) {
          this._mouseState.isRightPressed = true;
      }

      this.updateMouseCoordinates(event);
    }

    handleMouseUp(event) {
      if (event.button === 0) {
        this._mouseState.isLeftPressed = false;
      } else if (event.button === 2) {
        this._mouseState.isLeftPressed = false;
      }

      this.updateMouseCoordinates(event);
    }

    handle(actor) {
    }

    isPressed(key) {
      this.keysPressed[key] === true;
    }

    updateMouseCoordinates(event) {
      const canvasPosition = this._canvas.getBoundingClientRect();
      const xPos = Math.floor(event.x - canvasPosition.left);
      const yPos = Math.floor(event.y - canvasPosition.top);
      this._mouseState.coordinates = { x: xPos, y: yPos };
    }
}