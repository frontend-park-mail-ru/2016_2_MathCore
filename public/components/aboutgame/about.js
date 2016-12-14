import Block from "../block/block";
import './about.scss';
import template from './about.tmpl.xml';


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
