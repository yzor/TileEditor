"use strict";

var layerAsset = {

};
//нажатие на клетку



// console.warn(BD1);

// layerTiles.on('touchstart touchmove touchend tap dbltap dragstart dragmove dragend', function (evt) {
//   console.log(evt.type+"♠");
// layerTiles.draggable(true);
// });

// layer.on('mousemove', function(evt) {
//КликКлак
layerTiles.on('mousedown mouseover touchmove touchstart', function (evt) {
    let evtT = evt.type;
    if (mouseL || evtT == "mousedown" || evtT == "touchstart") { //если мышь нажата
        if (keySpace) { //[END]SPASE
            // layerTiles.draggable(true);//включить перетаскивание
            return false; //не продолжать
        }
        let box = evt.target, //бокс срабатывания
            X = box.x() / boxSize,
            Y = box.y() / boxSize,
            sample = BD1[Y][X][0],
            color = BD1[Y][X][1],
            tool = TE.selected.tools;
        if (tool == "rap") return false;//[END]Раппорт
        if (evt.evt.ctrlKey) { //[END]CTRL
            // console.log('%c%s', 'color: gold;', evt.evt.ctrlKey);
            if (sample) {
                TE.selected.sample = sample
            }
            if (color) {
                TE.selected.color = color
            }
            selectSample();
            // console.log('%c%s', 'color: red;', BD1[Y][X][0]);
            // console.log('%c%s', 'color: red;', BD1[Y][X][1]);
            return false; //не продолжать
        }
        if (tool == "erase") { //[END]Стёрка
            if (color || sample) { //если клетка закрашена
                BD1[Y][X][0] = false;
                BD1[Y][X][1] = false;
                box.fillPatternRepeat("repeat") //вкл повтор заливки
                    .fillPatternImage(eraseIMG) //заливаем клетку фоновым цветом
                    .removeName(box.name()) //удалить имя
                    .draw(); //закрашиваем поверх
            }
            return false;
        }
        if (color || sample) { //(protect) если клетка уже закрашена
            if (sample == TE.selected.sample && color == TE.selected.color) { //[END]если cимвол/цвет такойже
                if (TE.selected.tools !== "pen+") { //не активен pen+. Вынесен отдельно дабы не срабатывала защита при встрече такого же символа
                    TE.selected.tools = "pen-";
                    //стираем клетку
                    BD1[Y][X][0] = false;
                    BD1[Y][X][1] = false;
                    box.fillPatternRepeat("repeat") //вкл повтор заливки
                        .fillPatternImage(eraseIMG) //заливаем клетку фоновым цветом
                        .removeName(box.name()) //удалить имя
                        .draw(); //закрашиваем поверх
                    return false;
                }
                // return false;
            } else if (TE.options.protect && tool !== "pen-") { //[END]символ иной, защита включена И  не включено стирание
                //#TODO чтобы анимация не начиналась каждый раз заново - повесить счётчик
                //Если счётчик превышает n нажатий то делать шейк
                //Если одна и таже клетка второй раз подряд, то делать шейк
                // console.log('%c%s', 'background: red;', "detect");
                // if (TE.options.protect) { //Если защита включена, то закругляемся
                TE.selected.tools = "pen+";//включить режим рисования, дабы если мышь передвинется на закрашеную активным цветом клетку - не включался режим стирания
                var $elm = $("#TEprotect")
                $elm.removeClass("detect");
                setTimeout(function () {
                    $elm.addClass("detect");
                }, 0);
                // console.log(TE.options.protect);
                return false; //не продолжать
                // }
            } else if (tool !== "pen-") { //если не включен режим стёрки, тогда включаем закрашивание и закрашиваем клетку
                if (tool == "pen") TE.selected.tools = "pen+";
                box.name(TE.selected.sample) //записать имя в бокс(?)
                    .fillPatternImage(testIMG) //заливаем клетку изображением
                    .draw(); //перерисовываем бокс поверх
                //записываем в объект цвет и текущий символ
                BD1[Y][X][0] = TE.selected.sample;
                BD1[Y][X][1] = TE.selected.color;
            }
        } else if (tool == "pen+" || tool == "pen") { //клетка пустая и активен pen/pen+
            if (TE.selected.tools == "pen") TE.selected.tools = "pen+"; //включаем pen+ если не включен
            box.name(TE.selected.sample) //записать имя в бокс(?)
                .fillPatternImage(testIMG) //заливаем клетку изображением
                .draw(); //перерисовываем бокс поверх
            //записываем в объект цвет и текущий символ
            BD1[Y][X][0] = TE.selected.sample;
            BD1[Y][X][1] = TE.selected.color;
        }
    }
});


