var glob = {
  canvas: (function(doc) {
    return doc.getElementById('nntron-canvas');
  })(document)
};

(function(canvas) {
  var bgReady = playerImgReady = npcImgReady = false,
    bgImage = new Image(),
    playerImg = new Image(),
    npcImg = new Image();

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

  glob.ctx = canvas.getContext("2d");
})(glob.canvas);
