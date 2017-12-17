"use strict";
//#TODO крестики нолики при выборе нумерации



//следующий цвет из списка
var listColors = ["#ffc107", "#2196f3", "#ff5722", "#cddc39", "#e91e63", "#4caf50", "#ffeb3b", "#9c27b0", "#009688", "#3f51b5", "#f44336", "#8bc34a", "#673ab7", "#ff9800", "#00bcd4", "#795548", "#9e9e9e", "#607d8b", "#03a9f4"]
// listColors = ["red", "green", "blue"]
// listColors = ["red", "orange", "gold", "green", "cyan", "blue", "indigo"]

function nextColor() {
  //#TODO пройтись по списку всех слоёв и удалить цвета которые используются,
  //далее использовать 1 цвет из списка


  var color = listColors.shift()
  listColors.push(color);
  TE.selected.color = color;
  console.log("nextColors('" + color + "')");
} //nextColor();

//Перекрашивание всех элкментов выбранного типа
function repainted(layer) {
  // console.log("repainted → " + layer);

  var NAME;
  NAME = layerTiles.get('.' + layer); //однохуйственно?
  // NAME = layerTiles.find('.'+layer);//однохуйственно?
  // console.log(NAME.length + " → найдено (" + layer + ")");
  // console.log(NAME);
  for (var i = 0, l = NAME.length; i < l; i++) {
    // console.log(NAME[i]);
    NAME[i].fillPatternImage(testIMG);
    // NAME[i].setStroke("darkgreen");
    // NAME[i].setFill(TE.selected.color);
    NAME[i].draw();
  }
  // layerTiles.draw();




  // console.warn(layerTiles);
  // var list = layerTiles.find("." + TE.selected.sample);
  // console.log(list);




  // for (var i = 0, len = list.length; i < len; i++) {
  //   console.error(i);
  //   console.log(list[i]);
  //   // list[i].stroke('red');
  //   list[i].scale({
  //     x: 2,
  //     y: 3
  //   });


  // list[i].fillPatternImage(testIMG); 
  // console.log(testIMG);


  // Проверка, чтобы убедиться, что текущее значение массива числовое
  // if (typeof ar[i] === 'number') {
  //   sum += ar[i]; // если да, добавляем это значение к сумме
  // }
  //}

  //.find('elm')
}

//удаление слоя аля PS
function removeLayer(layer) {
  console.log("removeLayer");
  var element = document.getElementById(layer);
  if (!element) {
    console.error("(" + layer + ") не найден");
  } else {
    console.error("(" + layer + ") Удалён");
    TElayers.removeChild(element);
  }
}

//проверка на существование данного символа в массиве
function checkSample(layer) {
  // console.log("checkSample →(",layer,")");  
  for (var i = 0, l = BD1.length; i < l; i++) {
    for (var iW = 0, lW = BD1[0].length; iW < lW; iW++) {
      // console.error(BD1[i][iW][0]);
      if (BD1[i][iW][0] == layer) {
        return true;
      }
    }
  }
  return false;
}

//Провека фэйков (дабы убрать лишние запросы во время рисования - проводить по запросу)
function checkFake(params) {
  // console.log("checkFake → ("+params+")");
  var $fakeList = $(".fake"); //получаем список фэйков
  //#TODO м.б. проверять все слои?
  for (var i = 0, len = $fakeList.length; i < len; i++) { //перебираем фэйки
    var $fake = $fakeList.eq(i); //текущий фэйк
    console.error("checkFake → (" + $fake.attr("id") + ")");
    if (checkSample($fake.attr("id"))) { //если уже не фэйк, то удаляем отметку
      $fake.removeClass("fake");
    }
  }
}









































//#TODO selectSample надо вызывать из updateLayer или addLayer
//соответствено их переиминовать
//вызывать updateLayer вместо selectSample
//и когда готово будет изображение перерисовывать вставлять в html 





//обновление слоя
function updateLayer(layer) {
  console.warn("updateLayer");
  var element = document.getElementById(layer);
  if (element) { //если такой слой есть
    // console.log(TE.selected.color);
    // console.warn(element.getAttribute("data-color"));
    // TE.selected.color = element.getAttribute("data-color");
    // element.getAttribute("data-color") = TE.selected.color;
    element.setAttribute("data-color", TE.selected.color); //цвет
    element.querySelector('.TElayerName').innerHTML = layer + '!'; //новое имя
    // element.setAttribute("data-color", "red");
    // console.warn(element);
    if ((element.querySelector('img').src) !== testIMG.src) {
      console.log("разные img");
      element.querySelector('img').remove();
      element.appendChild(testIMG);
    }
    // else {
    // console.log(img2.src);
    // console.log(testIMG.src);
    // console.log("одинаковые");
    // }
    $(".act").removeClass("act"); //удалить класс .act
    // element.className = "TElayer act" //проставить у текущего элемент
    $(element).addClass("act");
  } else { //Если слоя нет 
    console.warn("нету", layer);
    checkFake(layer);
    addLayer(layer, testIMG);
  }
}

