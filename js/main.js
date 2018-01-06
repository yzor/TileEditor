//var tilePath, tile, tileBg;
var tool; //инструмент
var sample; //текущий образец
var holstW = 3; //ширина в клетках
var holstH = 3; //высота в клетках
var boxSize = 40; //размер клетки
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