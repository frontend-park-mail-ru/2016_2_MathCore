(function () {
	'use strict';

	// import
	const Block = window.Block;
	const Button = window.Button;

	class Form extends Block {

		constructor(options = {data: {}}) {
			super('form');
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this._el = options.el;
			this.render();
		}


		render() {
			this._updateHtml();
			this._installControls();
		}

		hide(){
			let controls = this._el.querySelector('.js-controls');
			let btns = controls.children;
			Array.prototype.forEach.call(btns, function(btn){
				if (btn.hasAttribute('onclick')){
					btn.onclick = '';
				}
			});
			this._el.innerHTML = '';
		}

		/*remove(){
			this._el.remove();
		}*/


		reset() {
			this._el.querySelector('form').reset();
		}


		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		//	this._installControls();
		}


		_installControls() {
			let {controls = []} = this.data;

			controls.forEach(data => {
				let control = new Button({text: data.text, attrs: data.attrs});
				this._el.querySelector('.js-controls').appendChild(control._get());
			});
		}

		/**
		 * Взять данные формы
		 * @return {object}
		 */
		getFormData() {
			let form = this._el.querySelector('form');

			let elements = form.elements;
			let fields = {};

			Object.keys(elements).forEach(element => {
				let name = elements[element].name;
				let value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

	}

	//export
	window.Form = Form;
})();
