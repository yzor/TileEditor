//нумерация
var layerNum = new Konva.Layer({
  // x: 65,
  // y: 15,
  x: Math.floor(widthScreen / 2 - (holstW * boxSize) / 2),
  y: Math.floor(heightScreen / 2 - (holstH * boxSize) / 2),
  // draggable: true,
  // dragBoundFunc: function (pos) {
  //   // console.log(pos);
  //   layerTiles.x(pos.x);
  //   layerTiles.y(pos.y);
  //   // layerTiles.draw();
  //   layerTiles.batchDraw();

  //   return {
  //     x: pos.x,
  //     y: pos.y
  //     // y: this.getAbsolutePosition().y
  //   }
  // }
});

function schemeNumbering() {
  layerNum.destroyChildren();

  var txtPad = boxSize / 5; //отступ текста
  var txtSize = boxSize - txtPad * 2; //размер текста
  var txtGroup = new Konva.Group({ //группа для блока нумерации
    // x: boxSize * holstH, 
    // x: -boxSize,
    // y: i * (boxSize + 0)
  });
  var txtTxt = new Konva.Text({ //Текст
    text: "?",
    // text: i2  * 11 - 2  ,
    // text: i2,
    fontSize: txtSize,
    padding: txtPad,
    fill: 'gold', //цвет текста
    /*     
          x: 0,
          y: 0,
          align: 'right', //can be left, center, or right
          width: boxSize * 2,
          fontFamily: 'Calibri',
          width: 300,
          fontSize: 50,
          padding: 10,
          fontSize: 18,
          lineHeight: 1
          stroke: "white",
          strokeWidth: 6,
          dash: [0.4, 4] */
  });
  var txtBox = new Konva.Rect({ //подложка(опционально)
    width: boxSize,
    height: boxSize,
    fill: 'darkgrey',

    stroke: 'red',
    strokeWidth: 1,
    offsetY: boxSize / 2, //центрировать длинные строки по высоте
    offsetX: boxSize / 2,
    y: boxSize / 2, //центрировать длинные строки по высоте
    x: boxSize / 2,
    scale: {
      x: 0.8,
      y: 0.8
    },
    opacity: 0.05




  });
  txtGroup.add(txtBox, txtTxt);




  // console.log('%c%s', 'background: gold; color:black;', " ", holstH, "штук \n", boxSize, "размер \n", holstW, "ширина схемы \n", boxSize, "штук \n", boxSize, "штук \n", boxSize, "штук \n"); //test

  var scaleL = new Konva.Group({ // ←
    x: -boxSize
  });
  var scaleR = new Konva.Group({ // →
    x: boxSize * holstW
  });
  var scaleT = new Konva.Group({ // ↑
    y: -boxSize
  });
  var scaleB = new Konva.Group({ // ↓
    y: boxSize * holstH
  });

  var numType = TE.scheme.num;


  //Получение номера учитывая нумерацию
  function txtNum(n, RL) {
    // n=n*11;
    if (0) { //реверс
      n++;
    } else {
      n = holstH - n; //реверс нумерации
    }
    if (numType == 0) {

    } else if (numType == 1) { //1 3 5
      if (n % 2 == 0) { //чётное  число
        if (RL == "R") n = "";
      } else { //Нечётное
        if (RL == "L") n = "";
      }
    } else if (numType == 2) { //135
      n = n * 2 - 1; //135
    } else if (numType == 3) { //123
    }


    return n;
  }

  //Центрирование текста в клетке
  function txtCentering(elem) {
    if (elem.width() > boxSize) { //если ширина текста - больше клетки, то скукоживаем
      elem.setAttrs({
        offsetY: boxSize / 2, //центрировать длинные строки по высоте
        y: boxSize / 2, //центрировать длинные строки по высоте
        scale: { //маштабирование длинной строки для умещения в клетку
          x: boxSize / elem.width(),
          y: boxSize / elem.width()
        }
      });
    } else { //если ширина текста - меньше клетки, то центрируем
      elem.setAttrs({
        align: 'center',
        width: boxSize //указываем ширину явно для центрирования
      });
    }
  }

  //Вертикальная нумерация
  for (var i = 0, l = holstH; i < l; i++) {
    var elem = txtGroup.clone({
      y: i * boxSize //смещение на размер равный одной клетке
    });
    //левая нумерация
    var elem2 = elem.clone();
    var txt2 = elem2.children[1];
    txt2.text(txtNum(i, "L"));
    txtCentering(txt2);
    scaleL.add(elem2);

    //правая нумерация
    var txt1 = elem.children[1]; //текстовый слой
    txt1.text(txtNum(i, "R"));
    txtCentering(txt1);
    /* 
        if (txt1.width() > boxSize) { //если ширина текста - больше клетки, то скукоживаем
          txt1.setAttrs({
            offsetY: boxSize / 2, //центрировать длинные строки по высоте
            y: boxSize / 2, //центрировать длинные строки по высоте
            scale: { //маштабирование длинной строки для умещения в клетку
              x: boxSize / txt1.width(),
              y: boxSize / txt1.width()
            }
          });
        } else { //если ширина текста - меньше клетки, то центрируем
          txt1.setAttrs({
            align: 'center',
            width: boxSize //указываем ширину явно для центрирования
          });
        } */
    scaleR.add(elem);
    // scaleR.add(elem.clone());
    // txt1.text(txtNum(i, "L"));






    // console.log(elem.children[1]);
    // console.log(elem.getChildren()[1]    ) ;








    ///////////////////////////////////////////////////////////////////////////////////
    // console.log(i, txtNum(i) + "");
    // //группа нумерации
    // var group = new Konva.Group({
    //   // x: boxSize * holstH, 
    //   // x: -boxSize,
    //   y: i * (boxSize + 0)
    // });

    // var box = new Konva.Rect({
    //   width: boxSize,
    //   height: boxSize,
    //   fill: 'darkgrey',

    //   stroke: 'red',
    //   strokeWidth: 1,
    //   offsetY: boxSize / 2, //центрировать длинные строки по высоте
    //   offsetX: boxSize / 2,
    //   y: boxSize / 2, //центрировать длинные строки по высоте
    //   x: boxSize / 2,
    //   scale: {
    //     x: 0.8,
    //     y: 0.8
    //   },
    //   opacity: 0.05




    // });

    // var i2 = i + 1;
    // var txt = new Konva.Text({
    //   text: txtNum(i, "L"),
    //   // text: i2  * 11 - 2  ,
    //   // text: i2,
    //   fontSize: txtSize,
    //   padding: txtPad,
    //   fill: 'gold', //цвет текста
    //   /*     
    //         x: 0,
    //         y: 0,
    //         align: 'right', //can be left, center, or right
    //         width: boxSize * 2,
    //         fontFamily: 'Calibri',
    //         width: 300,
    //         fontSize: 50,
    //         padding: 10,
    //         fontSize: 18,
    //         lineHeight: 1
    //         stroke: "white",
    //         strokeWidth: 6,
    //         dash: [0.4, 4] */
    // });
    // if (txt.width() > boxSize) { //если ширина текста - больше клетки, то скукоживаем
    //   txt.setAttrs({
    //     offsetY: boxSize / 2, //центрировать длинные строки по высоте
    //     y: boxSize / 2, //центрировать длинные строки по высоте
    //     scale: { //маштабирование длинной строки для умещения в клетку
    //       x: boxSize / txt.width(),
    //       y: boxSize / txt.width()
    //     }
    //   });
    // } else { //если ширина текста - меньше клетки, то центрируем
    //   txt.setAttrs({
    //     align: 'center',
    //     width: boxSize //указываем ширину явно для центрирования
    //   });
    // }

    // group.add(box, txt);


    ///////////////////////////////////////////////////////////////////////////////////
  }

  //Горизонтальная нумерация
  for (var i = 0, l = holstW; i < l; i++) {

    //группа нумерации
    var group = new Konva.Group({
      // x: boxSize * holstH, 
      // x: -boxSize,
      x: i * (boxSize + 0)
    });

    var box = new Konva.Rect({
      width: boxSize,
      height: boxSize,
      // fill: 'darkgrey',
      stroke: 'red',
      strokeWidth: 2
    });

    var i2 = i + 1;
    var txt = new Konva.Text({
      text: i2 /* * 11 - 2 */,
      fontSize: txtSize,
      padding: txtPad,
      fill: 'gold', //цвет текста
      /*     
            x: 0,
            y: 0,
            align: 'right', //can be left, center, or right
            width: boxSize * 2,
            fontFamily: 'Calibri',
            width: 300,
            fontSize: 50,
            padding: 10,
            fontSize: 18,
            lineHeight: 1
            stroke: "white",
            strokeWidth: 6,
            dash: [0.4, 4] */
    });
    if (txt.width() > boxSize) { //если ширина текста - больше клетки, то скукоживаем
      txt.setAttrs({
        offsetY: boxSize / 2, //центрировать длинные строки по высоте
        y: boxSize / 2, //центрировать длинные строки по высоте
        scale: { //маштабирование длинной строки для умещения в клетку
          x: boxSize / txt.width(),
          y: boxSize / txt.width()
        }
      });
    } else { //если ширина текста - меньше клетки, то центрируем
      txt.setAttrs({
        align: 'center',
        width: boxSize //указываем ширину явно для центрирования
      });
    }

    group.add(
      // box,
      txt);
    scaleT.add(group);
    scaleB.add(group.clone());


  }



  // layerTiles.add(scaleT, scaleB);
  // layerTiles.add(scaleR, scaleL);
  // layerTiles.draw();
  layerNum.add(scaleT, scaleB);
  layerNum.add(scaleR, scaleL);
  layerNum.draw();
}
schemeNumbering();
stageEditor.add(layerNum);

//рапорт
function schemeRaport(params) {

}