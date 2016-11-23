(function(){
  'use strict';

  const Block = window.Block;

  class GameRules extends Block{

    constructor(options = {data: {}}) {
      super('div', options);
      this._el = document.querySelector(".js-rules");
			this.template = window.fest['gamerules/rules.tmpl'];
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

  window.GameRules = GameRules;

})();
