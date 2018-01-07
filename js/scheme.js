"use strict";
//Слой для тайлов
// var layerTiles = new Konva.FastLayer({
var layerTiles = new Konva.Layer({
    // grabX = Math.floor(grabX);
    // var holstW = 10; //ширина в клетках
    //var holstH = 30; //высота в клетках
    //var boxSize = 10; //размер клетки
    // x: qwe2x,
    // y: qwe2y,
    // draggable: true,
    dragBoundFunc: function (pos) {
        // console.log(pos);

        // layerNum.x(pos.x); //Также перемещать нумерацию
        // layerNum.y(pos.y);
        // layerRap.x(pos.x); //Также перемещать нумерацию
        // layerRap.y(pos.y); #TODO сравнить есть ли выйгрыш в производительности
        layerNum.position(pos);
        layerRap.position(pos);

        // layerNum.batchDraw();
        // layerRap.batchDraw();
        // layerNum.batchDraw();
        layerRap.draw();
        layerNum.draw();
        return {
            x: pos.x,
            y: pos.y
            // y: this.getAbsolutePosition().y
        }
    }
    // opacity: 0.1
});


/////////////////////////////
// generate boxes
//for (var ix = 0; ix < width / BOX_SIZE; ix++) {// noprotect
//for (var iy = 0; iy < height / BOX_SIZE; iy++) {// noprotect
//  for (var iy = 0; iy < height / BOX_SIZE; iy++) {// noprotect
//        for (var ix = 0; ix < width / BOX_SIZE; ix++) {// noprotect
var box;
var BD1 = [];

function gridTiles() {
    layerTiles.destroyChildren(); //очистить слой
    //центрирование схемы если умещается на экран
    //показать правый нижний угол если не умещается
    if (widthScreen < ((holstW + 2) * boxSize)) { //если ширина "канвы" меньше схемы учитывая нумерации...
        layerTiles.x(Math.floor(widthScreen - ((holstW + 1) * (boxSize)) - 4)); //-4 → правая панель | +1 → нумерация
    } else {
        layerTiles.x(Math.floor((widthScreen - (holstW * boxSize)) / 2));
    }
    if (heightScreen < (((holstH + 2) * boxSize) + 100)) { //если высота "канвы" меньше схемы учитывая нумерации... (100 → +50панель символов*2)
        layerTiles.y(Math.floor(heightScreen - ((holstH + 1) * (boxSize)) - 50)); //-50 → панель символов | +1 → нумерация
    } else {
        layerTiles.y(Math.floor((heightScreen - (holstH * boxSize)) / 2));
    }


    var groupGrid = new Konva.Group({ //группа с сеткой тайлов
        // x: 16,
        // y: 13,
        // draggable: true
    });
    //создание массива текущей схемы
    for (var i = 0, l = holstH; i < l; i++) {
        var arr = [];
        for (var iW = 0, lW = holstW; iW < lW; iW++) {
            arr[iW] = [];
        }
        BD1[i] = arr;
    }
    for (var iy = 0; iy < holstH; iy++) { // noprotect
        for (var ix = 0; ix < holstW; ix++) { // noprotect
            box = new Konva.Rect({
                //https://yzorrykodelie.ru/%F0%9F%8C%90/%D0%BB%D0%B8%D1%86%D0%B5%D0%B2%D0%B0%D1%8F.png
                //https://yzorrykodelie.ru/🌐/лицевая.png
                x: ix * boxSize,
                y: iy * boxSize,
                width: boxSize,
                height: boxSize,

                // x : ix * boxSize,
                // y : iy * boxSize,
                // width : boxSize - 1,
                // height : boxSize - 1,
                // fill : 'darkgrey',
                stroke: 'gold',
                // scaleX:1.1,
                // scaleY:1.1,
                strokeWidth: 1
            });
            groupGrid.add(box);
        }
    }
    layerTiles.add(groupGrid);
    layerTiles.draw();
    // as all boxes stay separately with no overlap
    // and they have no opacity
    // we can call 'box.draw()' and we will have expected result
    // REMEMBER that is this case box will be drawn on top of existing layer
    // without clearing
}

