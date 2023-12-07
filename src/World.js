import { GameObject } from "./GameObject.js";
import { resources } from "../Resources.js";
import { astar } from "./helpers/astar.js";
import { Vector2D } from "./Vector2D.js";
import { soundPlayer } from "../SoundPlayer.js";
import { events } from "../Events.js";
import { TileSet } from "./objects/TileSet.js";

export class World extends GameObject {

    constructor(camera, inputHandler, widthInTiles, heightInTiles) {
        super(new Vector2D(0, 0), widthInTiles, heightInTiles, inputHandler);

        this._camera = camera;
        this._widthInTiles = widthInTiles;
        this._heightInTiles = heightInTiles;
        this._selectedChild = null;
        this._tiles = new TileSet();
        this._score = 0;

        events.on("COIN_COLLECTED", this, () => {
            this._score++;
        });
    }

    appendChild(child) {
        
        const position = child.getPosition;

        let tile = this._tiles.getTile(position);

        let newPosition = position;

        while(!tile.terrain.getIsPassable()) {
            tile = this._tiles.getTile(newPosition);
            newPosition = new Vector2D(position.getRow, position.getCol + 1);
        }

        child.setPosition(newPosition);
        
        super.appendChild(child);
    }

    handleInputEvents() {
        this.handleInputEvent();
        this._children.forEach(child => child.handleInputEvent());
    }

    generateMaze = () =>
        this._tiles.initialize(this._widthInTiles, this._heightInTiles);
    

    selectHero(x, y) {

        const tile = this._tiles.getTileByCoordinates(x, y, this._camera.getPosition);

        for(let child of this._children) {
            child.deselect();

            if(child.position.equalsTo(tile.position)) {
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

        const tile = this._tiles.getTile(newPosition);

        if(!tile || !tile.terrain.getIsPassable()) {
            return;
        }

        this._selectedChild.moveToTile(newPosition);
    }

    moveSelectedChildTo(x, y) {

        if (!this._selectedChild || this._selectedChild._isMoving) {
            return;
        }

        /*
        if (this._selectedChild._isMoving) {
            this._selectedChild.cancelMoving();
        }*/

        const cameraPosition = this._camera.getPosition;

        let tile = this._tiles.getTileByCoordinates(x, y, cameraPosition);

        const moveVectors = astar(
            this._selectedChild.getPosition, 
            tile.getPosition,
            this._tiles, 
            this._widthInTiles, 
            this._heightInTiles);

        if(moveVectors) {
            this._tiles.selectTiles(moveVectors);
            moveVectors.forEach(vector => this._selectedChild.moveToTile(vector));
        }
    }

    update(timestamp) {
        this._tiles.update(timestamp);
    }

    draw(ctx) {

        ctx.clearRect(0, 0, board.width, board.height);
        ctx.save();
        ctx.translate(this._camera._x, this._camera._y);
        
        this.drawObjects(ctx);
       
        ctx.restore();
    }

    drawObjects(ctx) {
         this._tiles.draw(ctx, this._selectedChild);
         this._children.forEach(child => child.draw(ctx));
     }

    displayScore(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
      
        var text = `Score: ${this._score}`;

        ctx.fillText(text, (this._widthInTiles - 1) * this._tileSize, this._tileSize / 2);
    }
};