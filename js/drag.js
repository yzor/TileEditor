//Fast Drag
//#TODO - тупо кешировать время от времени, и тогда обычный драг нормально работает
//проверить как поведут себя полупрозрачные/стёрка и т.д.


// var layerDrag = new Konva.FastLayer({
var layerDrag = new Konva.Layer({
  draggable: true,
  // opacity: 0.2,
  dragBoundFunc: function (pos) {
    // console.log(pos);
    layerTiles.x(pos.x);
    layerTiles.y(pos.y);
    layerTiles.draw();
    // layerTiles.batchDraw();
    layerNum.x(pos.x);
    layerNum.y(pos.y);
    layerNum.draw();
    // layerNum.batchDraw();

    return {
      x: pos.x,
      y: pos.y
      // y: this.getAbsolutePosition().y
    }
  }
});
layerDrag.on('mousedown touchstart', function () {
  console.log('mousedown touchstart');
  // group.setDraggable(false);
  // this.moveToTop();

});
layerDrag.on('dragstart', function () {
  console.log('dragstart');
  // layerTiles.hide();
  // layerNum.hide();
  // group.setDraggable(false);
  // this.moveToTop();
});
layerDrag.on('dragend', function () {
  console.log('dragend');
  // group.setDraggable(true);
  // layer.draw();
});
stageEditor.add(layerDrag); //add layer to stage


function fastDragOFF() {
  keySpace = false; //отжал 
  document.body.style.cursor = 'default'; //возвращаем курсор
  console.log("OFF tiles→", layerTiles.x(), layerTiles.y());
  console.log("OFF num  →", layerNum.x(), layerNum.y());
  console.log("OFF drag →", layerDrag.x(), layerDrag.y());
  // layerTiles.x(100);
  // layerTiles.y(100);
  // layerNum.x(100);
  // layerNum.y(100);
  layerDrag.hide();
  layerNum.show();
  layerTiles.show();
  layerNum.draw();
  layerTiles.draw();
  stageEditor.draw();
}

function fastDrag() {
  keySpace = true; //нажал
  document.body.style.cursor = 'move'; //ставим курсор перетаскивания 
  //v1 - img
  //v2 dragRect.fillPatternImage(img);//v2 - заливка...?


  //#TODO использовать  cache вместо img
  // node.cache({
  //   x: -30,
  //   y: -30,
  //   width: 100,
  //   height: 200,
  //   offset: 10,
  //   drawBorder: true
  // });
  // node.clearCache();



  var testPad = 110;
  testPad = 0;
  // return false; 
  layerDrag.destroyChildren(); //clear
  layerDrag.show();

  //координаты для копирования изображения
  var grabH = boxSize * (holstH + 2);
  var grabW = boxSize * (holstW + 2);
  var grabY = layerTiles.y() - boxSize;
  var grabX = layerTiles.x() - boxSize;
  /* 
    if (grabX % 1 !== 0) { //округление значений
      // console.error(grabX,"дробное"); 
      grabX = Math.floor(grabX);
      // console.error(grabX,"!!!!"); 
      grabW++;
    }
    if (grabY % 1 !== 0) {
      grabY = Math.floor(grabY);
      grabH++;
    } */




  layerDrag.setAttrs({ //подставляем координаты основного слоя
    x: layerTiles.x(),
    y: layerTiles.y()
  });


  var dragRect = new Konva.Rect({ //зона до прорисовки img
    x: -boxSize + testPad,
    y: -boxSize + testPad,
    width: grabW,
    height: grabH,
    fill: "red",
    stroke: "gold",
    strokeWidth: 2,
    opacity: 0 //прозрачный
  });
  layerDrag.add(dragRect);
  dragRect.draw();
  // layerDrag.draw();

  /* 
    var dragRectM = new Konva.Rect({
     // x:10,
     // y:10,
     width: 200,
     height: 200,
     fill: "green",
     stroke: "red",
     strokeWidth: 2
   });
   layerDrag.draw();
   // layerDrag.add(dragRectM);
    */


  var image = layerTiles.toImage({ //получаем изображение
    x: grabX,
    y: grabY,
    width: grabW,
    height: grabH,
    callback: function (img) {

      var imgFake = new Konva.Image({
        image: img,
        x: -boxSize + testPad,
        y: -boxSize + testPad,
      });

      layerTiles.hide(); //скрыть слой плиток
      layerDrag.add(imgFake); //добавить картинку плиток
      imgFake.draw();




      // layerDrag.draw(); console.log(imgFake);
      // layerNum.hide(); 
      // layerTiles.hide(); //скрыть плитки
      // stageEditor.draw(); 
      // dragRect.fillPatternImage(img);//v2 - заливка...?
    }
  });
  image = layerNum.toImage({ //получаем изображение
    x: grabX,
    y: grabY,
    width: grabW,
    height: grabH,
    callback: function (img) {

      var imgFake = new Konva.Image({
        image: img,
        x: -boxSize + testPad,
        y: -boxSize + testPad,
      });
      layerNum.hide(); //скрыть слой нумерации
      layerDrag.add(imgFake); //добавить картинку нумерации

      // layerDrag.draw(); console.log(imgFake);
      // layerNum.hide(); 
      // layerTiles.hide(); //скрыть плитки
      // stageEditor.draw();
      // dragRect.fillPatternImage(img);//v2 - заливка...?
    }
  });

  // layerDrag.show();
  // layerDrag.draw(); 
  // layerNum.hide();
  // layerTiles.hide();  
}
// fastDrag();



function fastDrag2() {
  keySpace = true; //нажал
  document.body.style.cursor = 'move'; //ставим курсор перетаскивания 
  console.log("fastDrag2");
  layerTiles.draggable(true);
  layerTiles.cache({
    // x: 50 ,
    // y: 50 ,
    // width: 150,
    // height: 150, 
    // offset: 10,
    // pixelRatio:1, 
    drawBorder: true
  }); /**/


  layerTiles.draw();
}

function fastDragOFF2() {
  keySpace = false; //отжал 
  document.body.style.cursor = 'default'; //возвращаем курсор
  layerTiles.draggable(false);
  // layerTiles.clearCache();
  console.log("fastDrag2 OFF");

}