var mouseL; //флаг о нажатии мыши
layerTiles.on('touchstart', function (evt) { //тач событие, но флаг ставим/убираем:0)
    mouseL = true;
});
layerTiles.on('touchend', function (evt) { //тач событие
    pressEnd();
});
$(document).mousedown(function (e) { //нажал мышь
    if (e.which == 1) {

        mouseL = true; //нажал мышь
    }
});
$(document).mouseup(function (e) { //отжал мышь
    if (e.which == 1) {
        pressEnd();
    }
});

function pressEnd() { //окончание нажатия
    if (TE.selected.tools == "pen+" || TE.selected.tools == "pen-") TE.selected.tools = "pen"; //при поднятии мыши выбираем нейтральный "pen" если он был изменён
    mouseL = false; //отжал мышь
    // console.log("отжал");
}


var keySpace; //флаг о нажатии мыши
$(document).keydown(function (e) { //нажал клаву
    if (keySpace) { //если флаг уже поставлен то не продолжать
        return false; //#TODO проверить есть ли профит от данной конструкции
    }
    if (e.which == 32) { //32-пробел
        e.preventDefault(); //отключить действие по умолчанию
        console.log('%c%s', 'color: gold;', "↓", e.which);
        keySpace = true; //нажал
        document.body.style.cursor = 'move'; //ставим курсор перетаскивания
        //#TODO grab, grabbing
        layerTiles.draggable(true); //разрешаем перетаскивать слой с тайлами
    }
    // console.log(e.which); // нажимаемая клавиша
    /*   if (e.which == 16) { //16-шифт
        e.preventDefault(); //отключить действие по умолчанию
        console.log('%c%s', 'color: gold;', "↓", e.which);
        // keySpace = true; //нажал
        // document.body.style.cursor = 'move'; //ставим курсор перетаскивания
        fastDrag();
      }
      if (e.which == 18) { //18-Alt
        e.preventDefault(); //отключить действие по умолчанию
        console.log('%c%s', 'color: gold;', "↓", e.which);
        // keySpace = true; //нажал
        // document.body.style.cursor = 'move'; //ставим курсор перетаскивания
        fastDrag2();
      } */
});

$(document).keyup(function (e) { //отжал клаву
    if (e.which == 32) { //32-пробел
        console.log('%c%s', 'color: green;', "↑", e.which);
        keySpace = false; //отжал
        document.body.style.cursor = 'default'; //возвращаем курсор
        layerTiles.draggable(false); //запрещаем перетаскивать слой с тайлами
    }

    /*   if (e.which == 16) { //16-шифт
        console.log('%c%s', 'color: green;', "↑", e.which);
        keySpace = false; //отжал
        document.body.style.cursor = 'default'; //возвращаем курсор
        fastDragOFF();
      }
      if (e.which == 18) { //18-Alt
        console.log('%c%s', 'color: green;', "↑", e.which);
        keySpace = false; //отжал
        document.body.style.cursor = 'default'; //возвращаем курсор
        fastDragOFF2();
      } */
});


/*
 $(document).keypress(function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  console.log('%c%s', 'color: red;', "↓", code);
  console.log('%c%s', 'color: red;', "↓", e.which);
  if (e.which == 1) {
    console.log("отжал");
    mouseL = false; //отжал мышь
  }
 });
*/
// $(document).bind('keypress', function (e) {

//   // $('#keydiv').html($('#keydiv').html() + code + ' ');
// });
// // $('#myinput').bind('keypress', function (e) {
// //   var code = (e.keyCode ? e.keyCode : e.which);
// //   $('#keydiv').html($('#keydiv').html() + code + ' ');
// //  //