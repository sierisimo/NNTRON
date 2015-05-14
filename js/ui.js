var glob = {
    canvas: (function(doc) {
      var can = doc.getElementById('nntron-canvas');
      can.setAttribute('width', 512);
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
    npcImg = new Image();

  glob.ctx = canvas.getContext("2d");

  bgImage.onload = function() {
    bgReady = true;
  };
  bgImage.src = "img/background.png";

  playerImg.onload = function() {
    playerImgReady = true;
  };
  playerImg.src = "img/player.png";

  npcImg.onload = function() {
    npcImgReady = true;
  };
  npcImg.src = "img/npc.png";

  function render() {
    var ctx = glob.ctx;
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
})(glob.canvas);
