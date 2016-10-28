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
			//this.hide();

			// TODO: дописать реализацию
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
							text: 'Зарегистрироваться',
							attrs: {
								type: 'submit'
							}
						},
					]
				}
			};
 			var form = new Form(options);
			this.init();
			this.show();

			/* Попробуем обратиться к серверу через модели */
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
						//alert('Что-то пошло не так на сервере и это очень плохо');
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
