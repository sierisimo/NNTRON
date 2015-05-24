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
  DIRECTIONS = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
  },
  w = window,
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

(function(canvas) {
    var bgReady = playerImgReady = npcImgReady = false,
      bgImage = new Image(),
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

    bgImage.onload = function() {
      bgReady = true;
    };
    bgImage.src = "img/cyber.jpg";

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

      player.points.push({
        x: player.x,
        y: player.y
      });

      if (player.direction === DIRECTIONS.RIGHT) {
        player.x += 1;
      } else if (player.direction === DIRECTIONS.LEFT) {
        player.x -= 1;
      } else if (player.direction === DIRECTIONS.UP) {
        player.y -= 1;
      } else if (player.direction === DIRECTIONS.DOWN) {
        player.y += 1;
      }

      if (npc.direction === DIRECTIONS.LEFT) {
        npc.x -= 1;
      } else if (npc.direction === DIRECTIONS.LEFT) {
        npc.x -= 1;
      } else if (npc.direction === DIRECTIONS.UP) {
        npc.y -= 1;
      } else if (npc.direction === DIRECTIONS.DOWN) {
        npc.y += 1;
      }

      if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
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
      // glob.keys[e.keyCode] = true;
      glob.key = e.keyCode;
    }, false);

    addEventListener('keyup', function(e) {
      // delete glob.keys[e.keyCode];
      delete glob.key;
    }, false);

    function resetScenario() {
      this.player.x = __width / 4;
      this.player.y = __height / 2;
      this.player.movements = [];
      this.player.direction = DIRECTIONS.RIGHT;
      this.player.movements = {
        up: true,
        down: true,
        left: false,
        right: false
      };

      this.npc.x = (__width / 4) * 3;
      this.npc.y = __height / 2;
      this.npc.movements = [];
      this.npc.direction = DIRECTIONS.LEFT;
      this.npc.movements = {
        up: true,
        down: true,
        left: false,
        right: false
      };
    }
    glob.resetScenario = resetScenario;

    function updateGame(modifier) {
      var player = glob.player,
        npc = glob.npc,
        needReset = false;
      if (!!glob.key) {
        //key arrow left pressed
        if (37 === glob.key){
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

    if ((player.movements.up && npc.movements.down) && (player.y - 5) >= npc.y && player.x == npc.x) {
      needReset = true;
    }
    //FIXME: Patch fast
    if ((player.movements.right && npc.movements.left) && (player.x + 5) >= npc.x && player.y == npc.y) {
      needReset = true;
    }

    //You just touched the limits, you lose
    if (!needReset) {
      if ((player.x + 5) >= __width || player.x <= 0 || player.y <= 0 || (player.y + 5) >= __height) {
        glob.score[1]++;
        needReset = true;
      }
      if ((npc.x + 5) >= __width || npc.x <= 0 || npc.y <= 0 || (npc.y + 5) >= __height) {
        glob.score[0]++;
        needReset = true;
      }
    }

    if (needReset) {
      glob.resetScenario();
    }
  }
  glob.updateGame = updateGame;

  glob.player = player; glob.npc = npc; glob.score = score;

  function mainLoop() {
    var now = Date.now(),
      delta = now - glob.then;

    glob.then = now;

    glob.updateGame(delta / 1000);
    glob.render();

    //Request the update ASAP
    requestAnimationFrame(mainLoop);
  }
  glob.ctx = ctx; glob.mainLoop = mainLoop; glob.then = Date.now();

  //FIXME: Change this for a button call or something
  glob.resetScenario(); glob.mainLoop();
})(glob.canvas);
