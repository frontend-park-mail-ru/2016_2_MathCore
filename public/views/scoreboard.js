(function () {
	'use strict';
	const View = window.View;
	const Menu = window.Menu;
	const Scoreboard = window.Scoreboard;
	const CollectionUser = window.CollectionUser;
	const Button = window.Button;

	class ScoreBoardView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.scoreboard_container');
			this._init();
			this.show();
			// this.menu.show();
		}

		_init() {
			let container = document.querySelector('.scoreboard_container');
			this.btnplay = new Button({
				text: "Play",
				attrs: {
				type: 'button',
				class: 'btnplay',
				onclick: "(new Router).go('/play')"
			}
		});
		// container.setAttribute('hidden', false);

			this.btnplay.renderTo(container);
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
				this.menu.show();


				let container = document.querySelector('.scoreboard_container');
				container.removeAttribute('hidden');



				document.dispatchEvent( new CustomEvent("updateMenu", {
					detail:{
						isAuthorized: true
					}
				}) );
			}

			pause(options = {}) {
				let container = document.querySelector('.scoreboard_container');
				container.setAttribute('hidden', true);

				this.hide();
			}

			init(options = {}) {
				this.menu = new Menu();
				this.menu._updateHtml();
				this.menu.show();

			}

		}

		window.ScoreBoardView = ScoreBoardView;

	})();