//нумерация
var layerNum = new Konva.Layer({
    // x: 65,
    // y: 15,
    // x: Math.floor(widthScreen / 2 - (holstW * boxSize) / 2),
    // y: Math.floor(heightScreen / 2 - (holstH * boxSize) / 2),
    // x: layerTiles.x(),
    // y: layerTiles.y(),
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
    layerNum.clearCache();
    layerNum.destroyChildren(); //очистить слой
    layerNum.x(layerTiles.x()); //переместить слой
    layerNum.y(layerTiles.y()); //к слою тайлов

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
        fill: "#1F1F1F",
        cornerRadius: boxSize / 4,
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
            x: 0.9,
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
            n = holstW - i;
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

//раппорт
var layerRap = new Konva.Layer();

function schemeRap() {
    $("body").removeClass("rap"); //удалить класс раппорта, на случай если вызывается при отмене редактирования
    layerRap.destroyChildren(); //очистить слой
    layerRap.x(layerTiles.x()); //переместить слой
    layerRap.y(layerTiles.y()); //к слою тайлов
    var colorRap = "gold";
    var colorRapA = "black";

    var x, y, w, h;
    if (TE.scheme.rap) { //если раппорт есть
        var r = TE.scheme.rap;
        x = r.x;
        y = r.y;
        w = r.w;
        h = r.h;
    } else { //иначе рисуем во всю схему
        x = 0;
        y = 0;
        w = holstW * boxSize;
        h = holstH * boxSize;
    }
    var lineRap = new Konva.Line({
        points: [
            x, y,
            x + w, y,
            x + w, y + h,
            x, y + h,
            // x, y, // последняя точка как первая, т.к. закрыть нельзя
        ],
        stroke: colorRap,
        strokeWidth: 4,
        lineJoin: 'round', //углы
        closed: true, // если закрывать, то ставить fillEnabled:false
        fillEnabled: false, //отключить заливку дабы  не перекрывать тайлы
        // tension:   0.102 ,//искажение линии
        strokeHitEnabled: false, //если false то клики проходят сквозь раппорт
        // draggable: true,
        // opacity:0.7,








        // dash: [boxSize / 10 * 2, boxSize / 10 * 6, boxSize / 10 * 2, 0],
        //углы
        lineJoin: 'bevel', //скос
        lineJoin: 'miter', //квадрат
        lineJoin: 'round', //скругл


        //концы
        lineCap: 'sqare', //
        lineCap: 'butt', //прямой
        lineCap: 'round', //скругл
        //	String<optional> can be butt, round, or sqare.The default is butt

        // shadowColor:"blue",
        // shadowBlur:0,
        // shadowOffsetX:100,

        /*
            колбаски
            dash: [boxSize / 10 * 2, boxSize / 10 * 6,boxSize / 10 * 2,0 ],
            точки на пересечениях, и колбаски в промежутках
            dash: [0, boxSize / 10 * 3, boxSize / 10 * 4, boxSize / 10 * 3 ],
            lineCap: 'round',//скругл
            strokeWidth: boxSize/5  ,

            раппорт в 4 точки
            dash: [0, boxSize/4],
            lineCap: 'round',//скругл
            strokeWidth: boxSize/5  ,

            раппорт точками в пересечениях
            dash: [0, boxSize],
            lineCap: 'round',
            strokeWidth: 10, */

        // perfectDrawEnabled:false,
        // lineCap: 'round', //концы
        // fill:"green",
    });


    // lineRap.closed(false);
    // console.error("♦", lineRap.points());
    // lineRap.points([0, 0, 100, 0, 100, 100, 0, 100]);
    // console.error("♦", lineRap.points());
    var radius = boxSize / 7;
    if (radius < 6) {
        radius = 6;
    }
    if (radius > 9) {
        radius = 9;
    }
    var circleRapEdit = new Konva.Circle({ //точка кнопка на раппорте
        name: "cr", // Circle Rap
        x: x + w,
        y: y,
        radius: radius,
        fill: colorRap,
        stroke: colorRapA,
        strokeWidth: 5,
        strokeWidth: 1.5,
        // opacity:0.3
    });
    // add hover styling
    circleRapEdit.on('mouseover', function () {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.radius(circleRapEdit.radius() + 2);
        // this.setStrokeWidth(circleRapEdit.radius()*2);
        layer.draw();
    });
    circleRapEdit.on('mouseout', function () {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        // this.setStrokeWidth(2);
        this.radius(circleRapEdit.radius() - 2);
        // layer.draw();
        layerRap.draw();
    });

    circleRapEdit.on('mousedown touchstart', function () {
        rapResize();
    });




    layerRap.add(lineRap, circleRapEdit);
    layerRap.batchDraw();
}

function rapResize() {
    $("body").addClass("rap"); //добавить класс в тело
    // layerTiles.cache();//закешировать слой тайлов
    layerTiles.draggable(true);//включить перетаскивание
    layerRap.get('.rr').destroy(); //удалить старую группу ресайза - если вдруг осталась
    layerRap.get('.cr').hide(); //скрыть кнопку на раппорте
    layerRap.getChildren()[0].stroke("#2196f3"); //изменяем цвет раппорта
    TE.selected.oldTool = TE.selected.tools; //сохранить инструмент чтобы потом вернуть
    TE.selected.tools = "rap"; //изменить инструмент
    let rapResizeGroup = new Konva.Group({
        name: "rr" //Rap Resize
        // draggable: true
    });
    let x, y, h, w;//параметры раппорта
    if (TE.scheme.rap) {//Если раппорт есть
        let r = TE.scheme.rap;
        x = r.x;
        y = r.y;
        w = r.w;
        h = r.h;
    } else {//иначе во всю схему
        x = 0;
        y = 0;
        w = holstW * boxSize;
        h = holstH * boxSize;
    }
    addAnchor(rapResizeGroup, x, y, 'topLeft');
    addAnchor(rapResizeGroup, x + w, y, 'topRight');
    addAnchor(rapResizeGroup, x + w, y + h, 'bottomRight');
    addAnchor(rapResizeGroup, x, y + h, 'bottomLeft');
    layerRap.getChildren()[0].points([ //перерисовать линию на случай если будет повторный вызов
        x, y,
        x + w, y,
        x + w, y + h,
        x, y + h,
        // x, y, // последняя точка как первая, если линия не закрыта.
    ]);

    layerRap.clearCache()
        .add(rapResizeGroup)
        .draw();
} // rapResize();
function rapResizeApply(params) {
    TE.selected.tools = TE.selected.oldTool; //возвращаем инструмент
    TE.scheme.rap = newRap; //Забираем данные нового раппорта
    schemeRap(); //рисуем раппорт
    // $("body").removeClass("rap");
    // layerRap.get('.rr').destroy(); //удалить группу изменения раппорта
    // var circleRap = layerRap.get('.cr')
    // circleRap.show();
    // if (newRap) circleRap.x(newRap.x + newRap.w).y(newRap.y) //кнопка на раппорте
    // layerRap.draw();
}


// schemeRap();
// stageEditor.add(layerRap);





//создание новой схемы
function schemeNew() {
    layerTiles.clearCache();
    TE.scheme = {
        num: 3,
        numX: 1,
    }; //очистка данных от предыдущей схемы
    // boxSize = 50;
    // console.warn(BD1);
    var h = $("#TEh").val(); //значение из инпута
    var w = $("#TEw").val();
    holstH = +h;
    holstW = +w;
    fitScreen();
    //#TODO сделать центрирование
    gridTiles(); //отрисовать тайлы
    schemeNumbering(); //отрисовать линейки
    schemeRap();
    selectSample();
    // rapResize();
    // console.warn(BD1);

    // layerTiles.batchDraw();
    // layerNum.batchDraw();
    // layerRap.batchDraw();


    stageEditor.draw();
}

stageEditor.add(layerTiles, layerNum, layerRap);