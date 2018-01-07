"use strict";
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
        // x: boxSize / 20,
        // y: boxSize / 20,
        x: boxSize / 1000, //100
        y: boxSize / 1000
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
// layerSample.add(tile);
// stageEditor.add(layerSample);















var layerSymbol = new Konva.Layer({});




var groupSymbols = new Konva.Group({ //группа палитры символов
    x: 0,
    y: 0,
    draggable: true, //перетаскивание
    dragDistance: 14, //смещение после которого включать перетаскивание
    dragBoundFunc: function (pos) {
        return {
            x: pos.x,
            y: this.getAbsolutePosition().y
        }
    }
});

var counter = 0;
for (var key in path2) {
    // console.log(path2[key][0])
    // console.error("♠", key);
    var groupSymbol = new Konva.Group({
        id: key, //####♦
        // name: "act", //####♦
        scale: {
            // x: 2,
            // y: 2
        }
    });
    var symbolBox = new Konva.Rect({
        x: -0.5,
        y: 0.5,
        width: 60,
        height: 50,
        // fill: 'rgba(15, 15, 15, 0.3)',
        fill: colors.qwe3,
        stroke: colors.qwe4,
        // stroke: 'rgba(15, 15, 15, 0.3)',
        strokeWidth: 1
    });
    var symbolPath = new Konva.Path({
        //8 9 10 12 bad
        // data: path[key],
        data: path2[key][0],
        // fill: "white",
        fill: colors.qwe1,
        x: 10,
        y: 6,
        // scale: {
        //   x: 0.025,
        //   y: 0.025
        // }
        scale: {
            x: 0.04,
            y: 0.04
        }
    });
    groupSymbol.on('mouseover', function () { //наведение на символ
        var path = this.children[1];
        var rect = this.children[0];
        var color = this.hasName('act') ? colors.qwe2 : "rgba(225, 225, 225, 0.9)";
        path.fill(color);
        rect.fill(colors.qwe4);
        layerSymbol.batchDraw();
    });
    groupSymbol.on('mouseout', function () {
        var path = this.children[1];
        var rect = this.children[0];
        var color = this.hasName('act') ? colors.a : colors.qwe1;
        var color2 = this.hasName('act') ? colors.qwe4 : colors.qwe3;
        path.fill(color);
        rect.fill(color2);
        layerSymbol.batchDraw();
    });


    //Клик по элементу в панели символов
    groupSymbol.on('click tap', function () {
        TE.selected.sample = this.id(); //####♦
        // markSymbol();
        selectSample();
        $('#TEpen').trigger('click');
        // alert("klj");




        // layerSymbol.get(".act");
        /*      var list = layerSymbol.get(".act");
             for (var i = 0, len = list.length; i < len; i++) {
                 // console.error(list[i].getChildren());
                 list[i].removeName("act").getChildren()[1].fill(colors.qwe1);
                 list[i].getChildren()[0].fill(colors.qwe3);
             } */
        // layerSymbol.get(".act").getChildren().fill("gold");
        // this.addName("act").getChildren()[1].fill(colors.a);
        // this.getChildren()[0].fill(colors.qwe4);
        // layerSymbol.batchDraw();

        // if (layerSymbol.get(".act").length) {
        // layerSymbol.get(".act")[0].removeName("act");
        // layerSymbol.get(".act").removeName("a2ct").move({
        //         x: 1,
        //         y: 2
        // }).getChildren();
        // layerSymbol.get(".act").remove();
        // layerSymbol.get(".act")[0].removeName(".act");
        // }
        // console.error("E♣E♣E♣E♣E♣", layerSymbol.get(".act").length);
        // console.error("E♣E♣E♣E♣E♣", layerSymbol.get(".act").getChildren());
        // console.error("E♣E♣E♣E♣E♣", layerSymbol.get(".act"));


        // this.getChildren()[1].fill("gold"); //###########
        // this.name("шлик");
        // this.qwe("шлик2");
        // this.setAttr('qwe', 5);
        // this.id("dlkjf")
        // this.getChildren()[1].colorKey("gold");
        // this.children[1].fill("gold");
        // console.error("♣7", this.id(), this);
        // console.error("♣7", this.getChildren()[1]);



        /*      console.log("Клик panel symbol (" + TE.selected.sample + ")");
             selectSample();
             this.draw(); */

    });






    //проверка после перетаскивания, не ушло ли за края
    groupSymbols.on('dragend', function () {
        symbolRollback();
    });
    groupSymbol.add(symbolBox, symbolPath);

    // console.log(counter);
    // console.log(path[key]);
    groupSymbol.x(counter * 60);
    counter++;

    groupSymbols.add(groupSymbol);
}


