(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const Menu = window.Menu;
	const User = window.User;

	class RegistrationView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-welcome-panel');

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
							name: 'email',
							type: 'email',
							placeholder: 'Your email here'
						},
						{
							name: 'password',
							type: 'password',
							placeholder: 'Your password here'
						},
            {
							name: 'password',
							type: 'password',
							placeholder: 'Repeat your password'
						}
					],
					controls: [
						{
							text: 'SignUp',
							attrs: {
								type: 'submit',
								class: 'btnSignUp',
							}
						},

						{
							text: 'Back',
							attrs: {
								type: 'button',
								class: 'btnBack',
								onclick: "(new Router).go('/')"
							},
						}
					]
				}
			};
 			this.form = new Form(options);
			this.init();
			this.show();

			this.submitFunc = this.onSubmit.bind(this);

		}

		onSubmit(event){
			event.preventDefault();
			let userData = this.form.getFormData();
			const user = new User(userData);

			if(this.form.isValid()){
			user.send('POST', userData).then(
				() => {
					(new Router).go('/scores');
				},
				() => {
					 window.alert("Такой пользователь уже существует");
				}
			)
		}
		}


		init(options = {}) {
			this.menu = new Menu();
			this.menu._updateHtml();
		}

		pause(options = {}) {
			this.form.hide();
			this.form.stop('submit', this.submitFunc);
			this.hide();
		}

		resume(options = {}) {
			this._el.setAttribute('hidden', false);
			this.form.render();
			this.form.on('submit', this.submitFunc);
			this.menu._updateHtml();
			this.show();
		}
	}


	// export
	window.RegistrationView = RegistrationView;

})();
