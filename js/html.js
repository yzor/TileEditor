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
addLayer("Лицевая");
addLayer("Прогиб");

function addLayer(param, layerIcon4) {
  var element = document.getElementById(param);
  if (!element) {
    // console.log(param);
    var layerName = document.createElement('span');
    layerName.className = "TElayerName";
    layerName.innerHTML = param;

    // var layerIcon = img;
    layerIcon4.className = "TElayerIcon";
    // var layerIcon2 = document.createElement('img');
    // console.log(layerIcon);
    // console.log(layerIcon2);
    // var layerIcon = document.createElement('img');
    // img.className = "TElayerIcon"; 
    // layerIcon.className = "TElayerIcon";

    var layerDiv = document.createElement('div');
    layerDiv.id = param;
    layerDiv.className = "TElayer";

    layerDiv.appendChild(layerIcon4);
    // layerDiv.appendChild(img);
    layerDiv.appendChild(layerName);
    TElayers.appendChild(layerDiv);
    setTimeout(function () {
      /*анимация появления*/
    }, 1000);
  } else {
    console.log("Элемент уже есть");
  }
}


/*Клик по элементу в списке слоёв*/
$(document).on("click", '.TElayer', function () {
  console.error(this.id);
});