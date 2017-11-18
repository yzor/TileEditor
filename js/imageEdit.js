var layerImgRaw = new Konva.Layer();
var layerResizeRaw = new Konva.Layer();

var imageRaw = new Image();
imageRaw.src = 'http://yzorrykodelie.ru/wp-content/uploads/2016/03/2.png';
//yzor2 http://yzorrykodelie.ru/wp-content/uploads/2016/03/2.png
//cat https://static-s.aa-cdn.net/img/ios/1171095810/6a8e506cdbc26fb9b73d4ec719b06a1d?v=1
imageRaw.onload = function () {
  var cat = new Konva.Image({
    image: imageRaw,
    width: 190,
    height: 150,
    stroke: '#0060FF',
    strokeWidth: 4,
    x: 16,
    y: 13,
  });
  var groupRaw = new Konva.Group({
    x: 16,
    y: 13,
    draggable: true
  });
  layerImgRaw.add(cat);
  var imgDragZone = cat.clone({
  //  opacity:0.3,
   x: 0, 
   y: 0,
  //  width: 90,
  //  height: 50,
  });
  groupRaw.add(imgDragZone);
  layerResizeRaw.add(groupRaw);
  addAnchor(groupRaw, 0, 0, 'topLeft');
  addAnchor(groupRaw, 190, 0, 'topRight');
  addAnchor(groupRaw, 190, 150, 'bottomRight');
  addAnchor(groupRaw, 0, 150, 'bottomLeft');
  stageEditor.add(layerResizeRaw,layerImgRaw);
  layerImgRaw.moveToBottom();
};


function second_passed() { 
  var qwe = layerImgRaw.get('Image')[0];
  console.log(qwe)
  qwe.height(444);
  stageEditor.draw();
}

setTimeout(second_passed,  340)



//ручное изменение размера картинки
function update(activeAnchor) {
  var group = activeAnchor.getParent();
  var topLeft = group.get('.topLeft')[0];
  var topRight = group.get('.topRight')[0];
  var bottomRight = group.get('.bottomRight')[0];
  var bottomLeft = group.get('.bottomLeft')[0];
  var image = group.get('Image')[0];
  var image2 = layerImgRaw.get('Image')[0];

  
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
  // image2.position(topLeft.position());
  
  var width = topRight.getX() - topLeft.getX();
  var height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
    image2.width(width);
    image2.height(height);
    
  }
  // image.width(100); 
  // image.height(100);
  // image2.width(100);
  // image2.height(100);
  // console.warn(image);
  // console.error(image2);
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
    stageEditor.draw();
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