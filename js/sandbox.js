//подогнать под экран
function fitScreen() {
    var qweW = (widthScreen) / (holstW + 3);
    var qweH = (heightScreen - 70) / (holstH + 3);
    var qwe = qweW > qweH ? qweH : qweW; // наименьшее частное
    qwe = qwe > 100 ? 100 : qwe; //не более 100
    qwe = qwe < 20 ? 20 : qwe; //не менее 20
    boxSize = Math.round(qwe); //округляем

    tileBg.width(boxSize + 2).height(boxSize + 2); //изменить размер подложки
    tilePath.scale({ // изменить маштаб символа
        x: boxSize / 1000, //100
        y: boxSize / 1000
    });
    remakeSample(); //перерисовать символ

}





function addAssets() { }
function removeAssets() { }
// layerAssets.add(groupAssets);
// stageEditor.add(layerAssets);



//////////////////////////////////////***********


