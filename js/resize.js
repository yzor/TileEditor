function roundToBoxSize(num, tilesPos) { //округление до значения кратного клетке
    // return Math.round(num / boxSize) * boxSize;
    //↑v1 округляет число кратно клетке

    //↓v2 округляет число кратно клетке учитывая координаты тайлов #TODO избавиться от второго параметра
    return Math.round((num - tilesPos) / boxSize) * boxSize + tilesPos;

}







function update(activeAnchor) {
    var group = activeAnchor.getParent();
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var image = group.get('Image')[0];

    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();

    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }

    image.position(topLeft.position());

    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
    if (width && height) {
        image.width(width);
        image.height(height);
    }
}
var oldPosAnchor = {
    x: 0,
    y: 0
};
var newRap;

function updateRap(activeAnchor) {
    var newPosAnchor = activeAnchor.position()
    if (newPosAnchor.x == oldPosAnchor.x && newPosAnchor.y == oldPosAnchor.y) { //если позиция не изменилась то не продолжать
        return false;
    }
    oldPosAnchor = newPosAnchor;


    var group = activeAnchor.getParent(); //родительская группа точек
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    // var image = group.get('Image')[0];

    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();
    // var anchorX = roundToBoxSize(activeAnchor.getX()); //округлённые значения, округляются на более раннем этапе?
    // var anchorY = roundToBoxSize(activeAnchor.getY());
    // Обновление позиции точек
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }


    var w = topRight.x() - topLeft.x(),
        h = bottomLeft.y() - topLeft.y(),
        x = topRight.x() < topLeft.x() ? topRight.x() : topLeft.x(),
        y = bottomLeft.y() < topLeft.y() ? bottomLeft.y() : topLeft.y();
    if (h < 0) h *= -1; //если отрицательное значение
    if (w < 0) w *= -1;

    layerRap.getChildren()[0].points([
        x, y,
        x + w, y,
        x + w, y + h,
        x, y + h,
        // x, y, // последняя точка как первая, если линия не закрыта. закрыть нельзя
    ]);

    // layerRap.draw();
    layerRap.batchDraw();
    newRap = {
        x: x,
        y: y,
        h: h,
        w: w
    }
}


function addAnchor(group, x, y, name) {
    // var stage = group.getStage();
    var layer = group.getLayer();

    var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 12,
        name: name,
        draggable: true,
        dragOnTop: false,
        dragBoundFunc: function (pos) {
            //#TODO сделать нормально :0)

            // console.log(pos);
            // console.log((roundToBoxSize(pos.x) + "_" + roundToBoxSize(pos.y)));
            var qwePos = layerTiles.getAbsolutePosition();
            var qwePos2 = layerTiles.getAbsolutePosition();

            // var posX = roundToBoxSize(pos.x, qwePos.x);
            // var posY = roundToBoxSize(pos.y, qwePos.y);
            pos.x = roundToBoxSize(pos.x, qwePos.x);
            pos.y = roundToBoxSize(pos.y, qwePos.y);


            //запрет на перемещение точки за пределы схемы(не оптимизирован)
            qwePos2.x += holstW * boxSize;
            qwePos2.y += holstH * boxSize;
            // console.error("qwePos/2", qwePos, qwePos2, );
            if (pos.x < qwePos.x) { //если левее
                pos.x = qwePos.x;
            } else if (pos.x > qwePos2.x) { //правее
                pos.x = qwePos2.x;
            }
            if (pos.y < qwePos.y) { //если выше
                pos.y = qwePos.y;

            } else if (pos.y > qwePos2.y) { //ниже
                pos.y = qwePos2.y;
            }
            return {
                // x: roundToBoxSize(pos.x),
                // y: roundToBoxSize(pos.y)
                x: pos.x,
                y: pos.y
                // y: this.getAbsolutePosition().y
            }
        }
    });

    anchor.on('dbltap dblclick', function () {
        this.off('mouseout');//[fix]если удалить элемент не снимая обработчик вылезают ошибки
        rapResizeApply();
        // this.off('dbltap dblclick dragmove mousedown touchstart dragend mouseover mouseout');
        // layerNum.draw();
        // console.log("двойной клик");
    });

    anchor.on('dragmove', function () {
        // update(this);//original
        updateRap(this); //custom for rap

    });
    anchor.on('mousedown touchstart', function () {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function () {
        group.setDraggable(true);
        // layer.draw();//#TODO ошибка
    });
    // add hover styling
    anchor.on('mouseover', function () {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        layer.draw();
    });
    anchor.on('mouseout', function () {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        layer.draw();
    });




    group.add(anchor);
}




/*
 var stage = new Konva.Stage({
   container: 'container',
   width: width,
   height: height
 });

 var layer = new Konva.Layer();
 stage.add(layer);

 darth vader
 var darthVaderImg = new Konva.Image({
   width: 200,
   height: 137
 });

 yoda
 var yodaImg = new Konva.Image({
   width: 93,
   height: 104
 });

 var darthVaderGroup = new Konva.Group({
   x: 180,
   y: 50,
   draggable: true
 });
 layer.add(darthVaderGroup);
 darthVaderGroup.add(darthVaderImg);
 addAnchor(darthVaderGroup, 0, 0, 'topLeft');
 addAnchor(darthVaderGroup, 200, 0, 'topRight');
 addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
 addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

 var yodaGroup = new Konva.Group({
   x: 20,
   y: 110,
   draggable: true
 });
 layer.add(yodaGroup);
 yodaGroup.add(yodaImg);
 addAnchor(yodaGroup, 0, 0, 'topLeft');
 addAnchor(yodaGroup, 93, 0, 'topRight');
 addAnchor(yodaGroup, 93, 104, 'bottomRight');
 addAnchor(yodaGroup, 0, 104, 'bottomLeft');

 var imageObj1 = new Image();
 imageObj1.onload = function () {
   darthVaderImg.image(imageObj1);
   layer.draw();
 };
 imageObj1.src = '/assets/darth-vader.jpg';

 var imageObj2 = new Image();
 imageObj2.onload = function () {
   yodaImg.image(imageObj2);
   layer.draw();
 };
 imageObj2.src = '/assets/yoda.jpg'; */