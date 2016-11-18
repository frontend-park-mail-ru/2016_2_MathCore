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
    //let container = document.querySelector('.js-welcome-panel');
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
    // this._menu = new Scoreboard({
    //   data: {
    //     scores: [
    //       {
    //         login: 'andre',
    //         rating: '1'
    //       },
    //       {
    //         login: 'Elen',
    //         rating: '1004'
    //       },
		//
    //       {
    //         login: 'Sara',
    //         rating: '12200'
    //       },
    //     ],
    //   }
    // });


  }

  resume(options = {}) {
    this.show();
  }

	pause(options = {}) {
		let container = document.querySelector('.scoreboard_container');
		container.hidden = true; //&
		this.hide();
	}
}

window.ScoreBoardView = ScoreBoardView;

})();
