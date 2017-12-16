var layerSymbol = new Konva.Layer({});
var groupSymbols = new Konva.Group({ //группа символов
  x: 0,
  y: 0,
  draggable: true,
  dragBoundFunc: function (pos) {
    return {
      x: pos.x,
      y: this.getAbsolutePosition().y
    }
  }
});
var counter = 0;
for (var key in path) {
  var groupSymbol = new Konva.Group({
    name: key,
    scale: {
      x: 2,
      y: 2
    }
  });
  var symbolBox = new Konva.Rect({
    width: 20,
    height: 20,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1
  });
  var symbolPath = new Konva.Path({
    //8 9 10 12 bad 
    data: path[key],
    fill: "black",
    x: 0,
    y: 0,
  });

//Клик по элементу в панели символов
  groupSymbol.on('click', function () {
    TE.selected.sample = this.name();
    console.log("Клик panel symbol (" + TE.selected.sample+")"); 
    selectSample();
  });






  //проверка после перетаскивания, не ушло ли за края
  groupSymbols.on('dragend', function () {
    symbolRollback();
  });
  groupSymbol.add(symbolBox, symbolPath);

  counter++;
  // console.log(counter);
  // console.log(path[key]); 
  groupSymbol.x(counter * 40 - 40);
  groupSymbols.add(groupSymbol);
}


//mouseover, mouseout, mouseenter, mouseleave


// layerSymbol.draw();



// set container
var container = document.createElement('div');
var rootTE = document.getElementById('TE');
rootTE.appendChild(container);
var stageSymbol = new Konva.Stage({
  container: container,
  width: holstW * boxSize,
  height: 40
});

layerSymbol.add(groupSymbols);
stageSymbol.add(layerSymbol);

//анимация скрола
function animWheel(x, s, e) {
  var tween;
  // tween.stop();
  tween = new Konva.Tween({
    node: groupSymbols,
    easing: Konva.Easings[e], //0.3 53 
    duration: s,
    x: x,
  });
  tween.play();
  /*
    //     easing: Konva.Easings.ElasticEaseIn, //bad
    //     easing: Konva.Easings.BounceEaseIn, //bad
    //     easing: Konva.Easings.StrongEaseIn,//bad
    //     easing: Konva.Easings.BackEaseIn,//bad
    //     easing: Konva.Easings.BounceEaseInOut,//bad
    //     easing: Konva.Easings.StrongEaseInOut,//bad
    //     easing: Konva.Easings.BackEaseInOut,//bad
    //     easing: Konva.Easings.EaseIn,//лучше чем EaseOut
    //     easing: Konva.Easings.EaseInOut,//bad 
    //     easing: Konva.Easings.ElasticEaseInOut, //good (нет)  
    
    
    //     easing: Konva.Easings.BounceEaseOut, //
    //   easing: Konva.Easings.ElasticEaseOut, // 0.5 53 неоч
    //   easing: Konva.Easings.BackEaseOut, //
    //   easing: Konva.Easings.EaseOut, //0.4→4
    //   easing: Konva.Easings.StrongEaseOut, //0.3 53 
    
    //   // easing: Konva.Easings.Linear, //Linear 1  70
  */
}
//возврат при перемещении обрацов далее положенного
function symbolRollback() {
  // console.log(groupSymbols.x(), "X");
  // console.log(counter * 40, "ширина образцов");
  // console.warn(groupSymbols.getStage().width(), "ширина сцены");
  var x = groupSymbols.x();
  //ширина сцены делйная на ширину образцов
  var exceeded = groupSymbols.getStage().width() - (counter * 40);
  if (x > 0) {
    // tween.finish();
    // ani(0);
    animWheel(0, 0.4, "BackEaseOut");
  } else if (x < exceeded) {
    // ani(exceeded);
    animWheel(exceeded, 0.4, "BackEaseOut");
  }

  function ani(n) {
    groupSymbols.to({
      x: n,
      duration: 0.4,
      easing: Konva.Easings.BackEaseOut, //3-4 good
      /*
        easing: Konva.Easings.ElasticEaseInOut, //good (нет) 
        easing: Konva.Easings.ElasticEaseIn, //bad
        easing: Konva.Easings.BounceEaseIn, //bad
        easing: Konva.Easings.Linear, //Linear
        easing: Konva.Easings.BackEaseIn,//bad
        easing: Konva.Easings.StrongEaseInOut,//bad
        easing: Konva.Easings.EaseInOut,//bad
        easing: Konva.Easings.BounceEaseInOut,//bad
        easing: Konva.Easings.StrongEaseIn,//bad
        easing: Konva.Easings.EaseOut,//bad
        easing: Konva.Easings.BackEaseInOut,//bad
        easing: Konva.Easings.EaseIn,//лучше чем EaseOut
        easing: Konva.Easings.BounceEaseOut,//7 good
        easing: Konva.Easings.StrongEaseOut,//3, 
        easing: Konva.Easings.ElasticEaseOut,// ~0.7-1good 
      */
    });
  }
}
//скролл по панели образцов

groupSymbols.on('mouseenter', function () { //включаем прокрутку при наведении
  window.addEventListener("wheel", symbolWheelScroll);
});
groupSymbols.on('mouseleave', function () { //отключаем прокрутку
  window.removeEventListener("wheel", symbolWheelScroll);
});
var countWheel = 0;

function symbolWheelScroll(e) {
  // console.warn(e.deltaY);
  e.preventDefault(); //отключаем действие по умолчанию
  var x = groupSymbols.x() + e.deltaY * -1 * 53;
  if (e.deltaY > 0) {
    x = -159;
  } else {
    x = 159;
  };
  x=groupSymbols.x()+x;
  var exceeded = groupSymbols.getStage().width() - (counter * 40);
  if (x > -40) {
    x = 26;
    // animWheel(x, 0.22, "BackEaseOut"); 
    animWheel(x, 0.22, "StrongEaseOut");
    countWheel++;

    function func() {
      countWheel--;
      if (countWheel == 0) {
        symbolRollback();
      }
    }
    setTimeout(func, 210);
  } else if (x < exceeded - 40) {
    x = exceeded - 26;
    // animWheel(x, 0.22, "BackEaseOut"); 
    animWheel(x, 0.22, "StrongEaseOut");
    countWheel++;

    function func() {
      countWheel--;
      if (countWheel == 0) {
        symbolRollback();
      }
    }
    setTimeout(func, 210);

  } else {
    animWheel(x, 0.7, "StrongEaseOut");
  }

}

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