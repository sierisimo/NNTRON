glob.scoreEvent = document.createEvent('CustomEvent');
glob.scoreEvent.initCustomEvent('scoreEvent',false,false,null);

(function(){
  document.getElementById('play').addEventListener('click',function(){
    glob.mainLoop();
  });

  document.getElementById('reset').addEventListener('click',function () {
    glob.score = [0,0];
    glob.resetScenario()

    dispatchEvent(glob.scoreEvent);
  });
})();

addEventListener('scoreEvent', function(){
  document.getElementById('score-player').innerHTML = glob.score[0];
  document.getElementById('score-npc').innerHTML = glob.score[1];
});
