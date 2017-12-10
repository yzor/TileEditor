var layerAsset={
  
};
layerTiles.on('mousedown mouseover', function (evt) {

  // layer.on('mousemove', function(evt) {

  if (evt.type == "mousedown" || mouseL) { //если мышь нажата
    var box = evt.target;
    // console.log(box);
    // box.fill(sample);
    box.fillPatternImage(testIMG);//заливаем клетку изображением
    // layer.draw();
    // box.draw();

    // box.batchDraw();

    layerTiles.batchDraw();
    // addLayer(TE.selected.sample, testIMG);
    console.log(box.x(), box.y());
  }
  // console.log(evt);
  /*mouseDown = false;
  // Зажата клавиша мыши
  window.onmousedown = function(){
        mouseDown = true;
  };
          
  // Отпущена клавиша мыши
  window.onmouseup = function(){
        mouseDown = false;
  };

  if (mouseDown){
    console.log("зажата");
  }else{
    console.log("Отпущна");    
  }*/


});



var mouseL; //флаг о нажатии мыши
$(document).mousedown(function (e) {
  if (e.which == 1) {
    mouseL = true;//нажал мышь
  }
});
$(document).mouseup(function (e) {
  if (e.which == 1) {
    //console.log("отжал");
    mouseL = false;//отжал мышь
  }
});
 