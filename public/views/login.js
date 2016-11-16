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
							},
						},
						{
							text: 'SignUp',
							attrs: {
								type: 'button',
								onclick: "form.hidden = true; (new Router).go('/user')"
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
						//alert('Вы успешно авторизовались!');
					  (new Router).go('/scores');
					},
					() => {
						form.innerHtml = 'Неверные данные';
						//alert('Неправильный логин/пароль, попробуем снова');
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


/*	resume(options = {}) {
		let form = document.querySelector('.js-welcome-panel__login-form');
		form.hidden = false;
    this.show();
  }*/


	// export
	window.LoginView = LoginView;

})();
