import { GameObject } from "./GameObject.js";
import { CroppableSprite } from "./Sprite.js";
import { resources } from "../Resources.js";
import { Vector2D } from "./Vector2D.js";
import { Animation } from "./animation/Animation.js";


const coinAnimationPattern = {
    duration: 600,
    frames: [
        {
            time: 0,
            frame: 0
        },
        {
            time: 100,
            frame: 1
        },
        {
            time: 200,
            frame: 2
        },
        {
            time: 300,
            frame: 3
        },
        {
            time: 400,
            frame: 4
        },
        {
            time: 500,
            frame: 5
        }
    ]
};

export class Coins {
    constructor() {
        const body = new CroppableSprite({
            resource: resources.images.coin,
            frameSize: new Vector2D(256, 324),
            hFrames: 6,
            vFrames: 6
        })

        this._animation = new Animation(body, coinAnimationPattern);

        this._coins = [];
        this._observers = [];
    }

    addObserver(observer) {
        this._observers.push(observer);
    }

    removeObserver(observer) {
        this._observers = this._observers.filter(obs => obs !== observer);
    }

    onCoinCollected() {
        this._observers.forEach(observer => {
          observer.coinCollected();
        });
    }

    generateOnMap(world) {

        for (let i = 0; i < world._tiles.length; i++) {
            const tile = world._tiles[i];

            if(!tile.terrain.getIsPassable()) {
                continue;
            } 

            const row = Math.floor(i / world.width);
            const col = i % world.width;

           if(Math.random() <= 0.1) {
                this._coins[i] = {
                    collected: false, 
                    object: new GameObject(new Vector2D(row, col), 40, 50)
                };
            }
        }
    }

    checkCollision(object) {
        for (let i = 0; i <  this._coins.length; i++) {
            const coin = this._coins[i];

            if(!coin || coin.collected) {
                continue;
            }

            const hasCollision = 
                object.getPosition.equalsTo(coin.object.getPosition);

            if(hasCollision) {
                coin.collected = true;
                this.onCoinCollected();
            }
        }
    }

    frame(timestamp) {
        this._animation.update(timestamp);
    }

    draw(ctx) {
        for(const coin of this._coins) {
            if(coin && !coin.collected) {
                this._animation.draw(ctx, coin.object._centerX, coin.object._centerY, coin.object.width, coin.object.height);
            }
        }
    }
}