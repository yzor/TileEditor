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
    layerNum.destroyChildren(); //очистить слой

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
        // fill: 'darkgrey',
        // fill:"gold",
        // fill:"#141414 ", 
        fill:"#1F1F1F", 
        cornerRadius: boxSize/4   ,
        // cornerRadius: boxSize   ,

        // stroke: 'white',
        stroke: 'gold',
        // stroke: 'black',

        strokeWidth: 2,
        offsetY: boxSize / 2, //центрировать длинные строки по высоте
        offsetX: boxSize / 2,
        y: boxSize / 2, //центрировать длинные строки по высоте
        x: boxSize / 2,
        scale: {
            x: 0.9 ,  
            y: 0.9 
        },
        opacity: 0
    });
    txtGroup.on('mouseover', function () { //наведение на символ
        var box = this.children[0];
        var txt = this.children[1]; 
        // box.fill("white");
        // path.fill("rgba(225, 225, 225, 0.9)");
        box.opacity(1);
        layerNum.batchDraw();
    });
    txtGroup.on('mouseout', function () {
        var box = this.children[0];
        var txt = this.children[1]; 

        // box.fill("rgba(225, 225, 225, 0.3)");
        // box.fill("gold");
        box.opacity(0);
        layerNum.batchDraw();
    });
    txtGroup.add(txtBox, txtTxt);




    // console.log('%c%s', 'background: gold; color:black;', " ", holstH, "штук \n", boxSize, "размер \n", holstW, "ширина схемы \n", boxSize, "штук \n", boxSize, "штук \n", boxSize, "штук \n"); //test

    var lineNumberingL = new Konva.Group({ // ← левая шкала
        x: -boxSize
    });
    var lineNumberingR = new Konva.Group({ // → правая шкала
        x: boxSize * holstW
    });
    var lineNumberingT = new Konva.Group({ // ↑ верхняя шкала
        y: -boxSize
    });
    var lineNumberingB = new Konva.Group({ // ↓ нижняя шкала
        y: boxSize * holstH
    });

    var numType = TE.scheme.num;
    var numXType = TE.scheme.numX;


    //Получение номера учитывая нумерацию
    function txtNum(n, RL) {
        // n=n*11;
        if (numType == 0) { //реверс
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
            // if (RL == "R") n = "";
            if (RL == "L") n = ""; //откл левую колонку
        } else if (numType == 3) { //123
            if (RL == "L") n = ""; //откл левую колонку
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

        //бокс цифры
        var elem = txtGroup.clone({
            y: i * boxSize //смещение на размер равный одной клетке
        });

        //левая нумерация
        var elem2 = elem.clone();
        var txt2 = elem2.children[1];
        txt2.text(txtNum(i, "L"));
        txtCentering(txt2);
        lineNumberingL.add(elem2);

        //правая нумерация
        var txt1 = elem.children[1]; //текстовый слой
        txt1.text(txtNum(i, "R"));
        txtCentering(txt1);
        lineNumberingR.add(elem);
    }

    //Горизонтальная нумерация
    for (var i = 0, l = holstW; i < l; i++) {

        //бокс цифры
        var elem = txtGroup.clone({
            x: i * boxSize //смещение на размер равный одной клетке
        });
        var n;
       
        if (numXType == 0) {
            n = "";
        } else if (numXType == 1) {
            n =  holstW - i;
        } else if (numXType == 2) {
            n = i + 1;
        }


        // console.warn(i2);

        var txt1 = elem.children[1]; //текстовый слой
        // txt1.text(txtNum(i, "R"));
        txt1.text(n);
        txtCentering(txt1);
        lineNumberingT.add(elem);
        lineNumberingB.add(elem.clone());
    }



    // layerTiles.add(lineNumberingT, lineNumberingB);
    // layerTiles.add(lineNumberingR, lineNumberingL);
    // layerTiles.draw();
    layerNum.add(lineNumberingT, lineNumberingB);
    layerNum.add(lineNumberingR, lineNumberingL);
    layerNum.draw();
}
schemeNumbering();
stageEditor.add(layerNum);

//рапорт
function schemeRaport(params) {

}