//добавление слоя аля PS
function addLayer(layer, img) {
  console.log("addLayer → " + layer);
  var element = document.getElementById(layer);
  if (!element) { //если элемента нет
    // nextColor();
    $(".fake").remove(); //удаляем фэйки



    // console.log(layer);
    var layerDiv = document.createElement('div'); //слой
    layerDiv.id = layer;
    layerDiv.className = "TElayer act pulse fake"; //pulse
    // layerDiv.className = "TElayer fake"; //pulse 
    // console.warn(layerDiv.className);
    // console.warn(layerDiv.classList);

    // layerDiv.setAttribute("data-color", "red");
    layerDiv.setAttribute("data-color", TE.selected.color);

    var layerName = document.createElement('span'); //имя слоя
    layerName.className = "TElayerName";
    layerName.innerHTML = layer;
    layerDiv.appendChild(layerName);

    if (img) {
      // img.className = "TElayerIcon";
      layerDiv.appendChild(img);
    } else {
      console.log("нет изображения");
    };


    $(".act").removeClass("act");
    TElayers.appendChild(layerDiv);
    //прокрутка к элементу
    scrollToElement(layer)

    function scrollToElement(theElement) {
      //   var selectedPosX = 0;
      //   var selectedPosY = 0;

      //   while (theElement != null) {
      //     selectedPosX += theElement.offsetLeft;
      //     selectedPosY += theElement.offsetTop;
      //     theElement = theElement.offsetParent;
      //   }

      //   window.scrollTo(selectedPosX, selectedPosY);
    }
    /*анимация появления*/
    setTimeout(function () {
      $(".pulse").removeClass("pulse");
    }, 20);
  } else { //если элемент уже есть
    updateLayer(layer);
    // console.log("Элемент уже есть");
  }
}

//выбор элемента из списка всех узоров
function selectSampleOLD() { //#TODO createSample
  console.log("selectSample(" + TE.selected.sample + ")");
  tilePath.data(path[TE.selected.sample]); //отрисовываем выбраную фигуру
  tileBg.fill(TE.selected.color); //отрисовываем выбраный цвет
  remakeSample(); //перерисовать символ
  layerSample.draw(); //отрисовать слой образца (для тестов)
  // addLayer(TE.selected.sample); 
}
//выбор элемента из списка всех узоров
function selectSample() { //#TODO createSample
  var layer1 = TE.selected.sample;// выбираем текущий символ
  console.log('%c%s', 'color: green;', "selectSample(" + layer1 + ")");//test

  var element = document.getElementById(layer1);//Получаем элемент со страницы с выбраным айди
  if (element) { //если такой слой есть
    console.log('%c%s', 'color: green;', "Есть элемент", element);
    var qwe = "red"; 
    console.log('%c%s', 'background: ' + element.getAttribute("data-color")+';', element.getAttribute("data-color"));
    TE.selected.color = element.getAttribute("data-color");


  } else { //Если слоя нет 
    console.log('%c%s', 'color: green;', "Элемента нет", element);
    //если слоя нет и нет фэйка, то обновляем цвет
    checkFake(layer1);

    if ($("div").is(".fake")) { //если есть фэйк
      console.log('%c%s', 'color: green;', "есть фэйк");
    } else { //Если нет фэйка
      console.log('%c%s', 'color: green;', "нет фэйка");
      nextColor();//меняем цвет если нет фэйка и слоя
    }
  }



  tilePath.data(path[layer1]); //отрисовываем выбраную фигуру
  tileBg.fill(TE.selected.color); //отрисовываем выбраный цвет
  remakeSample(); //перерисовать символ
  layerSample.draw(); //отрисовать слой образца (для тестов)
  // addLayer(layer1); 
}

//отрисовываем образец заново
var testIMG;

function remakeSample() {
  console.log("remakeSample");
  var image = tile.toImage({
    x: tile.x(),
    y: tile.y(),
    width: boxSize,
    height: boxSize,
    callback: function (img) { //действие при получении изображения элемента
      testIMG = img; //закидываем картинку в переменную, дабы расширить область видимости
      updateLayer(TE.selected.sample, testIMG); //#TODO  не нужен второй параметр?
      repainted(TE.selected.sample); //обновить все такие-же
      /*
        // addLayer(TE.selected.sample,"https://makeagif.com/images/logo.svg"); 
        // addLayer(TE.selected.sample,img); 
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
      */
    }
  });

}





//Выбор элемента в списке слоёв
$(document).on("click", '.TElayer', function () {
  console.log("Клик panel layer", this);
  TE.selected.sample = this.id; //устанавливаем активный символ из слоя
  TE.selected.color = this.getAttribute("data-color"); //устанавливаем активный цвет из слоя 
  $(".act").removeClass("act"); //удаляем метку активного слоя
  $(this).addClass("act"); //ставим метку текущему слою
  selectSample(); //перерисовка символа
});

//выбор цвета с палитры
$(".samples").click(function () {
  console.log("Клик палитра (" + color + ")");
  $(".actColor").removeClass("actColor");
  $(this).addClass("actColor");
  var color = $(this).css("background-color"); //выбираем цвет с палитры
  TE.selected.color = color; //сохраняем цвет
  selectSample(); //перерисовка символа
});




function select(params) {}