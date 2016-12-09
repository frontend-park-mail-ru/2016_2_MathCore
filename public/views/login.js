import View from "../modules/view";
import Form from "../components/form/form";
import Menu from "../components/menu/menu";
import Scoreboard from "../components/scoreboard/scoreboard";
import Session from "../models/session";
import Router from "../modules/router";


export default class LoginView extends View {
	constructor(options = {}) {
		super(options);
		this._el = document.querySelector('.js-welcome-panel');
		this.handleClick = this.handleClick.bind(this);
		this.form = new Form({
			el: this._el,
			data: {
				title: 'WELCOME TO SPACECORE',
				fields: [
					{
						name: 'login',
						type: 'text',
						placeholder: 'Your login here',
						required : true,
					},
					{
						name: 'password',
						type: 'password',
						placeholder: 'Your password here',
						required : true,
					},
				],
				controls: [
					{
						text: 'Sign in',
						attrs: {
							type: 'submit',
							class: 'btnsignin'
						},
					},
					{
						text: 'Sign up',
						attrs: {
							type: 'button',
							class: 'btnsignup',
							onclick: this.handleClick
							// onclick: "(new Router).go('/user')"
						},
					}
				],
			},
		});

		this.init();
		this.show();

		this.submitFunc = this.onSubmit.bind(this);

	}

	init(options = {}) {
		// this.menu = new Menu();
		// this.menu._updateHtml();
	}

	onSubmit(event){
		event.preventDefault();
		let userData = this.form.getFormData();

  if(this.form.isValid()){
		window.session.send('POST', userData).then(
			() => {
				window.session.login(userData.login);
				// this.menu._updateHtml();


				document.dispatchEvent( new CustomEvent("updateMenu", {
					detail:{
						isAuthorized: true
					}
				}) );

				(new Router).go('/scores');

			},
			() => {
				this.form.innerHtml = 'Неверные данные';
			}
		)
	}
	}

	handleClick(){

		(new Router).go('/user');

	}




	resume(options = {}) {
		this._el.setAttribute('hidden', false);
		this.form.render();
		this.form.on('submit', this.submitFunc);
		this.show();
	}

	pause(options = {}) {
		this.form.hide();
		this.form.stop('submit', this.submitFunc);
		this.hide();
	}
}
