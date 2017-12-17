// console.clear();
// console.log(" я родился");
//#TODO (ДА) узнать можно ли задавать несколько имён на канве как классы с css      



// var layerAssets = new Konva.Layer();
// var groupAssets = new Konva.Group({
//   x: 200,
//   y: 0, 
//   // width:44,
//   // height: 44,
//   fill: "red",
// });
// var TEassets={
//   // red:1,
//   green:2,
//   blue:3,
//   gold:4,
// }
// function qqq(params) {  
//   groupAssets.destroyChildren();
//   groupAssets.y(0); 
//   for (const key in TEassets) {
//     if (TEassets.hasOwnProperty(key)) {
//       const element = TEassets[key];
//       console.warn(key);

//       updateAssets(key)
//     } 
//   }
// }
// qqq();
// qqq();



// function updateAssets(p1){
//   var qwe = groupAssets.width();
//   console.log(qwe);
//   groupAssets.width(qwe+30);
//   var test = new Konva.Rect({
//     stroke: 'black',
//     strokeWidth: 2,
//     // x: qwe,
//     y: qwe,
//     width: 20,
//     height: 20,
//     fill: p1,
//     name: p1,
//     // opacity:0.8,
//   });
//   groupAssets.add(test);
// }
// updateAssets("red");
// updateAssets("red");
// updateAssets("red");
// updateAssets("red"); 

function addAssets() {}

function removeAssets() {}
  

// layerAssets.add(groupAssets);
// stageEditor.add(layerAssets);



//////////////////////////////////////***********
var tile = new Konva.Group({
  // x: 15,
  // y: 15,
  // width: 20,//boxSize,
  // height: 20,//boxSize,
});


var layerSample = new Konva.Layer(); //новый слой для образца
var tilePath = new Konva.Path({ //фигура
  //8 9 10 12 bad 
  // data: path[TE.selected.sample],
  fill: "black",
  x: 0,
  y: 0,
  scale: {
    x: boxSize / 20,
    y: boxSize / 20
  }
});
//цвет выбранного узора
var tileBg = new Konva.Rect({
  stroke: 'gold',
  strokeWidth: 4,
  x: -1,
  y: -1,
  width: boxSize + 2,
  height: boxSize + 2,
  fill: "gold",
  // opacity:0.8,
});
var tile = new Konva.Group({
  x: 25,
  y: 25,
  width: boxSize,
  height: boxSize,
});
tile.add(tileBg, tilePath);



// $('#sample15').trigger('click'); //шликаем програмно
layerSample.add(tile);
stageEditor.add(layerSample);



selectSample();//активация символа на старте