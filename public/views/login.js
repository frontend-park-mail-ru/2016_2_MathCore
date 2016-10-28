(function () {
	'use strict';

	const View = window.View;
	const Form = window.Form;
	const Menu = window.Menu;
	const Session = window.Session;

	class LoginView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-welcome-panel');
		//	this.hide();

			// TODO: дописать реализацию

			let form = new Form({
				el: this._el,
				data: {
					title: 'WELCOME TO JACKAL|SPACE',
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
							placeholder: 'Yor password here',
							required : true,
						},
					],
					controls: [
						{
							text: 'Войти в игру!',
							attrs: {
								type: 'submit',
							},
						},
						{
							text: 'Зарегистрироваться',
							attrs: {
								type: 'button',
							},
						}
					],
				},
			});

			this.init();
			this.show();

			/* Попробуем обратиться к серверу через модели */
			form.on('submit', (event) => {
				event.preventDefault();
				let userData = form.getFormData();
				const session = new Session(userData);

				session.send('POST', userData).then(
					() => {
						alert('Вы успешно авторизовались!');
						alert('Дальше будем что-то делать с этим ....');
					},
					() => {
						alert('Неправильный логин/пароль, попробуем снова');
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
	window.LoginView = LoginView;

})();
