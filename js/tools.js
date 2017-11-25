var TE={
  selected:{
    color:"gold",
    sample:1,
    tools:"pen"
  },
  tools:{
    pen: "",
    loupe: "",
    resize: "",
    pipette: "",
    rectangle: ""//прямоугольник
  },
  options:{//options
    help:true,
    colorProtect:true,//защита цвета
    autoClear:true,//стирание при повторном нажатии
    markLastDraw:true,//выделять последние нарисованые
    relatedTiles:true//cмежные пикселпи
  }
};
// var sample={}
var set={ }



// sample["s4"]=[];  

//color/yzor/opacity

// console.warn(sample); 

function sandboxTools(color, id) {
  var num = parseInt(id.replace(/\D+/g, ""));
  // console.log(color,num);
  TE.selected.color = color;
  TE.selected.sample = num;
  
  // console.log(TE.selected);
}
 

// console.log(TE);
 








////////////////////////pen