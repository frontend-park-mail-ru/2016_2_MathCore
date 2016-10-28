(function () {
	'use strict';
const View = window.View;
const Scoreboard = window.Scoreboard;

 class ScoreBoardView extends View {
  constructor(options = {}) {
    super(options);
    this._init();
  }

  _init() {
    let container = document.querySelector('.js-welcome-panel');
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
}

window.ScoreBoardView = ScoreBoardView;

})();
