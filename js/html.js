console.clear();
//#TEpanelR>#TElayers>(button.TElayer>.TElayerIcon+span.TElayerName>lorem2)*40

//parentElem.appendChild(elem)
//Добавляет elem в конец дочерних элементов parentElem.




// var div = document.createElement('div');
// div.className = "alert alert-success";
// div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";
// TElayers.appendChild(layerDiv);
// TElayers.appendChild(layerDiv);
// TElayers.appendChild(layerDiv);
// TElayers.appendChild(layerDiv);
function removeLayer(param) {
  var element = document.getElementById(param);
  if (!element) {
    console.error("(" + param + ") не найден");
  } else {
    console.error("(" + param + ") Удалён");
    TElayers.removeChild(element);
  }
}
// addLayer("Лицевая");
// addLayer("Прогиб");

function addLayer(param, img) {
  var element = document.getElementById(param);
  if (!element) {
    // console.log(param);
    var layerDiv = document.createElement('div');//слой
    layerDiv.id = param;
    layerDiv.className = "TElayer act";

    var layerName = document.createElement('span');//имя слоя
    layerName.className = "TElayerName";
    layerName.innerHTML = param;
    layerDiv.appendChild(layerName);
    
    if(img){
      img.className = "TElayerIcon";
      layerDiv.appendChild(img);
    }else{
      console.log("нет изображения");
    };
    $(".act").removeClass("act");
    TElayers.appendChild(layerDiv);
    setTimeout(function () {
      /*анимация появления*/
    }, 1000);
  } else {
    // console.log("Элемент уже есть");
  }
}


/*Клик по элементу в списке слоёв*/
$(document).on("click", '.TElayer', function () {
  console.error(this.id);
  TE.selected.sample = this.id; //сохраняем цвет
  $(".act").removeClass("act");
  $(this).addClass("act");
  selectSample();
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
