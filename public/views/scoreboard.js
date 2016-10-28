(function () {
	'use strict';
const View = window.View;
const Scoreboard = window.Scoreboard;

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
    this._menu = new Scoreboard({
      data: {
        scores: [
          {
            login: 'andre',
            rating: '1'
          },
          {
            login: 'Elen',
            rating: '1004'
          },

          {
            login: 'Sara',
            rating: '12200'
          },
        ],
      }
    });
    this._el = this._menu._el;
    container.appendChild(this._menu._el);

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
