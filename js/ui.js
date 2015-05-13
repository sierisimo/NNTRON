var glob = {
  canvas: (function(doc) {
    return doc.getElementById('nntron-canvas');
  })(document)
};

(function (canvas){
  glob.ctx = canvas.getContext("2d");
})(glob.canvas);
