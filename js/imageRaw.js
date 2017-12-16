var layerRawImg = new Konva.Layer(); //слой для изображения
var layerRawResize = new Konva.Layer(); //слой для изменения размера
var groupResize, ImageRawKonva;
var ImageRaw = new Image(); //создаём изображение
ImageRaw.src = 'https://yzorrykodelie.ru/wp-content/uploads/2016/03/2.png';
ImageRaw.onload = function () { //дейтвие при загрузке изображения
  console.log(ImageRaw.height, ImageRaw.width);
  ImageRawKonva = new Konva.Image({ //изображение
    image: ImageRaw,
    width: ImageRaw.width,
    height: ImageRaw.height,
    stroke: '#0060FF',
    strokeWidth: 6,
    // x: 16,
    // y: 13,
  });
  var groupRaw = new Konva.Group({ //группа для изменения размера
    x: 16,
    y: 13,
    // draggable: true
  });
  groupRaw.add(ImageRawKonva); //добавляем сырьевое изображение  в группу
  layerRawImg.add(groupRaw); //и на слой
  groupResize = groupRaw.clone({ //группа для изменения размера
    draggable: true
  });
  groupResize.get('Image')[0].setOpacity(0.6);
  // console.log(groupRaw.get('Image')[0]);
  groupResize.on('dragmove', function () { //отлов перемещений
    groupRaw.setX(groupResize.x());
    groupRaw.setY(groupResize.y());

    // stageEditor.draw();//#TODO поправить

    layerRawImg.draw();
    // layerRawResize.draw();

    // layerRawImg.batchDraw();
    layerRawResize.batchDraw();
  });




  // groupResize.add(imgDragZone);
  layerRawResize.add(groupResize); //добавляем изображение в группу
  addAnchor(groupResize, 0, 0, 'topLeft'); //добавляем угловые точки
  addAnchor(groupResize, 190, 0, 'topRight');
  addAnchor(groupResize, 190, 150, 'bottomRight');
  addAnchor(groupResize, 0, 150, 'bottomLeft');
  resizeOFF();
  // stageEditor.add(layerRawResize, layerRawImg);
  // layerRawImg.moveToBottom();

};



//перетаскивание RAW слоя
function dragRaw(group) {}




// ручное изменение размера картинки
function update /*resize*/ (activeAnchor) {
  // console.log(activeAnchor);
  var group = activeAnchor.getParent(); //получаем родительскую группу для точки
  var topLeft = group.get('.topLeft')[0]; //привязываем точки к переменной
  var topRight = group.get('.topRight')[0];
  var bottomRight = group.get('.bottomRight')[0];
  var bottomLeft = group.get('.bottomLeft')[0];
  var image = group.get('Image')[0]; //привязываем изображение к переменной


  var image2 = layerRawImg.get('Image')[0]; //custom


  var anchorX = activeAnchor.getX(); //координаты активной точки относительно default(а)
  var anchorY = activeAnchor.getY();


  var qweX = topLeft.getX();
  var qweY = topLeft.getY();

  // console.log(qweX,qweY,"|",anchorX, anchorY);


  // update anchor позиции//обновить позиции
  switch (activeAnchor.getName()) {
    //если имя точки "НИЖНЯЯ ПРАВАЯ",
    //то обновить позиции точек "НИЖНЯЯ левая" и "верхняя ПРАВАЯ"
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

  image.position(topLeft.position()); //переместить изображение в "верхнюю левую" точку
  image2.position(topLeft.position());

  var width = topRight.getX() - topLeft.getX(); //ширина = разница между двумя верхними точками
  var height = bottomLeft.getY() - topLeft.getY(); //высота = разница между двумя левыми точками
  if (width && height) { //если есть ширина и высота (#TODO  а может и не быть?), то изменяем размеры картинки
    image.width(width);
    image.height(height);
    image2.width(width); //custom
    image2.height(height); //custom

  }
}














// ручное изменение размера картинки OLD
function updateOLD(activeAnchor) { //activeAnchor → точка перетягивания
  // console.log(activeAnchor);
  var group = activeAnchor.getParent(); //получаем родительскую группу для точки
  var topLeft = group.get('.topLeft')[0]; //привязываем точки к переменной
  var topRight = group.get('.topRight')[0];
  var bottomRight = group.get('.bottomRight')[0];
  var bottomLeft = group.get('.bottomLeft')[0];
  var image = group.get('Image')[0]; //привязываем изображение к переменной


  var image2 = layerRawImg.get('Image')[0]; //custom


  var anchorX = activeAnchor.getX(); //координаты активной точки относительно default(а)
  var anchorY = activeAnchor.getY();
  console.log(anchorX, anchorY);


  // update anchor позиции//обновить позиции
  switch (activeAnchor.getName()) {
    //если имя точки "НИЖНЯЯ ПРАВАЯ",
    //то обновить позиции точек "НИЖНЯЯ левая" и "верхняя ПРАВАЯ"
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

  image.position(topLeft.position()); //переместить изображение в "верхнюю левую" точку
  // image2.position(topLeft.position());

  var width = topRight.getX() - topLeft.getX(); //ширина = разница между двумя верхними точками
  var height = bottomLeft.getY() - topLeft.getY(); //высота = разница между двумя левыми точками
  if (width && height) { //если есть ширина и высота (#TODO  а может и не быть?), то изменяем размеры картинки
    image.width(width);
    image.height(height);
    image2.width(width); //custom
    image2.height(height); //custom

  }
}
//добавление угловых точек
function addAnchor(group, x, y, name) {
  var stage = group.getStage();
  var layer = group.getLayer();

  var anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: '#666',
    fill: '#ddd',
    strokeWidth: 2,
    radius: 8,
    name: name,
    draggable: true,
    dragOnTop: false
  });

  anchor.on('dragmove', function () {
    update(this);
    layer.draw();
    // stageEditor.draw();//#TODO поправить
    layerRawImg.batchDraw();
    layerRawResize.batchDraw();

  });
  anchor.on('mousedown touchstart', function () {
    group.setDraggable(false);
    this.moveToTop();
  });
  anchor.on('dragend', function () {
    group.setDraggable(true);
    layer.draw();
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












//вкл редактирование
function resizeON() {
  // console.warn("ON"); 
  groupResize.show();
  ImageRawKonva.setStrokeWidth(6);
  stageEditor.draw();
}
//выкл редактирование
function resizeOFF() {
  // console.error("OFF");
  groupResize.hide();
  // ImageRawKonva.setX(10);
  ImageRawKonva.setStrokeWidth();
  stageEditor.draw();
}
//включаем трансформацию по чекбоксу
$(function () {
  $("#resize").change(function () {
    if ($("#resize").prop("checked")) {
      resizeON();
    } else {
      resizeOFF();
    }
  });
});