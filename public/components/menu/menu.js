(function(){
  'use strict';

  const Block = window.Block;

  class Menu extends Block{

    constructor(options = {data: {}}) {
      super('div', options);
      this._el = document.querySelector(".js-topmenu");
			this.template = window.fest['menu/menu.tmpl'];
      this.init();
		}

    init() {

			this._updateHtml();
      document.addEventListener("updateMenu", this._updateHtml.bind(this));
    }

    _updateHtml() {
      let userData = {
        login: window.session.getLogin() || ""
      };
      this._el.innerHTML = this.template(userData);
    }
  }

  window.Menu = Menu;

})();
