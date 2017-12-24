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

// layer.on('mousemove', function(evt) {
//КликКлак
layerTiles.on('touchstart mousedown mouseover', function (evt) {
  var box = evt.target;
  var X = box.x() / boxSize;
  var Y = box.y() / boxSize;
  // console.warn(X,Y,evt.target  ); 
  if (evt.type == "mousedown" || mouseL) { //если мышь нажата
    if (keySpace) { //если нажат пробел
      // layerTiles.draggable(true);//включить перетаскивание
      return false; //не продолжать
    } else if (evt.evt.ctrlKey) { //если нажат контрол
      sample = BD1[Y][X][0];
      color = BD1[Y][X][1];
      console.log('%c%s', 'color: gold;', evt.evt.ctrlKey);
      if (sample) {
        TE.selected.sample = sample
      }
      if (color) {
        TE.selected.color = color
      }
      selectSample();
      // console.log('%c%s', 'color: red;', BD1[Y][X][0]);
      // console.log('%c%s', 'color: red;', BD1[Y][X][1]);
      return false; //не продолжать
    }
    // console.log(evt);
    var sample = BD1[Y][X][0];
    var color = BD1[Y][X][1];
    if (color || sample) { //(protect) если клетка уже закрашена
      if (sample == TE.selected.sample && color == TE.selected.color) { //клетка==выбраный образец
        //#TODO сдeлать чтобы при нажатии запоминался инструмент(карандаш/стёрка) 
        //и сохранялся до отпускания мыши



        // BD1[Y][X][0]=false;
        // BD1[Y][X][1]=false;
        // box.fill("red");
        // box.draw();
      } else if(TE.options.protect){ //клетка отличается от выбранного образца и защита включена
        //#TODO чтобы анимация не начиналась каждый раз заново - повесить счётчик
       //Если счётчик превышает n нажатий то делать шейк
       //Если одна и таже клетка второй раз подряд, то делать шейк
        console.log('%c%s', 'background: red;', "detect");
        // if (TE.options.protect) { //Если защита включена, то закругляемся
        var $elm = $("#TEprotect")
        $elm.removeClass("detect");
        setTimeout(function () {
          $elm.addClass("detect");
        }, 0);
          // console.log(TE.options.protect);
          return false;//не продолжать
        // }
      }


      // console.log("клетка  уже закрашена");





    }


    box.name(TE.selected.sample);
    // console.log(box);
    // box.fill(sample);
    box.fillPatternImage(testIMG); //заливаем клетку изображением

    // layer.draw();
    box.draw();

    // box.batchDraw();
    // layerTiles.batchDraw();
    // addLayer(TE.selected.sample, testIMG);


    // var X = box.x() / boxSize;    
    // var Y = box.y() / boxSize;
    BD1[Y][X][0] = TE.selected.sample;
    BD1[Y][X][1] = TE.selected.color;
    // console.log(X, Y, BD1[Y][X]);


  }
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
  if (keySpace) { //если флаг уже поставлен то не продолжать 
    return false; //#TODO проверить есть ли профит от данной конструкции
  }
  if (e.which == 32) { //32-пробел
    e.preventDefault(); //отключить действие по умолчанию
    console.log('%c%s', 'color: gold;', "↓", e.which);
    keySpace = true; //нажал
    document.body.style.cursor = 'move'; //ставим курсор перетаскивания
    //#TODO grab, grabbing
    layerTiles.draggable(true); //разрешаем перетаскивать слой с тайлами
  }
  console.log(e.which); 
  if (e.which == 16) { //16-шифт
    e.preventDefault(); //отключить действие по умолчанию
    console.log('%c%s', 'color: gold;', "↓", e.which);
    // keySpace = true; //нажал
    // document.body.style.cursor = 'move'; //ставим курсор перетаскивания 
    fastDrag();
  }
  if (e.which == 18) { //18-Alt
    e.preventDefault(); //отключить действие по умолчанию
    console.log('%c%s', 'color: gold;', "↓", e.which);
    // keySpace = true; //нажал
    // document.body.style.cursor = 'move'; //ставим курсор перетаскивания 
    fastDrag2();
  }
});

$(document).keyup(function (e) { //отжал клаву 
  if (e.which == 32) { //32-пробел
    console.log('%c%s', 'color: green;', "↑", e.which);
    keySpace = false; //отжал 
    document.body.style.cursor = 'default'; //возвращаем курсор
    layerTiles.draggable(false); //запрещаем перетаскивать слой с тайлами
  }

  if (e.which == 16) { //16-шифт
    console.log('%c%s', 'color: green;', "↑", e.which);
    keySpace = false; //отжал 
    document.body.style.cursor = 'default'; //возвращаем курсор
    fastDragOFF();
  } 
  if (e.which == 18) { //18-Alt
    console.log('%c%s', 'color: green;', "↑", e.which);
    keySpace = false; //отжал 
    document.body.style.cursor = 'default'; //возвращаем курсор
    fastDragOFF2();
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