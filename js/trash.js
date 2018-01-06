
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




// globalCompositeOperation: 'source-over',
      // globalCompositeOperation: 'source-in',
      // globalCompositeOperation: 'source-out',
      // globalCompositeOperation: 'source-atop',
      // globalCompositeOperation: 'destination-over',
      // globalCompositeOperation: 'destination-in',
      // globalCompositeOperation: 'destination-out',
      // globalCompositeOperation: 'destination-atop',
      // globalCompositeOperation: 'lighter',
      // globalCompositeOperation: 'copy',
      // globalCompositeOperation: 'xor',
      // globalCompositeOperation: 'multiply',
      // globalCompositeOperation: 'screen',
      // globalCompositeOperation: 'overlay',
      // globalCompositeOperation: 'darken',
      // globalCompositeOperation: 'lighten',
      // globalCompositeOperation: 'color-dodge',
      // globalCompositeOperation: 'color-burn',
      // globalCompositeOperation: 'hard-light',
      // globalCompositeOperation: 'soft-light',
      // globalCompositeOperation: 'difference',
      // globalCompositeOperation: 'exclusion',
      // globalCompositeOperation: 'hue',
      // globalCompositeOperation: 'saturation',
      // globalCompositeOperation: 'color',
      // globalCompositeOperation: 'luminosity',

      // globalCompositeOperation: 'difference',














      // window.addEventListener('wheel', (e) => {
//   // if (x > 0) {
//   //   // console.log("ldkjf");
//   //   x = 20;
//   //   groupSymbols.to({
//   //     duration: 0.2,
//   //     easing: Konva.Easings.StrongEaseOut, //0.3 53
//   //     x: x,
//   //   });
//   //   count++;

//   //   function func() {
//   //     count--;
//   //     // console.log(count);
//   //     if (count == 0) {
//   //       // console.warn(count);
//   //       //
//   //       // count2++;
//   //       // tween.stop();
//   //       symbolRollback();
//   //     }
//   //   }
//   //   setTimeout(func, 210);
//   // } else if (x < 0) {
//   //   groupSymbols.to({
//   //     duration: 0.7,
//   //     easing: Konva.Easings.StrongEaseOut, //0.3 53
//   //     x: x,
//   //   });
//   // }



//   // groupSymbols.to({
//   //   duration: 0.7,
//   //   /*
//   //     easing: Konva.Easings.ElasticEaseIn, //bad
//   //     easing: Konva.Easings.BounceEaseIn, //bad
//   //     easing: Konva.Easings.StrongEaseIn,//bad
//   //     easing: Konva.Easings.BackEaseIn,//bad
//   //     easing: Konva.Easings.StrongEaseInOut,//bad
//   //     easing: Konva.Easings.BounceEaseInOut,//bad
//   //     easing: Konva.Easings.BackEaseInOut,//bad
//   //     easing: Konva.Easings.EaseIn,//лучше чем EaseOut
//   //     easing: Konva.Easings.ElasticEaseInOut, //good (нет)
//   //     easing: Konva.Easings.EaseInOut,//bad
//   //     easing: Konva.Easings.BounceEaseOut, //
//   //   */
//   //   easing: Konva.Easings.ElasticEaseOut, // 0.5 53 неоч
//   //   easing: Konva.Easings.BackEaseOut, //


//   //   easing: Konva.Easings.EaseOut, //0.4→4
//   //   easing: Konva.Easings.StrongEaseOut, //0.3 53

//   //   // easing: Konva.Easings.Linear, //Linear 1  70
//   //   /*
//   //    */



//   //   x: x,
//   // });
//   // console.log(0);

//   //  tween = new Konva.Tween({
//   //     node: groupSymbols,
//   //    easing: Konva.Easings.StrongEaseOut, //0.3 53
//   //     duration: 0.7,
//   //     x: x
//   //     // y: 90,
//   //     // fill: 'red',
//   //     // rotation: Math.PI * 2,
//   //     // opacity: 1,
//   //     // strokeWidth: 6,
//   //     // scaleX: 1.5
//   //   });
//   // tween.play();
//   // function func() {
//   //   count--;
//   //   if (count == 0) {

//   //     // count2++;
//   //     // console.log(count);
//   //     // tween.stop();
//   //     symbolRollback();
//   //   }
//   // }
//   // setTimeout(func,110);



//   // var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
//   // stage.scale({ x: newScale, y: newScale });

//   // var newPos = {
//   //   x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//   //   y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
//   // };
//   // stage.position(newPos);
//   // stage.batchDraw();
// });











































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