function markSymbol() {
    //!!!Нельзя вызвать айди с пробелом, хотя задаётся без проблем
    var id = TE.selected.sample;
    console.log("(markSymbol) (" + id + ")");
    //Аналог ".removeClass"
    var list = layerSymbol.get(".act");
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].removeName("act").getChildren()[1].fill(colors.qwe1);
        list[i].getChildren()[0].fill(colors.qwe3);
    }

    //Аналог ".addClass"
    list = layerSymbol.get("#" + id);
    if (!list.length) console.error("нет симола ("+id+")");//[TEST]
    for (var i = 0, len = list.length; i < len; i++) {
        list.addName("act")[i].children[0].fill(colors.qwe4);
        list[i].children[1].fill(colors.a);
        //#TODOсделать прокрутку к текущему символу если его нет на экране
    }
    layerSymbol.batchDraw();
}
// markSymbol();
/*OLD

var counter = 0;
for (var key in path) {
  // console.error("♠", key);
  var groupSymbol = new Konva.Group({
    name: key,
    scale: {
      // x: 2,
      // y: 2
    }
  });
  var symbolBox = new Konva.Rect({
    x: -0.5,
    y: 0.5,
    width: 60,
    height: 50,
    // fill: 'rgba(15, 15, 15, 0.3)',
    fill: 'rgba(31, 31, 31, 0.94)',
    stroke: 'rgba(26, 25, 25, 1)',
    // stroke: 'rgba(15, 15, 15, 0.3)',
    strokeWidth: 1
  });
  var symbolPath = new Konva.Path({
    //8 9 10 12 bad
    data: path[key],
    // fill: "white",
    fill: "rgba(225, 225, 225, 0.3)",
    x: 10,
    y: 6,
    scale: {
      x: 2,
      y: 2
    }
  });
  groupSymbol.on('mouseover', function () { //наведение на символ
    var path = this.children[1];
    // path.fill("gold");
    path.fill("rgba(225, 225, 225, 0.9)");

    layerSymbol.batchDraw();
  });
  groupSymbol.on('mouseout', function () {
    var path = this.children[1];
    path.fill("rgba(225, 225, 225, 0.3)");
    layerSymbol.batchDraw();
  });






  //Клик по элементу в панели символов
  groupSymbol.on('click', function () {
    TE.selected.sample = this.name();
    console.log("Клик panel symbol (" + TE.selected.sample + ")");
    selectSample();
  });






  //проверка после перетаскивания, не ушло ли за края
  groupSymbols.on('dragend', function () {
    symbolRollback();
  });
  groupSymbol.add(symbolBox, symbolPath);

  // console.log(counter);
  // console.log(path[key]);
  groupSymbol.x(counter * 60);
  counter++;

  groupSymbols.add(groupSymbol);
}
*/



//mouseover, mouseout, mouseenter, mouseleave


// layerSymbol.draw();





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
    var exceeded = groupSymbols.getStage().width() - (counter * 60);
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
    x = groupSymbols.x() + x;
    var exceeded = groupSymbols.getStage().width() - (counter * 60);
    if (x > -60) {
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
    } else if (x < exceeded - 60) {
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