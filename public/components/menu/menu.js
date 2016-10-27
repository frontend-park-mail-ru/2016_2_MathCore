(function(){
  'use strict';

  const Block = window.Block;

  class Menu extends Block{
    constructor(options = {data: {}}) {
      super('div');
			this.template = window.fest['menu/menu.tmpl'];
      this._el = document.getElementsByTagName('body');
			this.render();
		}

    render() {
			this._updateHtml();
    }

    _updateHtml() {
      this._el.innerHTML = this.template();
    }
  }

  window.Menu = Menu;

})();
