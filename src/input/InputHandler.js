import { makeMoveCommand, makeSelectTileCommand } from "./commands.js";

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";


export class InputHandler {

    constructor(canvas) {

      this._mouseState = {
        isLeftPressed: false,
        isRightPressed: false,
        coordinates: { x: 0, y: 0 }
      };

      this._keyState = {
        LEFT: false,
        RIGHT: false,
        UP: false,
        DOWN: false
      }

      this._canvas = canvas;
      this.handleMouseDown = this.handleMouseDown.bind(this); 
      this.handleMouseUp = this.handleMouseUp.bind(this); 
      this.updateKeysState = this.updateKeysState.bind(this); 
      this._canvas.addEventListener('mousedown', this.handleMouseDown);
      this._canvas.addEventListener('mouseup', this.handleMouseUp);
      document.addEventListener('keydown', this.updateKeysState);
      document.addEventListener('keyup', this.updateKeysState);
    }

    updateKeysState(event) {
      switch (event.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this._keyState[LEFT] = event.type === 'keydown';
          break;
        case 'KeyW':
        case 'ArrowUp':
          this._keyState[UP] = event.type === 'keydown';
          break;
        case 'KeyD':
        case 'ArrowRight':
          this._keyState[RIGHT] = event.type === 'keydown';
          break;
        case 'KeyS':
        case 'ArrowDown':
          this._keyState[DOWN] = event.type === 'keydown';
          break;
        default: 
          this._keyState[event.code] = event.type === 'keydown';
          break;
      }
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
      return this._keyState[key];
    }

    updateMouseCoordinates(event) {
      const canvasPosition = this._canvas.getBoundingClientRect();
      const xPos = Math.floor(event.x - canvasPosition.left);
      const yPos = Math.floor(event.y - canvasPosition.top);
      this._mouseState.coordinates = { x: xPos, y: yPos };
    }
}