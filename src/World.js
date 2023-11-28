import { GameObject } from "./GameObject.js";
import { WorldInputHandler } from "./input/WorldInputHandler.js";
import { Colors, createTerrain } from "./terrain.js";
import { resources } from "../Resources.js";
import { Sprite } from "./Sprite.js";
import { generatePerlinNoise } from "./helpers/perlinNoise.js";
import { astar } from "./helpers/astar.js";
import { Vector2D } from "./Vector2D.js";
import { Coins } from "./Coins.js";

export class World extends GameObject {

    constructor(inputHandler, widthInTiles, heightInTiles) {
        super(new Vector2D(0, 0), widthInTiles, heightInTiles, inputHandler);

        this._tiles = [];
        this._coins = [];
        this._widthInTiles = widthInTiles;
        this._heightInTiles = heightInTiles;
        this._selectedChild = null;
       
        this.grassTerrain = createTerrain(1, true, new Sprite({
            resource: resources.images.ground
        }));

        this.waterTerrain = createTerrain(1, false, new Sprite({
            resource: resources.images.water
        }));

        this.sandTerrain = createTerrain(1, true, new Sprite({
            resource: resources.images.sand
        }));

        this._coins = new Coins();
        this._coins.addObserver(this);
        this._score = 0;
    }

    coinCollected = () => this._score++;

    appendChild(child) {
        super.appendChild(child);
        child.subscribeOnEndpointReach((x, y) => this.dimTile(x, y));
    }

    handleInputEvents() {
        this.handleInputEvent();
        this._children.forEach(child => child.handleInputEvent());
    }

    generateTerrain() {

        const noise = generatePerlinNoise(this._widthInTiles, this._heightInTiles, 1);

        for(let x = 0; x < this._widthInTiles; x++) {
            for(let y = 0; y < this._heightInTiles; y++) {
                const noiseValue = noise[x][y];
                
                let terrain = this.sandTerrain;

                if (noiseValue <= 0.4) {
                    terrain = this.waterTerrain;
                } 

                const cell = y * this.width + x;

                this._tiles[cell] = { isSelected: false, terrain, position: new Vector2D(y, x) };
            }
        }

        this._coins.generateOnMap(this);
    }

    findTileByPosition(position) {
        return this._tiles.find(tile => tile.position.equalsTo(position));
    }

    selectHero(x, y) {
        const tilePosition = this.getTileByCoordinates(x, y);

        for(let child of this._children) {
            child.deselect();
            if(child.getPosition.equalsTo(tilePosition)) {
                this._selectedChild = child;
                child.select();
            }

        }
    }

    moveSelectedChildToVector(vector) {

        if(!this._selectedChild || this._selectedChild._isMoving) {
            return;
        }

        const newPosition = this._selectedChild.getPosition.add(vector);

        const tile = this.findTileByPosition(newPosition);

        if(!tile || !tile.terrain.getIsPassable()) {
            return;
        }

        this._selectedChild.moveToTile(newPosition);
    }

    moveSelectedChildTo(x, y) {

        if(!this._selectedChild || this._selectedChild._isMoving) {
            return;
        }

        const moveVectors = astar(
            this._selectedChild.getPosition, 
            this.getTileByCoordinates(x, y), 
            this._tiles, 
            this._widthInTiles, 
            this._heightInTiles);

        if(moveVectors) {
            moveVectors.forEach(vector => this._selectedChild.moveToTile(vector));
        }
    }

    highlightTile(x, y) {
        const cell = this.getCell(x, y);
        this._tiles[cell].isSelected = true;
    }

    dimTile(x, y) {
        const cell = this.getCell(x, y);
        this._tiles[cell].isSelected = false;
    }

    getCell(x, y) {
        const row = Math.floor(x / this._tileSize);
        const col = Math.floor(y / this._tileSize);
        const cell = col * this.width + row;
        return cell;
    }

    update(timestamp) {
        this._coins.frame(timestamp);
        for(const child of this._children) {
            this._coins.checkCollision(child);
        }
    }

    displayScore(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
      
        var text = `Score: ${this._score}`;

        ctx.fillText(text, (this._widthInTiles - 1) * this._tileSize, this._tileSize / 2);
    }

    draw(ctx) {

        const tileSize = this.settings.getTileSize; 

        for (let i = 0; i < this._tiles.length; i++) {

            const col = i % this.width;
            const row = Math.floor(i / this.width);
            const x = col * tileSize; 
            const y = row * tileSize;
        
            this._tiles[i].terrain.draw(ctx, x, y, tileSize, tileSize);

            if(this._tiles[i].isSelected) {

                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.fillRect(x, y, tileSize, tileSize);
            }
        }

        this.displayScore(ctx);

        this._coins.draw(ctx);

        this._children.forEach(child => child.draw(ctx));
    }
};