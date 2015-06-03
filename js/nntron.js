var __width = 600,
  __height = 480,
  __speed = 128,
  glob = {
    canvas: (function(doc) {
      var can = doc.getElementById('nntron-canvas');
      can.setAttribute('width', __width);
      can.setAttribute('height', __height);
      return can;
    })(document)
  },
  CRASHER = {
    PLAYER: 0,
    NPC: 1,
    TIE: 2
  },
  DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
  },
  spaceCrash = 20,
  w = window,
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

(function(canvas) {
  var playerImgReady = npcImgReady = false,
    playerImg = new Image(),
    npcImg = new Image(),
    ctx = canvas.getContext("2d"),
    player = {
      speed: __speed,
      movements: {
        up: true,
        down: true,
        left: false,
        right: false
      },
      direction: DIRECTIONS.RIGHT,
      points: [],
      x: 0,
      y: 0
    },
    npc = {
      speed: __speed,
      movements: {
        up: true,
        down: true,
        left: false,
        right: false
      },
      points: [],
      direction: DIRECTIONS.LEFT,
      level: 0,
      x: 0,
      y: 0
    },
    score = [0, 0]; //Score in the form: player, npc

  playerImg.onload = function() {
    playerImgReady = true;
  };
  playerImg.src = "img/player.png";

  npcImg.onload = function() {
    npcImgReady = true;
  };
  npcImg.src = "img/npc.png";

  function render() {
    var ctx = ctx || glob.ctx,
      player = glob.player,
      npc = glob.npc;

    //FIXME: this and the npc part determine the speed, delete it
    if (player.direction === DIRECTIONS.RIGHT) {
      player.x += 1;
    } else if (player.direction === DIRECTIONS.LEFT) {
      player.x -= 1;
    } else if (player.direction === DIRECTIONS.UP) {
      player.y -= 1;
    } else if (player.direction === DIRECTIONS.DOWN) {
      player.y += 1;
    }

    if (npc.direction === DIRECTIONS.RIGHT) {
      npc.x += 1;
    } else if (npc.direction === DIRECTIONS.LEFT) {
      npc.x -= 1;
    } else if (npc.direction === DIRECTIONS.UP) {
      npc.y -= 1;
    } else if (npc.direction === DIRECTIONS.DOWN) {
      npc.y += 1;
    }

    if (playerImgReady) {
      ctx.drawImage(playerImg, glob.player.x, glob.player.y);
    }
    if (npcImgReady) {
      ctx.drawImage(npcImg, glob.npc.x, glob.npc.y);
    }
  }
  glob.render = render;

  glob.keys = {};
  addEventListener('keydown', function(e) {
    glob.key = e.keyCode;
  }, false);

  addEventListener('keyup', function(e) {
    delete glob.key;
  }, false);

  function resetScenario(crasher, resetCaller) {
    switch (crasher) {
      case CRASHER.NPC:
        glob.score[0]++;
        break;
      case CRASHER.PLAYER:
        glob.score[1]++;
        break;
    }

    if (!!glob.scoreEvent) {
      dispatchEvent(glob.scoreEvent);
    }

    this.player.points = [];
    this.player.x = Math.round(__width / 4);
    this.player.y = Math.round(__height / 2);
    this.player.movements = [];
    this.player.direction = DIRECTIONS.RIGHT;
    this.player.movements = {
      up: true,
      down: true,
      left: false,
      right: false
    };

    this.npc.points = [];
    this.npc.x = Math.round((__width / 4) * 3);
    this.npc.y = Math.round(__height / 2);
    this.npc.movements = [];
    this.npc.direction = DIRECTIONS.LEFT;
    this.npc.movements = {
      up: true,
      down: true,
      left: false,
      right: false
    };

    ctx.clearRect(0, 0, glob.canvas.width, glob.canvas.height);
  }
  glob.resetScenario = resetScenario;

  function updateGame(modifier) {
    var player = glob.player,
      npc = glob.npc,
      crasher, resetCaller,
      needReset = false;

    //this, checks if the player hit itself
    if (!needReset) {
      needReset = player.points.some(function(point, index, arr) {
        return _.isEqual(point, {
          x: player.x,
          y: player.y
        });
      });
      if (needReset) {
        resetCaller = "Player crashes";
        crasher = CRASHER.PLAYER;
      }
    }

    //Check if npc crashed himself
    if (!needReset) {
      needReset = npc.points.some(function(point, index, arr) {
        return _.isEqual(point, {
          x: npc.x,
          y: npc.y
        });
      });
      if (needReset) {
        resetCaller = "NPC Crashes";
        crasher = CRASHER.NPC;
      }
    }

    if (!needReset) {
      player.points.push({
        x: player.x,
        y: player.y
      });

      npc.points.push({
        x: npc.x,
        y: npc.y
      });
    }

    if (!!glob.key && !needReset) {
      //key arrow left pressed
      if (37 === glob.key) {
        if (player.movements.left) {
          player.x -= player.speed * modifier;
          player.direction = DIRECTIONS.LEFT;
          player.movements = {
            left: false,
            right: false,
            up: true,
            down: true
          }
        }
      }
      //key arrow up pressed
      if (38 === glob.key) {
        if (player.movements.up) {
          player.y -= player.speed * modifier;
          player.direction = DIRECTIONS.UP;
          player.movements = {
            left: true,
            right: true,
            up: false,
            down: false
          }
        }
      }
      //key arrow right pressed
      if (39 === glob.key) {
        if (player.movements.right) {
          player.x += player.speed * modifier;
          player.direction = DIRECTIONS.RIGHT;
          player.movements = {
            left: false,
            right: false,
            up: true,
            down: true
          }
        }
      }
      //key arrow down pressed
      if (40 === glob.key) {
        if (player.movements.down) {
          player.y += player.speed * modifier;
          player.direction = DIRECTIONS.DOWN;
          player.movements = {
            left: true,
            right: true,
            up: false,
            down: false
          }
        }
      }
    }

    //Check if player passed for a point where the npc previously passed
    if (!needReset) {
      needReset = npc.points.some(function(point, index, arr) {
        return _.isEqual(point, {
          x: player.x,
          y: player.y
        });
      });

      if (needReset) {
        crasher = CRASHER.PLAYER;
        resetCaller = "Player crashed with light of npc";
      }
    }

    //Check if npc passed for a point where the npc previously passed
    if (!needReset) {
      needReset = player.points.some(function(point, index, arr) {
        return _.isEqual(point, {
          x: npc.x,
          y: npc.y
        });
      });

      if (needReset) {
        crasher = CRASHER.NPC;
        resetCaller = "NPC crashed with light of npc";
      } else {
        if (!needReset && !!npc.chooseMove) {
          npc.chooseMove(false);
        }
      }
    }
    //Ties in horizontal lines
    if (player.y === npc.y && !needReset) {
      if (player.direction === DIRECTIONS.RIGHT && npc.direction === DIRECTIONS.LEFT && (player.x + 1) >= (npc.x - 1)) {
        needReset = true;
        crasher = CRASHER.TIE;
        resetCaller = "Player y and npc y are equal, directions where RIGHT and LEFT respectivly";
      } else if (player.direction === DIRECTIONS.LEFT && npc.direction === DIRECTIONS.RIGHT && (player.x - 1) >= (npc.x + 1)) {
        needReset = true;
        crasher = CRASHER.TIE;
        resetCaller = "Player y and npc are equal, player LEFT and npc RIGHT";
      }
    } else if (player.x === npc.x && !needReset) {
      if (player.direction === DIRECTIONS.DOWN && npc.direction === DIRECTIONS.UP && (player.y + 1) >= (npc.y - 1)) {
        needReset = true;
        crasher = CRASHER.TIE;
        resetCaller = "Player x and npc are equal, player going down and npc going up";
      } else if (player.direction === DIRECTIONS.UP && npc.direction === DIRECTIONS.DOWN && (player.y - 1) >= (npc.y + 1)) {
        needReset = true;
        crasher = CRASHER.TIE;
        resetCaller = "Player x and npc are equal, player going up and npc going down";
      }
    }

    //You just touched the limits, you lose
    if (!needReset) {
      //This make the scenario reset if someone touch the edges
      if ((player.x + 5) >= __width || player.x <= 0 || player.y <= 0 || (player.y + 5) >= __height) {
        needReset = true;
        crasher = CRASHER.PLAYER;
        resetCaller = "Player touched the edge";
      }
      if ((npc.x + 5) >= __width || npc.x <= 0 || npc.y <= 0 || (npc.y + 5) >= __height) {
        crasher = CRASHER.NPC;
        needReset = true;
        resetCaller = "NPC touched the edge";
      }
    }

    if (needReset) {
      glob.resetScenario(crasher, resetCaller);
    }
  }
  glob.updateGame = updateGame;

  glob.player = player;
  glob.npc = npc;
  glob.score = score;

  function mainLoop() {
    var now = Date.now(),
      delta = now - glob.then;

    glob.then = now;

    glob.updateGame(Math.round(delta / 1000));
    glob.render();

    //Request the update ASAP
    requestAnimationFrame(mainLoop);
  }
  glob.ctx = ctx;
  glob.mainLoop = mainLoop;
  glob.then = Date.now();

  //FIXME: Change this for a button call or something
  glob.resetScenario();
  //glob.mainLoop();
})(glob.canvas);
