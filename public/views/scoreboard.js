(function () {
	'use strict';
	const View = window.View;
	const Menu = window.Menu;
	const Scoreboard = window.Scoreboard;
	const CollectionUser = window.CollectionUser;

	class ScoreBoardView extends View {
		constructor(options = {}) {
			super(options);
			this._init();
			this.show();
		}

		_init() {
			let container = document.querySelector('.scoreboard_container');
			container.hidden = false;
			this.menu = new Menu();
			this.menu._updateHtml();
			this.collectionUser = new CollectionUser({});
			this.collectionUser.fetchAll().then(response => {
				let json = {
					data: {
						scores: JSON.parse(response)
					}};
					this._menu = new Scoreboard(json);
					this._el = this._menu._el;
					container.appendChild(this._menu._el);
				})
			}

			resume(options = {}) {
				this.show();
			}

			pause(options = {}) {
				let container = document.querySelector('.scoreboard_container');
				container.hidden = true;
				this.hide();
			}

			init(options = {}) {
				let menu = new Menu();
				menu._updateHtml();
				let logo = new Logo();
				logo._updateHtml();
			}
		}

		window.ScoreBoardView = ScoreBoardView;

	})();
