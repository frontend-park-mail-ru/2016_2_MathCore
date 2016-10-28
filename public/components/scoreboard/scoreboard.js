(function(){
  'use strict';

const Block = window.Block;


  class Scoreboard extends Block {
  constructor(options = {data: {}}) {
    super('div');
    this.data = options.data;
    this.template = window.fest["scoreboard/scoreboard.tmpl"];

    this.render();
  }

  /**
   * Обновляем HTML
   */
  render() {
    this._updateHtml();
  }

  /**
   * Обновить html компонента
   */
  _updateHtml() {
    this._el.innerHTML = this.template(this.data);
  }
}

window.Scoreboard = Scoreboard;

})();
