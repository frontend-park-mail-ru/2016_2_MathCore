(function(){
  'use strict';

  const Block = window.Block;

  class Menu extends Block{

    constructor(options = {data: {}}) {
      super('div', options);
      this._el = document.querySelector(".js-topmenu");
			this.template = window.fest['menu/menu.tmpl'];
      this.init();
      this._el.innerHTML = this.template();
		}

    init() {
			this._updateHtml();
    }

    _updateHtml() {
      this._el.innerHTML = this.template();
    }
  }

  window.Menu = Menu;

})();
