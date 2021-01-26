'use strict';

/*
============================================
--- МОДУЛЬ ДЛЯ ЗАКРАШИВАНИЯ КЛЕТОК ДОСКИ ---
============================================
*/
window.drawingBoard = (function () {
  // ---------- КОНСТАНТЫ -----------
  const NONE_COLOR = '';
  const PIXEL_CLASS = 'pixels-list__item';
  const UNCHECKED = false;

  // --------- DOM-элементы ---------
  const drawingBoardElement = document.querySelector('.drawing-board');

  const colorSelector = drawingBoardElement.querySelector('#color-selector');
  const eraser = drawingBoardElement.querySelector('#eraser');
  const clearButton = drawingBoardElement.querySelector('#clear-button');

  const canvas = drawingBoardElement.querySelector('.drawing-board__canvas');
  const miniCanvases = canvas.querySelectorAll('.pixels-list');


  /*
  =====================================================
  ------------------ ОСНОВНАЯ ЛОГИКА ------------------
  =====================================================
  */
  // *** Функция для обработчика события движения мыши "внутри" холста ***
  function onDrawing (canvasEvt) {
    canvasEvt.preventDefault();

    /*
      Обработчик события клика отслеживает таргет курсора.
      
      Если выбранный ("кликнутый") таргет имеет класс,
      совпадающий со значением константы "PIXEL_CLASS",
      тогда у выбранного элемента изменятся цвет заднего фона.
    */
    if (canvasEvt.target.classList.contains(PIXEL_CLASS)) {
      if (eraser.checked) {
        canvasEvt.target.style.backgroundColor = NONE_COLOR;
      } else {
        canvasEvt.target.style.backgroundColor = colorSelector.value;
      }
    }
  };


  // *** Обработчик события клика по кнопке для очистки холста ***
  clearButton.addEventListener('click', function (clearEvt) {
    clearEvt.preventDefault();

    /*
      Данный цикл проходится по всем спискам элементов (пикселей)
      и сбрасывает инлайновые стили для цвета фона у
      каждого элемента (пикселя) каждого списка.
    */
    for (let miniCanvas of miniCanvases) {
      const pixels = miniCanvas.querySelectorAll('.pixels-list__item');

      pixels.forEach((element) => {
        element.style.backgroundColor = NONE_COLOR;
      });
    }
  });


  // *** Обработчик события клика на селектор цветов ***
  /*
    Данная настройка необходима для автоматического ВЫКЛЮЧЕНИЯ
    «Ластика» при смене цвета.
  */
  colorSelector.addEventListener('click', function (changeColorEvt) {
    changeColorEvt.preventDefault();
    eraser.checked = UNCHECKED;
  });

  
  // *** Обработчик события НАЖАТИЯ кнопки мыши ***
  canvas.addEventListener('mousedown', function (mousedownEvt) {
    canvas.addEventListener('mousemove', onDrawing);
    onDrawing(mousedownEvt);
  });

  // *** Обработчик события ОТПУСКАНИЯ кнопки мыши ***
  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onDrawing);
  });

})();