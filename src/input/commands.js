

export function makeMoveCommand(actor, row, col) {
    let rowBefore, colBefore;

    return {
      execute: function() {
        rowBefore = actor.getRow;
        colBefore = actor.getCol;
        actor.moveTo(row, col);
      },
      undo: function() {
        actor.moveTo(rowBefore, colBefore);
      }
    }
};

export function makeMoveObjectCommand(actor, x, y) {
  let rowBefore, colBefore;

  return {
    execute: function() {
      rowBefore = actor.getRow;
      colBefore = actor.getCol;
      actor.moveSelectedChildTo(x, y);
    },
    undo: function() {
      actor.moveSelectedChildTo(rowBefore, colBefore);
    }
  }
};


export function makeMoveToVectorCommand(actor, vector) {
  return {
    execute: function() {
      actor.moveSelectedChildToVector(vector);
    },
    undo: function() {
    }
  }
}


export function makeSelectHeroCommand(actor, x, y) {
  return {
    execute: function() {
      actor.selectHero(x, y);
    },
    undo: function() {
      actor.deselect(x, y);
    }
  }
};


export function makeSelectTileCommand(actor, x, y) {
  return {
    execute: function() {
      actor.highlightTile(x, y);
    },
    undo: function() {
      actor.dimTile(x, y);
    }
  }
};



export function makePikupOrThrowItemCommand(actor) {
  return {
    execute: function() {
      actor.pickupOrThrowItem();
    },
    undo: function() {
    }
  }
};