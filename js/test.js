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
  x: 5,
  y: 5,
  width: boxSize,
  height: boxSize,
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
  stroke: 'black',
  strokeWidth: 2,
  x: -1,
  y: -1,
  width: boxSize + 2,
  height: boxSize + 2,
  fill: "gold",
  // opacity:0.8,
});
var tile = new Konva.Group({
  x: 5,
  y: 5,
  width: boxSize,
  height: boxSize,
});
tile.add(tileBg, tilePath);


/**
 * выбор элемента из списка всех узоров
 */
function selectSample() {
  // console.warn(TE.selected.sample); 
  tilePath.data(path[TE.selected.sample]);
  tileBg.fill(TE.selected.color);
  remakeSample();
  layerSample.draw();
  // addLayer(TE.selected.sample); 
}


// var test = new Konva.Rect({
//   stroke: 'black',
//   strokeWidth: 2,
//   x: 44,
//   y: 44,
//   width: 2*boxSize + 2,
//   height: 2*boxSize + 2,
//   // fill: "gold",
//   // fillPatternImage: img,
//   // opacity:0.8,
// });
// layerSample.add(test);
var testIMG;
//отрисовываем образец заново
function remakeSample() {
  var image = tile.toImage({
    x: tile.x(),
    y: tile.y(),
    width: boxSize,
    height: boxSize,
    callback: function (img) {
      // console.log(img);
      testIMG = img;
      // addLayer(TE.selected.sample,"https://makeagif.com/images/logo.svg"); 
      addLayer(TE.selected.sample,img); 
      // console.error(img);
      
      // addLayer(TE.selected.sample,img); 
      // var element = document.getElementById("panelR");
      // var qweImg = document.createElement('img');
      




      // console.log(qweImg);
      // element.appendChild(img);



      // var IM = document.createElement('img');
      // IM.src = 'https://makeagif.com/images/logo.svg';
      // // element.appendChild(image);
      // console.log(IM);

      //https://makeagif.com/images/logo.svg


      // console.log(testIMG);
      // test.fillPatternImage(testIMG);
      // test.draw();
      // return img;
    }
  });

}







//выбор цвета с палитры
$(".samples").click(function () {
  $(".act").removeClass("act");
  $(this).addClass("act");
  sample = $(this).css("background-color");
  TE.selected.color = sample; //сохраняем цвет
  // sandboxTools(sample, $(this).attr('id'));
  selectSample(); //перерисовка символа
});
$('#sample15').trigger('click'); //шликаем програмно
layerSample.add(tile);
stageEditor.add(layerSample);