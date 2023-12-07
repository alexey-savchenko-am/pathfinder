import { Vector2D, VectorMap } from "../Vector2D.js";

/**
 * Calculates lighting in a vector map starting from a given position.
 * @param {VectorMap} tileMap 
 * @param {Vector2D} startPosition 
 * @param {number} maxDistance
 */
export function calculateLighting(tileMap, startPosition, maxDistance = 3) {
    const illuminatedTiles = [];
    const visitedPositions = [];
    const queue = [{position: startPosition, distance: 0 }];

    while(queue.length > 0) {
        const {position, distance} = queue.shift();
        
        if(distance > maxDistance) {
            continue;
        }

        if(visitedPositions.indexOf(position) === -1) {
            
            const tile = tileMap.get(position);

            // out of boundaries of tilemap
            if(!tile) {
                continue;
            }

            visitedPositions.push(position);
            illuminatedTiles.push(tileMap.get(position));
            
            if(tile.terrain.getIsPassable()) {
                queue.push({ position: position.top(), distance: distance + 1});
                queue.push({ position: position.bottom(), distance: distance + 1});
                queue.push({ position: position.left(), distance: distance + 1});
                queue.push({ position: position.right(), distance: distance + 1});

                queue.push({ position: position.top().left(), distance: distance + 1});
                queue.push({ position: position.top().right(), distance: distance + 1});
                queue.push({ position: position.bottom().left(), distance: distance + 1});
                queue.push({ position: position.bottom().right(), distance: distance + 1});
                
            }
        }
    }

    return illuminatedTiles;
}