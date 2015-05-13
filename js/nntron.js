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

  glob.player = player;
  glob.npc = npc;
  glob.points = points;
})();
