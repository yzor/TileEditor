var layerAsset = {

};
//нажатие на клетку

//#TODO перенести

var BD1 = [];
for (var i = 0, l = holstH; i < l; i++) {
  var arr = [];
  for (var iW = 0, lW = holstW; iW < lW; iW++) {
    arr[iW] = [];
  }
  BD1[i] = arr;
}

// console.warn(BD1);

layerTiles.on('mousedown mouseover', function (evt) {

  // layer.on('mousemove', function(evt) {

  // layerTiles.opacity(1);
  // layerTiles.draw();
  //КликКлак
  if (evt.type == "mousedown" || mouseL) { //если мышь нажата
    if (keySpace) { //если нажат пробел
      // layerTiles.draggable(true);//включить перетаскивание
      return false;//не продолжать
    }
    var box = evt.target;
    box.name(TE.selected.sample);
    // console.log(box);
    // box.fill(sample);
    box.fillPatternImage(testIMG); //заливаем клетку изображением

    // layer.draw();
    box.draw();

    // box.batchDraw();
    // layerTiles.batchDraw();
    // addLayer(TE.selected.sample, testIMG);


    var X = box.x() / boxSize;
    var Y = box.y() / boxSize;
    BD1[Y][X][0] = TE.selected.sample;
    BD1[Y][X][1] = TE.selected.color;
    // console.log(X, Y, BD1[Y][X]);


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
$(document).mousedown(function (e) { //нажал мышь
  if (e.which == 1) {
    // console.log(e);
    mouseL = true; //нажал мышь
  }
});
$(document).mouseup(function (e) { //отжал мышь
  if (e.which == 1) {
    //console.log("отжал");
    mouseL = false; //отжал мышь
  }
});


var keySpace; //флаг о нажатии мыши
$(document).keydown(function (e) { //нажал клаву
  e.preventDefault(); //отключить действие по умолчанию
  if (keySpace) { //если флаг уже поставлен то не продолжать 
    return false; //#TODO проверить есть ли профит от данной конструкции
  }

  if (e.which == 32) { //32-пробел
    console.log('%c%s', 'color: gold;', "↓", e.which);
    keySpace = true; //нажал
    document.body.style.cursor = 'move';//ставим курсор перетаскивания
    //#TODO grab, grabbing
    layerTiles.draggable(true);//разрешаем перетаскивать слой с тайлами
  }
});

$(document).keyup(function (e) { //отжал клаву 
  if (e.which == 32) {
     console.log('%c%s', 'color: green;', "↑", e.which);
    keySpace = false; //отжал 
    document.body.style.cursor = 'default';//возвращаем курсор
    layerTiles.draggable(false);//запрещаем перетаскивать слой с тайлами
  }
});


/*
 $(document).keypress(function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  console.log('%c%s', 'color: red;', "↓", code);
  console.log('%c%s', 'color: red;', "↓", e.which);
  if (e.which == 1) {
    console.log("отжал");
    mouseL = false; //отжал мышь
  }
 });
*/
// $(document).bind('keypress', function (e) {

//   // $('#keydiv').html($('#keydiv').html() + code + ' ');
// });
// // $('#myinput').bind('keypress', function (e) {
// //   var code = (e.keyCode ? e.keyCode : e.which);
// //   $('#keydiv').html($('#keydiv').html() + code + ' ');
// //  //