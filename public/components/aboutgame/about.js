import Block from "../block/block";
import './about.scss';
import template from './about.tmpl.xml';


// let mas = ["static/img/game5.png","static/img/game2.png","static/img/game4.png"]
// let to = -1;
//
// function right_arrow()
// {
//  let obj = document.getElementById("img");
//   if (to < mas.length-1)  to++
//    else
//      to = 0;
//      obj.src = mas[to];
// }
//
// function left_arrow()
// {
//  let obj = document.getElementById("img");
// if (to > 0) to--;
//   else
//     to = mas.length-1;
//     obj.src = mas[to];
// }

export default class GameAbout extends Block {
	constructor(options = {data: {}}) {
			super('div', options);
			this._el = document.querySelector(".js-about");
			this.template = template;
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
