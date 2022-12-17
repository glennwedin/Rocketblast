window.BOOM = {};

("use strict");

//Bootstrap
import Game from "./Game";
window.onload = function () {
  window.BOOM = Game;
  BOOM.init();
};
