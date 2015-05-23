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
  w = window,
  requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

(function(canvas) {
  var bgReady = playerImgReady = npcImgReady = false,
    bgImage = new Image(),
    playerImg = new Image(),
    npcImg = new Image(),
    ctx = canvas.getContext("2d");

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
    var ctx = ctx || glob.ctx;

    if (bgReady) {
      ctx.drawImage(bgImage, 0, 0);
    }
    if (playerImgReady) {
      //glob.player.x += 1;
      ctx.drawImage(playerImg, glob.player.x , glob.player.y);
    }
    if (npcImgReady) {
      ctx.drawImage(npcImg, glob.npc.x, glob.npc.y);
    }
  }
  glob.render = render;

  var player = {
      speed: __speed,
      movements: {
        up: true,
        down: true,
        left: false,
        right: false
      },
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
      level: 0,
      x: 0,
      y: 0
    },
    points = [0, 0]; //Points in the form: player, npc

  glob.keys = {};

  addEventListener('keydown', function(e) {
    glob.keys[e.keyCode] = true;
  }, false);

  addEventListener('keyup', function(e) {
    delete glob.keys[e.keyCode];
  }, false);

  function resetScenario() {
    this.player.x = __width / 4;
    this.player.y = __height / 2;
    this.player.points = [];
    this.player.movements = {
      up: true,
      down: true,
      left: false,
      right: false
    };

    this.npc.x = (__width / 4) * 3;
    this.npc.y = __height / 2;
    this.npc.points = [];
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
      npc = glob.npc, needReset = false;
    if (37 in glob.keys) {
      player.x -= player.speed * modifier;
    }

    if (38 in glob.keys) {
      player.y -= player.speed * modifier;
    }

    if (39 in glob.keys) {
      player.x += player.speed * modifier;
    }

    if (40 in glob.keys) {
      player.y += player.speed * modifier;
    }

    //You just touched the limits, you lose
    if ((player.x + 5) >= __width || player.x <= 0 || player.y <= 0 || (player.y + 5) >= __height){
      glob.points[1]++;
      needReset = true;
    }
    if ((npc.x + 5) >= __width || npc.x <= 0 || npc.y <= 0 || (npc.y + 5) >= __height){
      glob.points[0]++;
      needReset = true;
    }

    if(needReset){
      glob.resetScenario();
    }
  }
  glob.updateGame = updateGame;

  glob.player = player;
  glob.npc = npc;
  glob.points = points;

  function mainLoop() {
    var now = Date.now(),
      delta = now - glob.then;

    glob.then = now;

    glob.updateGame(delta / 1000);
    glob.render();

    //Request the update ASAP
    requestAnimationFrame(mainLoop);
  }
  glob.ctx = ctx;
  glob.mainLoop = mainLoop;
  glob.then = Date.now();

  //FIXME: Change this for a button call or something
  glob.resetScenario();
  glob.mainLoop();
})(glob.canvas);
