var TE = {
  selected: {
    color: "gold",
    sample: "+",
    tools: "pen", //#TODO tool
    oldTool: "pen",
    fastTools:false//??? на время нажатия клавиши
  },
  tools: {
    pen: "",
    loupe: "",
    resize: "",
    pipette: "",
    rectangle: "" //прямоугольник
  },
  options: { //options
    help: true,
    protect: true, //защита клетки
    // colorProtect: true, //защита цвета
    // sampleProtect: true, //защита символа
    autoClear: true, //стирание при повторном нажатии
    markLastDraw: true, //выделять последние нарисованые
    relatedTiles: true //cмежные пикселпи
  },
  scheme: {
    num: 3,
    numX: 1,
    // rap: {}
  }
};
// var sample={}
var set = {}



// sample["s4"]=[];

//color/yzor/opacity

// console.warn(sample);


// var www ;
//  console.log(www);

// console.log(TE);









////////////////////////pen