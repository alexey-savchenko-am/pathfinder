import { Vector2D } from "../Vector2D.js";


export function astar(currentPosition, destinationPosition, tileMap, tilesInRowCount, tilesInColCount) {
    function Node(row, col) {
        this._parent = null;
        this._row = row;
        this._col = col;
        this._cost = 0;
        this._heuristic = 0;

        this.getCommonCost = () => this._cost + this._heuristic;
    }

    const openSet = [];
    const closeSet = [];

    const startNode = new Node(currentPosition.getRow, currentPosition.getCol);
    openSet.push(startNode);

    while(openSet.length > 0) {
        let currentNode = openSet[0];
        let currentIndex = 0;

        for(let i = 1; i < openSet.length; i++) {
            if(openSet[i].getCommonCost() < currentNode.getCommonCost()) {
                currentNode = openSet[i];
                currentIndex = i;
            }
        }

        openSet.splice(currentIndex, 1);
        closeSet.push(currentNode);

        const neighbors = getNeighbors(currentNode);


        if(currentNode._row === destinationPosition.getRow && currentNode._col === destinationPosition.getCol) {
            return buildPath(currentNode);
        }


        for(let neighbor of neighbors) {
            if(closeSet.some(node => node._row === neighbor._row && node._col === neighbor._col)) {
                continue;
            }

            if(!openSet.some(node => node._row === neighbor._row && node._col === neighbor._col)) {
                openSet.push(neighbor);
            }

            neighbor._cost = currentNode._cost + 1;
            neighbor._heuristic = getHeuristic(neighbor);
            neighbor._parent = currentNode;

        }
    }

    function buildPath(node) {
        let path = [];

        let currentNode = node;

        while(currentNode) {
            path.push(new Vector2D(currentNode._row, currentNode._col));
            currentNode = currentNode._parent;
        }

        path = path.reverse();
        return path;
    }

    function getNeighbors(node) {
        const neighbors = [];
        const directions = [[-1,0], [1,0], [0,1], [0,-1]];

        for(let direction of directions) {
            
            const dRow = node._row + direction[0];
            const dCol = node._col + direction[1];

            const cell = dRow * tilesInRowCount + dCol;
   
            if(dRow >= 0 && dCol >= 0 && dRow < tilesInColCount && dCol < tilesInRowCount) {

                if(tileMap[cell].terrain.getIsPassable()) {
                    //console.log(dRow, dCol);
                    neighbors.push(new Node(dRow, dCol));
                }
            }

        }

        return neighbors;
    }

    function getHeuristic(node) {
        return Math.abs(node._row - destinationPosition.getRow) + Math.abs(node._col - destinationPosition.getCol);
    }

}