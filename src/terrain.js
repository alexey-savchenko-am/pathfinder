
export const Colors = {
    green: 'green',
    blue: 'blue',
    red: 'red'
  };

export function createTerrain(movementCost, isPassable, sprite, frameNumber = 0) {

    const _movementCost = movementCost;
    const _isPassable = isPassable;
    const _sprite = sprite;
    const _frameNumber = frameNumber;

    return {

      getMovementCost: function() {
        return _movementCost;
      },
  
      getIsPassable: function() {
        return _isPassable;
      },
  
      draw: function(ctx, x, y, width, height) {

        _sprite.draw(ctx, x, y, width, height, _frameNumber);
 
      }
    };
  }