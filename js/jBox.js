///TOOLTIP
var jBoxCreate;

$(function () {
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
new jBox('Tooltip', {
    attach: '#TEpanelT .j', //элемент на котором сработает
    theme: 'TooltipDark',
    delayOpen: 500, //появление
    delayClose: 200, //исчезание
    // autoClose:  6000,//автозакрытие//закрываться закрывается, но тогда оно и показывается указанное время, даже когда курсор уже убран от кнопки
    //  title: 'Hurray!',
    position: { //позиция относительно элемента
      x: 'center',
      y: 'bottom'
    },
    // outside: 'y' //хз
  });


  //создать
  jBoxCreate = new jBox('Confirm', {
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
  jBoxCreate.open();


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
    addClass: "save-dialog",
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