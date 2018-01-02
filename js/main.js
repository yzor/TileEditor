//var tilePath, tile, tileBg;
var tool; //инструмент
var sample; //текущий образец
var holstW = 19; //ширина в клетках   
var holstH = 8; //высота в клетках   
var boxSize = 20; //размер клетки 
var widthScreen = window.innerWidth - 190;
var heightScreen = window.innerHeight;






//////////////stageSymbol start
// set container
var container = document.createElement('div');
// var rootTE = document.getElementById('TE');
var rootTE = document.getElementById('TEpanelB');
rootTE.appendChild(container);
//сцена для символов
var stageSymbol = new Konva.Stage({
    container: container,
    width: widthScreen,
    height: 49
});
////stageSymbol end



//TileEditor
var container = document.createElement('div');
var rootTE = document.getElementById('TE');
rootTE.appendChild(container);
var stageEditor = new Konva.Stage({
    container: container,
    // width: holstW * boxSize,//ширина из рассчёта размера и кол-ва клеток
    // height: holstH * boxSize//высота из рассчёта размера и кол-ва клеток
    // width: 615,//фиксированная ширина
    // height: 315//фиксированная высота
    width: widthScreen, //высота экрана
    height: heightScreen //ширина экрана

});

//изменение размера сцены при изменении окна
function responsiveStage() {
    // console.log("responsiveStage");
    console.log("Размер окна - " + window.innerWidth);
    widthScreen = window.innerWidth;
    if (widthScreen < 631) { //боковое меню
        widthScreen -= 33;
    } else {
        widthScreen -= 190;
    }
    heightScreen = window.innerHeight;
    stageEditor.width(widthScreen);
    stageEditor.height(heightScreen);
    stageSymbol.width(widthScreen);
}
window.addEventListener('resize', responsiveStage); //запускаем при изменении окна
responsiveStage(); //запускаем на старте





