import View from "../modules/view";
import Form from "../components/form/form";

export default class MainView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-login');
		this.hide();


		var options = {
			el: this._el,
			data: {
				fields: [
					{
						name: 'login',
						type: 'text',
						placeholder: 'Your login here'
					},
					{
						name: 'password',
						type: 'password',
						placeholder: 'Yor password here'
					}
				],
				controls: [
					{
						text: 'Войти в игру!',
						attrs: {
							type: 'submit'
						}
					},
					{
						text: 'Регистрация',
						attrs: {
							type: 'submit'
						}
					},
					{
						text: 'Гостевой режим',
						attrs: {
							type: 'submit'
						}
					}
				]}};
		var form = new Form(options);
		this.show();

	}

	init(options = {}) {

	}
}
