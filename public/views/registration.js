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
								onclick: "form.hidden = false; (new Router).go('/')"
							},
						}
					]
				}
			};
 			var form = new Form(options);
			this.init();
			this.show();


			form.on('submit', (event) => {
				event.preventDefault();
				let userData = form.getFormData();
				const user = new User(userData);

				user.send('POST', userData).then(
					() => {
						alert('Регистрация прошла успешно!');
						(new Router).go('/scores');
					},
					() => {
						 window.alert("Такой пользователь уже существует");
					}
				)
			})

		}

		init(options = {}) {
			// TODO: дописать реализацию
			let menu = new Menu();
			menu._updateHtml();
		}

	}


	// export
	window.RegistrationView = RegistrationView;

})();
