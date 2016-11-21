(function(){
  'use strict';

  const Block = window.Block;


  class Logo extends Block{

    constructor(options = {data: {}}) {
      super('div', options);
      this._el = document.querySelector(".js-logo");
			this.template = window.fest['logo/logo.tmpl'];
      this.init();
      this._el.innerHTML = this.template();
		}

    init() {
			this._updateHtml();
    }

    _updateHtml() {
      this._el.innerHTML = this.template();
    }

    /**
     * Вставить управляющие элементы в форму
     */
    

  }

  window.Logo = Logo;

})();
