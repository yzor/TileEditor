// console.clear();
// console.log(" я родился");
//#TODO (ДА) узнать можно ли задавать несколько имён на канве как классы с css      



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



function selectSample() {
  // console.warn(TE.selected.sample); 
  tilePath.data(path[TE.selected.sample]);
  tileBg.fill(TE.selected.color);
  remakeSample();
  layerSample.draw();
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
      testIMG = img;
      // console.log(testIMG);
      // test.fillPatternImage(testIMG);
      // test.draw();
      // return img;
    }
  });

}





// selectSample(); 
// function sandboxTools(color, id) {
//   // // var num = parseInt(id.replace(/\D+/g, ""));
//   // // console.log(color,num);
//   // TE.selected.color = color;
//   // // TE.selected .sample = num;
//   // if (tilePath && tileBg) {
//   //   tilePath.data(path[TE.selected.sample]);
//   //   tileBg.fill(TE.selected["red"]);
//   //   console.error("dlkjfdkljf");
//   // }
//   // console.warn(tilePath); 

//   // console.log(TE.selected);
// }

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