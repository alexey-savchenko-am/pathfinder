import { GameObject } from "../GameObject.js";
import { CroppableSprite, Sprite } from "../Sprite.js";
import { resources } from "../../Resources.js";
import { generateMaze } from "../helpers/generateMaze.js";
import { createTerrain } from "../terrain.js";
import { Vector2D, VectorMap } from "../Vector2D.js";
import { DisplayMode, Tile } from "./Tile.js";
import { soundPlayer } from "../../SoundPlayer.js";
import { events } from "../../Events.js";
import { Coin } from "./Coin.js";
import { coinAnimationPattern } from "../animation/objectAnimationPatterns.js";
import { Animation } from "../animation/Animation.js";
import { Settings } from "../../Settings.js";
import { lightAnimationPattern } from "../animation/objectAnimationPatterns.js";
import { Light } from "./Light.js";
import { calculateLighting } from "../helpers/calculateLighting.js";

export class TileSet {
    constructor() {

        const settings = new Settings();

        this._tileSize = settings.tileSize;
        this._tileMap = new VectorMap();

        const landscapeSprite = new CroppableSprite({
            resource: resources.images.landscape,
            frameSize: new Vector2D(335, 334),
            hFrames: 2,
            vFrames: 2
        });

        this.darkWallTerrain = createTerrain(1, false, landscapeSprite, 1);
        this.lightWallTerrain = createTerrain(1, false, landscapeSprite, 0);
        this.darkSandTerrain = createTerrain(1, true, landscapeSprite, 3);
        this.lightSandTerrain = createTerrain(1, true, landscapeSprite, 2);

        const coinSprite = new CroppableSprite({
            resource: resources.images.coin,
            frameSize: new Vector2D(256, 324),
            hFrames: 6,
            vFrames: 6
        })

        this._coinAnimation = new Animation(coinSprite, coinAnimationPattern);

        const lightSprite = new CroppableSprite({
            resource: resources.images.light,
            frameSize: new Vector2D(150, 150),
            hFrames: 4,
            vFrames: 4
        })

       this._lightAnimation = new Animation(lightSprite, lightAnimationPattern);

        events.on("OBJECT_THROWING", this, ({object, position}) => {

            const tile = this.getIntersectingTile(position);
            
            if(tile && !tile.terrain.getIsPassable()) {
                object.stopThrowing();
                this.setSandTerrain(tile);
                soundPlayer.playSound(resources.sounds.break);
            }
        });

        events.on("HERO_POSITION", this, position => {
            this.deselectTiles([position]);
        });
    }

    /**
     * 
     * @param {Vector2D} position 
     * @returns 
     */
    getIntersectingTile(position) {
        const tile = this._tileMap.get(position.round());
        return tile;
    }

    setWallTerrain(tile) {
        tile.setTerrain({darkTerrain: this.darkWallTerrain, lightTerrain: this.lightWallTerrain});
    }

    setSandTerrain(tile) {
        tile.setTerrain({darkTerrain: this.darkSandTerrain, lightTerrain: this.lightSandTerrain});
    }

    getTile = position => this._tileMap.get(position); 

    getTileByCoordinates(x, y, offset) {
        let row = Math.floor(y / this._tileSize);
        let col = Math.floor(x / this._tileSize);

        if(offset) {
            row = row + Math.abs(offset.getRow);
            col = col + Math.abs(offset.getCol);
        }

        return this.getTile(new Vector2D(row, col));
    }

    initialize(widthInTiles, heightInTiles) {

        const maze = generateMaze(heightInTiles, widthInTiles);

        for(let row = 0; row < heightInTiles; row++) {
            for(let col = 0; col < widthInTiles; col++) {
                
                const cell = row * widthInTiles + col;

                let terrain = { darkTerrain: this.darkSandTerrain, lightTerrain: this.lightSandTerrain };

                if(maze[cell] === 1) {
                    terrain = { darkTerrain: this.darkWallTerrain, lightTerrain: this.lightWallTerrain };
                }
                
                const position = new Vector2D(row, col);
                const tile = new Tile(position, terrain);
                this._tileMap.add(position, tile);
                this.addRandomCoin(tile);
            }
        }

        this.addRandomLights(widthInTiles, heightInTiles);
    }

    addRandomLights(widthInTiles, heightInTiles) {
        for(let i = 0; i < 5; i++) {
            
            let rndPosition = null;
            let tile = null;
            do {
                rndPosition = new Vector2D(
                    Math.floor(Math.random() * heightInTiles), 
                    Math.floor(Math.random() * widthInTiles));

                tile = this._tileMap.get(rndPosition);

            } while(tile.childrenCount > 0 || !tile.terrain.getIsPassable());
            
            tile.appendChild(new Light(rndPosition, 75, 75, this._lightAnimation));
        }
    }

    addRandomCoin(tile) {
        if(tile.terrain.getIsPassable()) {
            const rnd = Math.random();
            if(rnd <= 0.1) {
                tile.appendChild(new Coin(tile.position, 40, 50, this._coinAnimation));
            }
        }
    }

    selectTiles(tilesToSelect) {
        tilesToSelect.forEach(tilePosition => {
            const tile = this._tileMap.get(tilePosition);
            if(tile && !tile.isSelected) {
                tile.select();
            }
        });
    }

    deselectTiles(tilesToSelect) {
        tilesToSelect.forEach(tilePosition => {
            const tile = this._tileMap.get(tilePosition);
            if(tile && tile.isSelected) {
                tile.deselect();
            }
        });
    }

    update(timestamp) {
        this._coinAnimation.update(timestamp);
        this._lightAnimation.update(timestamp);
        this._tileMap.forEach(tile => {
            tile.update(timestamp);
        });
    }


    highLightTilesAround(vector, distance) {
        const highlightedTiles = calculateLighting(this._tileMap, vector, distance);

        for(const tile of highlightedTiles) {
            tile.displayMode = DisplayMode.LightMode;
        }
    }

    draw(ctx, activeHero) {
    
        if(activeHero) {
            this.highLightTilesAround(activeHero.position.round(), 2);
        }

        this._tileMap.forEach(tile => {
            if(tile._children.some(item => item instanceof Light)) {
                this.highLightTilesAround(tile.position, 1);
            }
        });

        this._tileMap.forEach(tile => {
            tile.draw(ctx);
            tile.displayMode = DisplayMode.DarkMode;
        });
    }
}