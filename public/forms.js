function jsonRequest (url, data) {
	let temp = new XMLHttpRequest();
	temp.open('POST', url, false);
	temp.setRequestHeader('Content-Type', 'application/json');
	temp.send(JSON.stringify(data));
	return temp;
}


(function () {
	'use strict';

	if (typeof window !== 'object') {
		return;
	}
	// import
	let Chat = window.Chat;
	let Form = window.Form;

	let loginPage = document.querySelector('.js-login');
	let chatPage = document.querySelector('.js-chat');
	let regPage = document.querySelector('.js-reg');

	// Форма авторизации
	let signInForm = new Form({
		el: document.createElement('div'),
		data: {
			title: 'Войдите как пользователь:',
			fields: [{
				name: 'login',
				type: 'text',
				placeholder: 'Логин',
				required: true,
			}, {
				name: 'password',
				type: 'password',
				placeholder: 'Пароль',
				required: true,
			}, ],
			controls: [{
				text: 'Войти',
				attrs: {
					type: 'submit',
					class: 'buttonsignup',
				},
			}, {
				text: 'Зарегистрироваться',
				attrs: {
					type: 'reset',
					class: 'buttonreg',
				},
			}, ],
		},
	});


	// Чат
	let chat = new Chat({
		el: document.createElement('div'),
	});

	signInForm.on('submit', (event) => {
		event.preventDefault();

		let formData = signInForm.getFormData();

		// обращение к серверу--авторизация
		let resultRequest = jsonRequest('https://java-heroku-test-victor.herokuapp.com/session', formData);
		if (resultRequest.status !== 200) {
			alert('Неправильный логин/пароль');
		} else {
			technolibs.request('/api/login', formData);
			chat.set({
				username: formData.login,
				email: 'temp@temp'
			}).render();
			chat.subscribe();
			alert('Вы успешно авторизовались');
			loginPage.hidden = true;
			chatPage.hidden = false;
		}
	});

	signInForm.on('reset', (event) => {
		event.preventDefault();

		loginPage.hidden = true;
		regPage.hidden = false;
	});

	loginPage.appendChild(signInForm.el);
	chatPage.appendChild(chat.el);

	loginPage.hidden = false;

	// Форма регистрации
	let formReg = new Form({
		el: document.createElement('div'),
		data: {
			title: 'Регистрация нового пользователя:',
			fields: [{

				name: 'login',
				type: 'text',
				placeholder: 'Введите логин',
				required: true,

			}, {
				name: 'password',
				type: 'password',
				placeholder: 'Введите пароль',
				required: true,
			}, {

				name: 'email',
				type: 'email',
				placeholder: 'Введите e-mail',
				required: true,

			}, ],
			controls: [{
				text: 'Зарегистрироваться',
				attrs: {
					type: 'submit',
					class: 'buttonreg',
				},
			}, ],
		},
	});
	formReg.on('submit', (event) => {
		event.preventDefault();

		let formData = formReg.getFormData();

		// обращение к серверу--регистрация
		jsonRequest('https://java-heroku-test-victor.herokuapp.com/user', formData);
		alert('Регистрация прошла успешно!');
		regPage.hidden = true;
		loginPage.hidden = false;
	});
	regPage.appendChild(formReg.el);


}());
