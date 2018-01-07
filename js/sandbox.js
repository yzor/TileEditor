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
    //если схема больше экрана, то включаем кнопки навигации
    if ((holstW + 2) * boxSize > widthScreen || (holstH + 2) * boxSize > heightScreen) {
        $("body").addClass("over");
    } else {
        $("body").removeClass("over");
    }
}


function moveToCorner(corner) { //перемещение к указанному углу

    console.clear();


    let pX = widthScreen / 9, //горизонтальный отступ в одну девятую
        pY = heightScreen / 9, //вертикальный отступ
        x = 0 + boxSize + pX, //левая позиция
        y = 40 + boxSize + pY, //верхняя
        xRigth = widthScreen - boxSize * (holstW + 1) - pX, //правая
        yBottom = heightScreen - (boxSize * (holstH + 1)) - 50 - pY; //нижняя
    // let centerH = (heightScreen - (boxSize * (holstH + 2))) / 2; //верх схемы установленой по центру
    // let centerW = (widthScreen - (boxSize * (holstW + 2))) / 2; //левый край схемы по центру
    // let centerHB = (heightScreen + (boxSize * (holstH + 2))) / 2; //низ схемы установленой по центру
    // let centerWB = (widthScreen + (boxSize * (holstW + 2))) / 2; //правый край


    // console.log("←" + centerH + "   →" + centerHB + "   =" + (centerHB - centerH));
    // console.log("↑" + centerW + "   ↓" + centerWB + "   =" + (centerWB - centerW));
    // console.log("x-" + x, "y-" + y)
    if (corner == "br") {
        y = yBottom;
        x = xRigth;
        // if (y > centerH) y = centerH; //♦♦♦
        // if (x > centerW) x = centerW; //♦♦♦
    } else if (corner == "bl") {
        y = yBottom;
        // if (y > centerH) y = centerH; //♦♦♦
        // console.log(x, centerW);
        // if (x - (boxSize * (holstW + 2))  > centerWB) x = centerW;
    } else if (corner == "tr") {
        x = xRigth;
        // if (x > centerW) x = centerW; //♦♦♦
        // if (y - (boxSize * (holstH + 2)) < centerHB) y = centerH;
    } else if (corner == "tl") {
        // console.log("x-" + x, "centerW" + centerW);
        // if (y - (boxSize * (holstH + 2)) < centerHB) y = centerH;
        // if (x - (boxSize * (holstW + 2)) < centerWB) x = centerW;
    }

    if (boxSize * (holstH + 2) + 100 < heightScreen) { //если высота схемы меньше чем холста то выводит по центру
        y = (heightScreen - boxSize * (holstH + 2)) / 2;
    }
    if (boxSize * (holstW + 2) + 100 < widthScreen) { //если ширина схемы меньше чем холста то выводим по центру
        x = (widthScreen - boxSize * (holstW + 2)) / 2;
    }
    layerTiles.position({
        x: x,
        y: y
    }).draw();
    layerRap.position({
        x: x,
        y: y
    }).draw();
    layerNum.position({
        x: x,
        y: y
    }).draw();








}



function addAssets() {}

function removeAssets() {}
// layerAssets.add(groupAssets);
// stageEditor.add(layerAssets);



//////////////////////////////////////***********