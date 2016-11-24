(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const Menu = window.Menu;
	const Scoreboard = window.Scoreboard;
	const Session = window.Session;

	class LoginView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-welcome-panel');

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
							text: 'SignIn',
							attrs: {
								type: 'submit',
								class: 'btnSignIn'
							},
						},
						{
							text: 'SignUp',
							attrs: {
								type: 'button',
								class: 'btnSignUp',
								onclick: "(new Router).go('/user')"
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
			this.menu = new Menu();
			this.menu._updateHtml();
		}

		onSubmit(event){
			event.preventDefault();
			let userData = this.form.getFormData();

			window.session.send('POST', userData).then(
				() => {
					window.session.login(userData.login);
					this.menu._updateHtml();
					(new Router).go('/play');
				},
				() => {
					this.form.innerHtml = 'Неверные данные';
				}
			)
		}



		resume(options = {}) {
			this._el.setAttribute('hidden', false);
			this.form.render();
			this.form.on('submit', this.submitFunc);
			this.menu._updateHtml();
			this.show();
		}

		pause(options = {}) {
			this.form.hide();
			this.form.stop('submit', this.submitFunc);
			this.hide();
		}
	}

	// export
	window.LoginView = LoginView;

})();
