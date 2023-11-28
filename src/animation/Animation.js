
export class Animation {
    constructor(sprite, defaultPattern) {
        this._sprite = sprite;
        this._currentTime = 0;
        this._animationPattern = defaultPattern;
    }

    setAnimationPattern(pattern) {
        if(this._animationPattern !== pattern) {
            this._animationPattern = pattern;
        }
    }


    get frame() {

        if(!this._animationPattern) {
            return 0;
        }

        const {frames}  = this._animationPattern;

        for (let i = frames.length - 1; i >= 0; i--) {
          if (this._currentTime >= frames[i].time) {
            return frames[i].frame;
          }
        }

        throw "Time is before the first keyframe";
    }

    
    update(delta) {
        this._currentTime += delta;
        if (this._currentTime >= this._animationPattern.duration) {
            this._currentTime = 0;
        }
    }

    draw(ctx, x, y, width, height) {
      
        this._sprite.draw(ctx, x, y, width, height, this.frame);
    }
}