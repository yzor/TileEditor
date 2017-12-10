//#TEpanelR>#TElayers>(button.TElayer>.TElayerIcon+span.TElayerName>lorem2)*40


function removeLayer(layer) {
  var element = document.getElementById(layer);
  if (!element) {
    console.error("(" + layer + ") не найден");
  } else {
    console.error("(" + layer + ") Удалён");
    TElayers.removeChild(element);
  }
}

// addLayer("Лицевая");
// addLayer("Прогиб");
function updateLayer(layer) {
  console.warn("updateLayer");
  var element = document.getElementById(layer);
  if (element) { //если элемент есть
    element.querySelector('.TElayerName').innerHTML = layer + '!'; //новое имя
    if ( (element.querySelector('img').src) !== testIMG.src) {
      console.log("разные img");
      element.querySelector('img').remove();
      element.appendChild(testIMG);
    } 
    // else {
      // console.log(img2.src);
      // console.log(testIMG.src);
      // console.log("одинаковые");
    // }
    $(".act").removeClass("act");//удалить класс .act
    element.className = "TElayer act" //проставить у текущего элемент
  }
}

function addLayer(layer, img) {
  console.log("addLayer");
  var element = document.getElementById(layer);
  if (!element) { //если элемента нет
    // console.log(layer);
    var layerDiv = document.createElement('div'); //слой
    layerDiv.id = layer;
    layerDiv.className = "TElayer act pulse"; //pulse
    layerDiv.setAttribute("data-color", "red")
    // console.warn(TE);
    //elem.getAttribute(name)
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
    updateLayer(layer)
    // console.log("Элемент уже есть");
  }
}








/**
 * выбор элемента из списка всех узоров
 */
function selectSample() {
  // console.warn(TE.selected.sample); 
  tilePath.data(path[TE.selected.sample]);
  tileBg.fill(TE.selected.color);
  remakeSample(); //перерисовать символ
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
  console.log("remakeSample");
  var image = tile.toImage({
    x: tile.x(),
    y: tile.y(),
    width: boxSize,
    height: boxSize,
    callback: function (img) {
      // console.log(img);
      testIMG = img;
      /*!!!*/
      addLayer(TE.selected.sample, testIMG);
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
    }
  });

}

































/*Клик по элементу в списке слоёв*/
$(document).on("click", '.TElayer', function () {
  console.error(this.id);
  TE.selected.sample = this.id; //сохраняем цвет
  $(".act").removeClass("act");
  $(this).addClass("act");
  selectSample(); //перерисовка символа
  // console.log(TE.selected);
});



//выбор цвета с палитры
$(".samples").click(function () {
  $(".act").removeClass("act");
  $(this).addClass("act");
  sample = $(this).css("background-color");
  TE.selected.color = sample; //сохраняем цвет
  // sandboxTools(sample, $(this).attr('id'));
  selectSample(); //перерисовка символа
});