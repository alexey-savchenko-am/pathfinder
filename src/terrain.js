
export const Colors = {
    green: 'green',
    blue: 'blue',
    red: 'red'
  };

export function createTerrain(movementCost, isPassable, sprite) {

    const _movementCost = movementCost;
    const _isPassable = isPassable;
    const _sprite = sprite;
  
    return {

      getMovementCost: function() {
        return _movementCost;
      },
  
      getIsPassable: function() {
        return _isPassable;
      },
  
      draw: function(ctx, x, y, width, height) {
        _sprite.draw(ctx, x, y, width, height);
      }
    };
  }