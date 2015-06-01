glob.npc.chooseMove = function(quitAfter) {
  var newDirection, willCrash, x = this.x,
    y = this.y;

  if (this.direction === DIRECTIONS.UP) {
    if ((this.y - spaceCrash) <= 0) {
      willCrash = true;
    } else {
      willCrash = glob.player.points.some(function(point, index, arr) {
        //We are at the same point in y.
        if (point.x === x) {
          return point.y === (y - spaceCrash); //Will crash in this point?
        } else {
          return false;
        }
      });
    }
  } else if (this.direction === DIRECTIONS.DOWN) {
    if ((this.y + spaceCrash) >= glob.canvas.height) {
      willCrash = true;
    } else {
      willCrash = glob.player.points.some(function(point, index, arr) {
        //We are at the same point in y.
        if (point.x === x) {
          return point.y === (y + spaceCrash); //Will crash in this point?
        } else {
          return false;
        }
      });
    }
  } else if (this.direction === DIRECTIONS.LEFT) {
    if ((this.x - spaceCrash) <= 0) {
      willCrash = true;
    } else {
      //This will crash if continues to the left?
      willCrash = glob.player.points.some(function(point, index, arr) {
        //We are at the same point in y.
        if (point.y === y) {
          return point.x === (x - spaceCrash); //Will crash in this point?
        } else {
          return false;
        }
      });
    }
  } else if (this.direction === DIRECTIONS.RIGHT) {
    if ((this.x + spaceCrash) >= glob.canvas.width) {
      willCrash = true;
    } else {
      willCrash = glob.player.points.some(function(point, index, arr) {
        //We are at the same point in y.
        if (point.y === y) {
          return point.x === (x + spaceCrash); //Will crash in this point?
        } else {
          return false;
        }
      });
    }
  }

  if (willCrash) {
    switch (this.direction) {
      case DIRECTIONS.UP:
        this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT);
        break;
      case DIRECTIONS.DOWN:
        this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT);
        break;
      case DIRECTIONS.LEFT:
        this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.UP : DIRECTIONS.DOWN);
        break;
      case DIRECTIONS.RIGHT:
        this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.UP : DIRECTIONS.DOWN);
        break;
    }
  }
}
