//var tilePath, tile, tileBg;
var tool; //инструмент
//защита цвета
//стирание при повторном нажатии
//прямые линии
//лупа
//ладонь(аналог фотошопа)
//рисование заметок
var sample; //текущий образец

var holstW = 140; //ширина в клетках
var holstH = 140; //высота в клетках 
var boxSize =  15; //размер клетки

//TileEditor
var container = document.createElement('div');
var rootTE = document.getElementById('TE');
rootTE.appendChild(container);
var stageEditor = new Konva.Stage({
  container: container,
  width: holstW * boxSize,
  height: holstH * boxSize
});

var layerTiles = new Konva.Layer({
  // x: 20,
  // y: 20,
  // draggable: true,
  // opacity: 0.1
});



//     var imageObj = new Image();
//     imageObj.onload = function() {
//       var yoda = new Konva.Image({
//         x: 100,
//         y: 100,
//         image: imageObj,
//         width: 100,
//         height: 100,
//         opacity: 1.7,
//         stroke: 'red',
//         strokeWidth: 4,
//         // rotation:45,
//         offsetX:60,
//         offsetY:60,

//         // scaleX:2.3,
//         // scaleY:3.3,


//         draggable: true
//       });
//       // add the shape to the layer
//       layer2.add(yoda);
//       // layer2.scale(10,10);
//       // layer2.rotation(45);
//       // yoda.rotation(45);
//       // yoda.matrix3d(0.99,-0.14,0.00,.001,0.14,0.99,0.00,0.004,0,0,1,0,0,22,1,1);


//        // layer2.transform.matrix3d(0.99,-0.14,0.00,.001,0.14,0.99,0.00,0.004,0,0,1,0,0,22,1,1);
//       // yoda.scaleX(2);
//       // yoda.skewX(0.4);
//       // yoda.skewY(0.4);
//       // yoda.multiply(1,3,3,3,3,3,3,3,3,3);
//       console.error(
//         layer2
//                    );
//       // add the layer to the stage
//       stage.add(layer2);
//     };
//     imageObj.src = 'https://konvajs.github.io/assets/yoda.jpg';







/////////////////////////////
var box;
// generate boxes
//for (var ix = 0; ix < width / BOX_SIZE; ix++) {// noprotect
//for (var iy = 0; iy < height / BOX_SIZE; iy++) {// noprotect
//  for (var iy = 0; iy < height / BOX_SIZE; iy++) {// noprotect
//        for (var ix = 0; ix < width / BOX_SIZE; ix++) {// noprotect 
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


      strokeWidth: 2
    });
    layerTiles.add(box);
  }
}
layerTiles.draw();
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