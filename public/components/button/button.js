(function () {
	class Button {
	constructor(options) {
		this.text = options.text;
		this.attrs = options.attrs || [];
		this.el = document.createElement('button');
	}

	setAttrs(attrs) {
		Object.keys(attrs).forEach((name) => {
		this.el.setAttribute(name, attrs[name]);
		});
	}

	render() {
		console.log(this.attrs);
		this.el.innerHTML = this.text;

		this.setAttrs(this.attrs);
		return this;
	}

	toString() {
		return this.el.outerHTML;
	}
	}

	// export
	window.Button = Button;
}());
