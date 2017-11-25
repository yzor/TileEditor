// console.clear();
// console.log(" я родился");
//#TODO узнать можно ли задавать несколько имён на канве как классы с css      





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
groupSymbols.x(120);
// groupSymbols.x(20);






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
  groupSymbol.on('click', function () {
    console.log(this.name());
    symbolRollback();
  });
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



//возврат при перемещении обрацов далее положенного
function symbolRollback() {
  // console.log(groupSymbols.x(), "X");
  // console.log(counter * 40, "ширина образцов");
  // console.warn(groupSymbols.getStage().width(), "ширина сцены");
  var x = groupSymbols.x();
  //ширина сцены делйная на ширину образцов
  var exceeded = groupSymbols.getStage().width() - (counter * 40);
  if (x > 0) {
    groupSymbols.to({
      x: 0,
      duration: 0.2
    });
  } else if (x < exceeded) {
    groupSymbols.to({
      x: exceeded,
      duration: 0.2
    });
  }
}
// symbolRollback();