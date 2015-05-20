var glob = {
    canvas: (function(doc) {
      var can = doc.getElementById('nntron-canvas');
      can.setAttribute('width', 600);
      can.setAttribute('height', 480);
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
      ctx.drawImage(playerImg, glob.player.x, glob.player.y);
    }
    if (npcImgReady) {
      ctx.drawImage(npcImg, glob.npc.x, glob.npc.y);
    }

    //Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Points: " + glob.points[0] + " - " + glob.points[1], 32, 32);
  }
  glob.render = render;

  var player = {
      speed: 256,
      movements: {
        up: true,
        down: true,
        left: false,
        right: false
      },
      x: 0,
      y: 0
    },
    //TODO: Make a better npc for letting the game beign really intelligent
    npc = {
      speed: 256,
      movements: {
        up: true,
        down: true,
        left: false,
        right: false
      },
      level: 0,
      x: 0,
      y: 0
    },
    //Points in the form: player, npc
    points = [0, 0];

  glob.keys = {};

  addEventListener('keydown', function(e) {
    glob.keys[e.keyCode] = true;
  }, false);

  addEventListener('keyup', function(e) {
    delete glob.keys[e.keyCode];
  }, false);

  function resetScenario() {
    //TODO: change coordenates for put the motocycles on a specific point
    this.player.x = canvas.width / 2;
    this.player.y = canvas.height / 2;

    this.npc.x = 32 + (Math.random() * (canvas.width - 64));
    this.npc.y = 32 + (Math.random() * (canvas.height - 64));
  }
  glob.resetScenario = resetScenario;

  function updateGame(modifier) {
    var player = glob.player,
      npc = glob.npc;
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

    // Are they touching?
    //FIXME: This part checks if they are in the same place
    if (player.x <= (npc.x + 32) && npc.x <= (player.x + 32) && player.y <= (npc.y + 32) && npc.y <= (player.y + 32)) {
      ++glob.points[0];

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
