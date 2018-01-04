// console.clear();
// console.log(" я родился");
//#TODO (ДА) узнать можно ли задавать несколько имён на канве как классы с css      



// var layerAssets = new Konva.Layer();
// var groupAssets = new Konva.Group({
//   x: 200,
//   y: 0, 
//   // width:44,
//   // height: 44,
//   fill: "red",
// });
// var TEassets={
//   // red:1,
//   green:2,
//   blue:3,
//   gold:4,
// }
// function qqq(params) {  
//   groupAssets.destroyChildren();
//   groupAssets.y(0); 
//   for (const key in TEassets) {
//     if (TEassets.hasOwnProperty(key)) {
//       const element = TEassets[key];
//       console.warn(key);

//       updateAssets(key)
//     } 
//   }
// }
// qqq();
// qqq();



// function updateAssets(p1){
//   var qwe = groupAssets.width();
//   console.log(qwe);
//   groupAssets.width(qwe+30);
//   var test = new Konva.Rect({
//     stroke: 'black',
//     strokeWidth: 2,
//     // x: qwe,
//     y: qwe,
//     width: 20,
//     height: 20,
//     fill: p1,
//     name: p1,
//     // opacity:0.8,
//   });
//   groupAssets.add(test);
// }
// updateAssets("red");
// updateAssets("red");
// updateAssets("red");
// updateAssets("red"); 

function addAssets() {}

function removeAssets() {}


// layerAssets.add(groupAssets);
// stageEditor.add(layerAssets);



//////////////////////////////////////***********
var tile = new Konva.Group({
    // x: 15,
    // y: 15,
    // width: 20,//boxSize,
    // height: 20,//boxSize,
});

var layerSample = new Konva.Layer({
    // y:220,
    // x:-10
}); //новый слой для образца
var tilePath = new Konva.Path({ //фигура
    //8 9 10 12 bad 
    // data: path[TE.selected.sample],
    fill: "black",
    x: 0,
    y: 0,
    scale: {
        // x: boxSize / 20,
        // y: boxSize / 20,
        x: boxSize / 1000, //100
        y: boxSize / 1000
    }
});
//цвет выбранного узора
var tileBg = new Konva.Rect({
    stroke: 'gold',
    strokeWidth: 4,
    x: -1,
    y: -1,
    width: boxSize + 2,
    height: boxSize + 2,
    fill: "gold",
    // opacity:0.8,
});
var tile = new Konva.Group({
    x: 25,
    y: 25,
    width: boxSize,
    height: boxSize,
});
tile.add(tileBg, tilePath);



// $('#sample15').trigger('click'); //шликаем програмно
layerSample.add(tile);
// stageEditor.add(layerSample);



selectSample(); //активация символа на старте







//подогнать под экран
function fitScreen(params) {}







///TOOLTIP
$(document).ready(function () {
    //кнопки в левом меню
    new jBox('Tooltip', {
        attach: '#TEpanelL button', //элемент на котором сработает
        theme: 'TooltipDark',
        delayOpen: 500, //появление
        delayClose: 200, //исчезание
        // autoClose:  6000,//автозакрытие//закрываться закрывается, но тогда оно и показывается указанное время, даже когда курсор уже убран от кнопки
        //  title: 'Hurray!',
        position: { //позиция относительно элемента
            x: 'right',
            y: 'center'
        },
        outside: 'x' //хз
    });


    //создать
    new jBox('Confirm', {
        trigger: 'click',
        attach: '#TEcreate', //элемент срабатывания
        title: 'Создать новую схему', //заголовок
        content: $('#box-create'), //контент
        cancelButton: 'Отмена',
        confirmButton: 'Создать схему',
        closeButton: 'title',
        closeOnClick: "overlay",
        draggable: "title",
        confirm: function () {
            schemeNew();
        },
        cancel: function () {
            console.log('нет');
        }
        /*             
                    id: 'parentID + '-'modal',
                    preventDefault: true,
                    responsiveWidth: true,
                    responsiveHeight: true,
                    width: 2000,ширина
                    height: 500,//высота
                    overlay: false,//затемнение
                    animation: false,
                    blockScroll: false,//отключить плокировку прокрутки */
    })
    // .open() //автооткрытие
    ;

    //настройки
    new jBox('Modal', {
        trigger: 'click',
        attach: '#TEsetting', //элемент срабатывания 
        content: $('#box-num'), //контент
        closeButton: 'box',
        overlay: false, //затемнение
        draggable: ".jBox-container",

        /*         
                width:275,
                height: "50%",
                content: "dlkjfdkjflssdjfsdfjsdkjfsdkjf sdjfksd jfksdj flsdjfl ksdjflsdkj lfjsdl jfsdkljf sdkljfsdl jfsdklj flsdjfl ksdjklfsdj fsdjklf jsdkjf sdljfsdkl jfsdkljf sdjfl sdjl",//контент
                title: 'Создать новую схему',//заголовок
                cancelButton: 'Отмена',
                confirmButton: 'Создать схему',
                id: 'parentID + '-'modal',
                preventDefault: true,
                responsiveWidth: true,
                responsiveHeight: true,
                width: 2000,ширина
                height: 500,//высота
                closeButton: 'title',
                animation: false,
                blockScroll: false,//отключить плокировку прокрутки */

    })
    // .open()//автооткрытие
    ;

    //сохранение
    new jBox('Modal', {
        trigger: 'click',
        attach: '#TEsave', //элемент срабатывания 
        content: $('#box-save'), //контент
        closeButton: 'box',
        // draggable: true
        width: "100%",
        height: "100%",
        addClass:"save-dialog",
        onPosition: function () {
            //срабатывает при изменении размера, и открытии соответствено
            saveDialogSize();
        },
        onCreated: function () {
            // срабатывает только при 1 открытии
            
        },
        onOpen: function () {
            //срабатывает при каждом открытии
            saveDialog(this);
            // this.options.width = "60%";//задать высоту
            // this.options.height = "60%";//задать ширину
            // console.error($("#TEsave-stage").width(),$(".QWE").width(),"### onOpen");
        },
        
        
        
        
        
        onInit: function () {
            // console.error($("#TEsave-stage").width(),$(".QWE").width(),"### onInit");
        },
        onAttach: function () {
            // console.error($("#TEsave-stage").width(),$(".QWE").width(),"### onAttach");
        },
        onClose: function () {
            // console.error($("#TEsave-stage").width(),$(".QWE").width(),"### onClose");
        },
        onCloseComplete: function () {
            // console.error($("#TEsave-stage").width(),$(".QWE").width(),"### onCloseComplete");
        },

        /*         
                width:275,
                height: "50%",



                content: "dlkjfdkjflssdjfsdfjsdkjfsdkjf sdjfksd jfksdj flsdjfl ksdjflsdkj lfjsdl jfsdkljf sdkljfsdl jfsdklj flsdjfl ksdjklfsdj fsdjklf jsdkjf sdljfsdkl jfsdkljf sdjfl sdjl",//контент
                title: 'Создать новую схему',//заголовок
                cancelButton: 'Отмена',
                confirmButton: 'Создать схему',



                id: 'parentID + '-'modal',
                preventDefault: true,
                responsiveWidth: true,
                responsiveHeight: true,
                width: 2000,ширина
                height: 500,//высота
                closeButton: 'box',
                overlay: false, //затемнение
                draggable: ".jBox-container"
                animation: false,
                blockScroll: false,//отключить плокировку прокрутки */

    })
    // .open()//автооткрытие
    ;



    // });

    // TEsetting   



});