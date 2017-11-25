var layerSample = new Konva.Layer();
var tilePath = new Konva.Path({
  //8 9 10 12 bad 
  data: s1,
  fill: "red",
  x: 0,
  y: 0,
  scale: {
    x: boxSize / 20,
    y: boxSize / 20
  }
});
//цвет выбранного узора
var tileBg = new Konva.Rect({
  stroke: 'black',
  strokeWidth: 2,
  x: -1,
  y: -1,
  width: boxSize + 2,
  height: boxSize + 2,
  fill: "gold",
  // opacity:0.8,
});
var tile = new Konva.Group({
  x: 5,
  y: 5,
  width: boxSize,
  height: boxSize,
  // scale: {
  // x : 2,
  // y : 2
  // }
});
tile.add(tileBg, tilePath);
layerSample.add(tile);
stageEditor.add(layerSample);