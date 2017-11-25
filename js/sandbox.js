console.clear();
console.log("я родился");

/**/
var boxSize = 20; //размер клетки



//создаём сцену
var stage = new Konva.Stage({
  container: 'container',
  width: 500,
  height: 700,
});



var layer = new Konva.Layer();
//векторная фигура
var tilePath = new Konva.Path({
  //8 9 10 12 bad 
  data: s1,
  fill: "red",
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
  // scale: {
  // x : 2,
  // y : 2
  // }
});
tile.add(tileBg, tilePath);
var bigClone = tile.clone({
  x: 40,
  y: 40,
  scale: {
    x: 5,
    y: 5
  }
});

var box00 = new Konva.Rect({
  stroke: 'black',
  strokeWidth: 2,
  x: 40,
  y: 310,
  width: tile.width(),
  height: tile.height(),
  // fill:"green",
  // fillPatternImage:img,
  // fillPatternRepeat:'repeat-x',
  fillPatternRepeat: 'no-repeat',
  opacity: 0.8,
});
//создание изображения из тайла
var image = tile.toImage({
  x: tile.x(),
  y: tile.y(),
  width: tile.width(),
  height: tile.height(),
  callback: function (img) {
    qwe1(img);
    box00.fillPatternImage(img);
    box01.fillPriority('pattern');
    box01.fillPatternImage(img);
    layer.draw();
    // box00.draw();
    // box01.draw();

    // do stuff with img
    // console.warn(img);
    // box1.fillPatternImage(img);
    // box1.draw();
    // return img;
  }
});

function qwe1(img) {
  var box1 = new Konva.Rect({
    stroke: 'black',
    strokeWidth: 2,
    x: 10,
    y: 100,
    width: 400,
    height: 200,
    // fill: "gold",
    fillPatternImage: img,
    // fillPatternRepeat:'repeat-x',
    // fillPatternRepeat:'no-repeat',
    opacity: 0.8,

  });
  var box2 = new Konva.Rect({
    stroke: 'black',
    strokeWidth: 2,
    x: 10,
    y: 310,
    width: tile.width(),
    height: tile.height(),
    fillPatternImage: img,
    // fillPatternRepeat:'repeat-x',
    fillPatternRepeat: 'no-repeat',
    opacity: 0.8,
  });
  layer.add(box1, box2);
  // layer.draw();
}
var box01 = new Konva.Rect({
  stroke: 'black',
  strokeWidth: 2,
  x: 70,
  y: 310,
  width: tile.width(),
  height: tile.height(),
  fill: "green",
  // fillPatternImage:img,
  // fillPatternRepeat:'repeat-x',
  fillPatternRepeat: 'no-repeat',
  opacity: 0.8,
});
layer.add(bigClone);
layer.add(tile);
layer.add(box00);
layer.add(box01);

stage.add(layer);
// layer.draw();


//     var rect = new Konva.Rect({
//       // stroke: 'blue',
//       // strokeWidth: null,
//       width: 20,
//       height: 20,
//       fill: "red",
//       opacity:0.4,

//     }); 
// var bug = new Konva.Rect({
//       stroke: 'blue',
//       strokeWidth: 4,
//      fill:"green",
//       width: 100,
//       height: 100,
//       opacity:0.5,
//       x: 5,
//       y: 5,
//   draggable: true,
//     });
// var tile = new Konva.Group({
//    draggable: true,
//         x: 10,
//         y: 10,
//         scale: {
//           x : 10,
//           y : 10
//         }
//     });
// tile.add(rect);
// tile.add(path);
// layer.add(tile);
// tile.cache();
//     var clone = tile.clone({
//         x: -10,
//         y: -10,
//               scale: {
//           x : 1,
//           y : 1
//         }

//       });
//     // clone.cache();
// layer.add(clone);
// console.log(clone.cache());
// console.log(tile); 

// console.error(imageTest);
// var imageTest;
// var image = clone.toImage({
//   x: -10,
//   y: -10,
//   width: 20,
//   height: 20,
//   callback: function(img) {
//     // do stuff with img
//     console.error(img);
//     imageTest = img;
//   }
// });





//https://yzorrykodelie.ru/🌐/лицевая.png
// var yoda2 = new Konva.Image({
//         x: 33,
//         y: 33,
//         fill: "gold",
//         // image: imageObj,
//         stroke: 'red',
//       strokeWidth: 32,
//         width: 233,
//         height: 233
//       });
//  var imageObj = new Image();
// // console.error(imageObj);
//  var imageObj2 = new Image();
// // console.error(imageObj2);
//     imageObj.onload = function() {

//       var yoda = new Konva.Image({
//         x: 50,
//         y: 50,
//         image: imageObj,
//         width: 20,
//         height: 20
//       });
// // layer.draw();
//       // add the shape to the layer
//       layer.add(yoda);

//       // add the layer to the stage
//     var rect2 = new Konva.Rect({
//       stroke: 'red',
//       strokeWidth: 2,
//       x:10,y:224,
//       width: 60,
//       height: 60,
//       // fill: "red",
//       fillPatternImage:imageTest,
//       // opacity:0.8,
//     });
//     rect2.fillPatternRepeat('no-repeat');
//     console.error(imageTest);
//     var rect3 = new Konva.Rect({
//       stroke: 'black',
//       strokeWidth: 2,
//       x:10,y:300,
//       width: 220,
//       height: 100,
//       // fill: "red",
//       fillPatternImage:imageTest,
//       // fillPatternRepeat:'repeat-x',
//       // fillPatternRepeat:'no-repeat',
//       // opacity:0.8,
//     });
//       var yod = new Konva.Image({
//         x: 230,
//         y: 40,
//         // fill:"green",
//         image: imageTest,
//         width: 100,
//         height: 100,
//         stroke: 'red',
//         strokeWidth: 2,
//       });
//        var yod2 = new Konva.Image({
//         x: 230,
//         y: 150,
//         fill:"green",
//         image: imageTest,
//         // width: 100,
//         // height: 100,
//         stroke: 'red',
//         strokeWidth: 2,
//       });





// console.warn(imageObj);
// console.warn(yoda.attrs.image.outerHTML);
//       var fillPatternImage = rect2.fillPatternImage();
// console.warn(yoda);
// console.log(fillPatternImage);
// // layer.add(yoda);
//     };
//     imageObj.src = 'https://yzorrykodelie.ru/🌐/лицевая.png';





/*
// get crop
var crop = image.crop();

// set crop
image.crop({
  x: 20,
  y: 20,
  width: 20,
  height: 20
});*/






// add the layer to the stage