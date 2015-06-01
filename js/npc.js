glob.npc.chooseMove = function() {
  var willCrash, itself = false,
    edge = false,
    x = this.x,
    y = this.y;

  if (this.direction === DIRECTIONS.UP) {
    willCrash = this.points.some(function(point, index, arr) {
      itself = ((y - spaceCrash) === point.y);
      return itself;
    });
    if (!willCrash) {
      if ((this.y - spaceCrash) <= 0) {
        willCrash = true;
        edge = true;
      } else {
        //TODO: Change this for a function previously defined, here and in every "some" calling
        willCrash = glob.player.points.some(function(point, index, arr) {
          //We are at the same point in x.
          if (point.x === x) {
            return point.y === (y - spaceCrash); //Will crash in this point?
          } else {
            return false;
          }
        });
      }
    }
  } else if (this.direction === DIRECTIONS.DOWN) {
    willCrash = this.points.some(function(point, index, arr) {
      itself = ((y + spaceCrash) === point.y);
      return itself;
    });
    if (!willCrash) {
      if ((this.y + spaceCrash) >= glob.canvas.height) {
        willCrash = true;
        edge = true;
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
    }
  } else if (this.direction === DIRECTIONS.LEFT) {
    willCrash = this.points.some(function(point, index, arr) {
      itself = ((x - spaceCrash) === point.x);
      return itself;
    });
    if (!willCrash) {
      if ((this.x - spaceCrash) <= 0) {
        willCrash = true;
        edge = true;
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
    }
  } else if (this.direction === DIRECTIONS.RIGHT) {
    willCrash = this.points.some(function(point, index, arr) {
      itself = ((x + spaceCrash) === point.x);
      return itself;
    });
    if (!willCrash) {
      if ((this.x + spaceCrash) >= glob.canvas.width) {
        willCrash = true;
        edge = true;
      } else {
        willCrash = glob.player.points.some(function(point, index, arr) {
          //We are at the same point in x.
          if (point.y === y) {
            return point.x === (x + spaceCrash); //Will crash in this point?
          } else {
            return false;
          }
        });
      }
    }
  }

  if (willCrash) {
    switch (this.direction) {
      case DIRECTIONS.UP:
        if (edge) {
          this.direction = ((x - spaceCrash) <= 0 ? DIRECTIONS.RIGHT : (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT));
        } else if (itself) {
          //this.direction =  this.points.some(function(point, index, arr) {

          //}) ?
        } else {
          this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT);
        }
        break;
      case DIRECTIONS.DOWN:
        if (edge) {
          this.direction = ((x - spaceCrash) <= 0 ? DIRECTIONS.RIGHT : (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT));
        } else if (itself) {

        } else {
          this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.LEFT : DIRECTIONS.RIGHT);
        }
        break;
      case DIRECTIONS.LEFT:
        if (edge) {
          this.direction = ((y - spaceCrash) <= 0 ? DIRECTIONS.DOWN : (Math.floor(Math.random() * 2) ? DIRECTIONS.DOWN : DIRECTIONS.UP));
        } else if (itself) {

        } else {
          this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.DOWN : DIRECTIONS.UP);
        }
        break;
      case DIRECTIONS.RIGHT:
        if (edge) {
          this.direction = ((y - spaceCrash) <= 0 ? DIRECTIONS.DOWN : (Math.floor(Math.random() * 2) ? DIRECTIONS.DOWN : DIRECTIONS.UP));
        } else if (itself) {

        } else {
          this.direction = (Math.floor(Math.random() * 2) ? DIRECTIONS.DOWN : DIRECTIONS.UP);
        }
        break;
    }
  }
}
