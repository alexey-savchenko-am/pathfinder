import { Vector2D } from "./Vector2D.js";

export class Sprite {
    constructor({
        resource,
        top,
        left,
        right,
        bottom
      }) {

      this._resource = resource;
    }
  
    draw(ctx, x, y, width, height) {
        
      if (!this._resource.isLoaded) {
        return;
      }

      ctx.drawImage(
        this._resource.image, 
        x, 
        y, 
        width, 
        height);
    }
  
  }


  export class CroppableSprite extends Sprite {
    constructor({
      resource,
      frameSize,
      hFrames,
      vFrames
    }) {
      super({resource});
      this._frameSize = frameSize ?? new Vector2D(16, 16);
      this._hFrames = hFrames;
      this._vFrames = vFrames;

      this._frameMap = new Map();
      this.buildFrameMap();
    }

    buildFrameMap() {
      let frameCount = 0;
      for (let v = 0; v < this._vFrames; v++) {
        for (let h = 0; h < this._hFrames; h++) {
          this._frameMap.set(
              frameCount,
              new Vector2D(this._frameSize.getRow * h, this._frameSize.getCol * v)
          )
          frameCount++;
        }
      }
    }


    draw(ctx, x, y, width, height, frameNumber = null) {
        
      if (!this._resource.isLoaded) {
        return;
      }

      if(!frameNumber) {
        frameNumber = 0;
      }

      const frame = this._frameMap.get(frameNumber);

      ctx.drawImage(
        this._resource.image, 
        frame.getRow,
        frame.getCol,
        this._frameSize.getRow,
        this._frameSize.getCol,
        x, 
        y, 
        width, 
        height);
    }

}