// "use strict";
var stageSave, layerSave, qweH, qweW

function saveDialog(jBox) {
    qweH = boxSize * (holstH + 2);
    qweW = boxSize * (holstW + 2);
    // jBox.options.width = "60%"; //высота модалки
    // jBox.options.height = "60%"; // ширина модалки

    // console.log("qweH",qweH);
    // console.log("qweW",qweW);
    // console.log("boxSize", boxSize);
    // console.log("holstH", holstH);
    // console.log("holstW", holstW);

    jBox.options.minWidth = 200; //высота модалки

    if (qweH < 200 && qweW > 200) {
        jBox.options.minHeight = qweH + 61; // ширина модалки

    } else {
        jBox.options.minHeight = 200; // ширина модалки
    }
    jBox.options.width = qweW; //высота модалки
    jBox.options.height = qweH; // ширина модалки






    // Minimal width and height of content area
    //minWidth
    // minHeight








    stageSave = new Konva.Stage({
        draggable: true,
        container: 'TEsave-stage', //айди контейнера
        width: 300,
        height: 100
    });
    layerSave = new Konva.Layer();
    var bg = new Konva.Rect({
        // opacity:0.4,
        height: qweH,
        width: qweW,
        fill: '#222'
    });
    layerSave.add(bg); //фон
    // console.error(layerTiles);

    layerSave.add(layerTiles.getChildren()[0].clone({
        x: boxSize,
        y: boxSize
    }).move({
        // x: boxSize,
        // y: boxSize
    })); //тайлы

    layerSave.add(layerRap.getChildren()[0].clone({
        x: boxSize,
        y: boxSize
    })) //раппорт


    layerSave.add(layerNum.getChildren()[0].clone().move({
        x: boxSize,
        y: boxSize
    })); //линейки
    layerSave.add(layerNum.getChildren()[1].clone().move({
        x: boxSize,
        y: boxSize
    })); //линейки
    layerSave.add(layerNum.getChildren()[2].clone().move({
        x: boxSize,
        y: boxSize
    })); //линейки
    layerSave.add(layerNum.getChildren()[3].clone().move({
        x: boxSize,
        y: boxSize
    })); //линейки

    stageSave.add(layerSave);
    layerSave.cache();


}
// saveDialog();
function saveDialogSize(params) { //после получения размера модалки
    const W = $(".save-dialog").width();
    const H = $(".save-dialog").height();
    stageSave.width(W);
    stageSave.height(H);
    if (W > qweW) {
        stageSave.x((200 - qweW) / 2);
        if (H > qweH) {
            stageSave.y((200 - qweH) / 3);
        }
    }


    stageSave.draw();
    // console.error($("#TEsave-stage").width(), $(".save-dialog").width(), "### onPosition");
}


function downloadImg(params) {
    var dataURL = layerSave.toDataURL({
        x: layerSave.getAbsolutePosition().x,
        y: layerSave.getAbsolutePosition().y,
        height: qweH,
        width: qweW,
    });
    downloadURI(dataURL, 'Схема.png');
}


//скачивание изображения   не работает в эдже
// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
/*

        // console.warn("сохранить ");
        // var dataURL = stageEditor.toDataURL();
        // downloadURI(dataURL, 'Схема.jpg' );
        // downloadURI(dataURL, 'Схема.png' );*/