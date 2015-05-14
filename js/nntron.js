(function() {
  var canvas = glob.canvas,
    player = {
      speed: 256,
      x: 0,
      y: 0
    },
    //TODO: Make a better npc for letting the game beign really intelligent
    npc = {
      level: 0,
      x: 0,
      y: 0
    },
    //Points in the form: player, npc
    points = [0, 0];

  glob.keys = {};
  //TODO: Delete this two and check for keypress
  /*
    addEventListener('keypress', function(e){
      //DO STUFF
      glob.keys[e.keyCode]
    }, false);
  */

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
  glob.mainLoop = mainLoop;
  glob.then = Date.now();

  //FIXME: Change this for a button call or something
  glob.resetScenario();
  glob.mainLoop();
})();