//Слой для тайлов
// var layerTiles = new Konva.FastLayer({
var layerTiles = new Konva.Layer({
    // grabX = Math.floor(grabX);
    // var holstW = 10; //ширина в клетках 
    //var holstH = 30; //высота в клетках 
    //var boxSize = 10; //размер клетки
    x: Math.floor(widthScreen / 2 - (holstW * boxSize) / 2),
    y: Math.floor(heightScreen / 2 - (holstH * boxSize) / 2),
    // draggable: true,
    dragBoundFunc: function (pos) {
        // console.log(pos);
        layerNum.x(pos.x); //Также перемещать нумерацию
        layerNum.y(pos.y);
        layerNum.batchDraw();
        // layerNum.draw();
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
    layerTiles.destroyChildren();//очистить слой 
    var groupGrid = new Konva.Group({ //группа с сеткой тайлов
        // x: 16,
        // y: 13,
        // draggable: true
    });
    //#TODO перенести
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
}
gridTiles();
//создание новой схемы
function schemeNew() {
    // boxSize=50;
    // console.warn(BD1);
    var h = $("#TEh").val();//значение из инпута
    var w = $("#TEw").val();
    holstH = +h;
    holstW = +w;
    console.error('да', holstH, holstW);
    //#TODO сделать центрирование
    gridTiles();//отрисовать тайлы
    schemeNumbering();//отрисовать линейки
    // console.warn(BD1);
}
// schemeNew();






// as all boxes stay separately with no overlap
// and they have no opacity
// we can call 'box.draw()' and we will have expected result
// REMEMBER that is this case box will be drawn on top of existing layer
// without clearing

stageEditor.add(layerTiles);

//наведение на боксы
// layer.on('mouseover', function(evt) {

// layer.on('mouseout', function(evt) {
//     var box = evt.target;
//     box.fill('darkgrey');
//     box.draw();
// });
function fromIn2(x, y, x2, y2, value) {
    var prevPos = {
        x: x2,
        y: y2
    };
    var dx = Math.abs(x - prevPos.x); //смещение относительно предыдущего клика
    var dy = Math.abs(y - prevPos.y); //смещение относительно предыдущего клика
    //////////////////////////  
    var pos = {
        x: prevPos.x,
        y: prevPos.y
    }; //текущая позиция
    var dist = Math.sqrt(dx * dx + dy * dy); //путь(√)
    while (prevPos.x != x || prevPos.y != y) {
        //x,y → конечная позиция
        //pos → обновляемая позиция текущего шага(десятичная дробь)
        //dx,dy → смещение новой точки относительно старой
        //dist→корень из произведения и сложения
        pos.x += (x > pos.x ? 1 : -1) * dx / dist;
        pos.y += (y > pos.y ? 1 : -1) * dy / dist;
        //обновление предудущей позиции
        prevPos = {
            x: Math.round(pos.x),
            y: Math.round(pos.y)
        };
        draw(prevPos.x, prevPos.y, value);
        //DrawSquare(g_prevPos.x*SqWidth, g_prevPos.y*SqWidth, g_prevPos.x, g_prevPos.y);
        // console.error(prevPos);
    }
    // draw2(x,y,"red");
    // draw2(x2,y2,"red");
}

function fromIn(x, y, x2, y2, value) {

    var razn1 = Math.abs(x - x2) + 1;
    var razn2 = Math.abs(y - y2) + 1;
    console.warn(razn1, razn2);
    var pathSplit;
    var stepX, stepY;
    if (razn1 > razn2) { // }else if(razn1<razn2){
        pathSplit = razn1;
        stepX = 1;
        stepY = 1;
    } else {
        stepX = (razn1 - 1) / razn2;
        stepY = 1;
        pathSplit = razn2;
    }
    console.error(razn1 + ":" + razn2, pathSplit, stepX, stepY);
    var posX = x + stepX;
    var posY = y;
    for (var n = 0; n < pathSplit; n++) {
        console.warn(n + 1 + "|", Math.round(posX), Math.round(posY), "|", posX + ":" + posY);
        draw(Math.round(posX), Math.round(posY));
        // draw(posX.toFixed(),posY.toFixed());

        //n.toFixed()
        posX = posX + stepX;
        posY = posY + stepY;
        draw2(x, y, "black");
        draw2(x2, y2, "black");
    }

}

// fromIn(5,2,1,2,"red");
// fromIn(2,1,3, 8,"red");
// fromIn(5,1,7, 8,"red");
// fromIn(8,1,11,8,"red");
// fromIn2(1,1,10, 10,"blue");
// fromIn2(2,9,3, 16,"blue");
// fromIn2(5,9,7, 16,"blue");
// fromIn2(8,9,11,16,"blue");


// fromIn2(1, 1, 10, 9, "blue");
// fromIn2(2, 3, 9, 3, "#FDA226");
// fromIn2(8, 2, 8, 5, "#FDA226");
// fromIn2(3, 7, 7, 7, "#EB4078");



function draw(x, y, value) {
    if (!value) value = "red"; //если не передано значения то красный
    if (x > holstW) { //отсев ошибок  
        console.error("oops W");
        return;
    } else if (y > holstH) {
        console.error("oops H");
        return;
    }
    var n = holstW * (y - 1) + x - 1;
    var box = layerTiles.children[n];
    // console.log(box); 
    box.fill(value);
    box.draw();
}

function draw2(x, y, value) {
    if (!value) value = "red"; //если не передано значения то красный
    if (x > holstW) { //отсев ошибок  
        console.error("oops W");
        return;
    } else if (y > holstH) {
        console.error("oops H");
        return;
    }
    var n = holstW * (y - 1) + x - 1;
    var box = layerTiles.children[n];
    // console.log(box);
    box.stroke(value);
    box.draw();







}
// draw(3,3);



// 	g_sq.mousedown(function(ev)
// 	{
// 		Draw(ev, true);
// 		g_down = true;
// 	});



// document.onclick = function(e) {
//   // if (!e.altKey || !e.shiftKey) return;
//   // alert( 'Ура!' );
//   console.log("клик");
// };