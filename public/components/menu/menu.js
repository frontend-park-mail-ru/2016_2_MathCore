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

    show(){
      this._el.setAttribute('hidden', false);
    }

    _updateHtml() {
      let userData = {
        login: window.session.getLogin() || ""
      };
      let params = window.location.pathname.split("/");
      this._el.innerHTML = this.template({userData:userData, active: params.length==1?"":params[1]});
    }
  }

  window.Menu = Menu;

})();
