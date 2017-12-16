var layerAsset={
  
};
//нажатие на клетку

//#TODO перенести

var BD1=[];
for (var i = 0, l = holstH; i < l; i++) {
  var arr = [];
  for (var iW = 0, lW = holstW; iW < lW; iW++) { 
    arr[iW]=[];
  }
  BD1[i]=arr;
} 

// console.warn(BD1);

layerTiles.on('mousedown mouseover', function (evt) {

  // layer.on('mousemove', function(evt) {

  if (evt.type == "mousedown" || mouseL) { //если мышь нажата
    var box = evt.target;
    box.name(TE.selected.sample);
    // console.log(box);
    // box.fill(sample);
    box.fillPatternImage(testIMG);//заливаем клетку изображением
    
    // layer.draw();
    box.draw();

    // box.batchDraw();
    // layerTiles.batchDraw();
    // addLayer(TE.selected.sample, testIMG);
    

    var X = box.x() / boxSize;
    var Y = box.y() / boxSize;
    BD1[Y][X][0] = TE.selected.sample;
    BD1[Y][X][1] = TE.selected.color;
    console.log(X,Y,BD1[Y][X]); 


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
 