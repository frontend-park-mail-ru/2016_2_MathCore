// GameRulesView
(function () {
	'use strict';

	const View = window.View;
  const Menu = window.Menu;
  const Logo = window.Logo;
	const GameRules = window.GameRules;


	class GameRulesView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-rules');
			this.show();

		}


		init(options = {}) {
      let menu = new Menu();
      menu._updateHtml();

			let rules= new GameRules();
			rules._updateHtml();
	  }


	}

	window.GameRulesView = GameRulesView;

})();
