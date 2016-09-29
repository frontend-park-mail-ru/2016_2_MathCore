
//  Функция plural - dz1
function plural (number, firstForm, secondForm, fifthForm) {
	number %= 100;
		if (number >= 5 && number <= 20) { return fifthForm; } // 5 ... 20

		number %= 10;

		if (number >= 2 && number <= 4) { return secondForm; } // x2 ... x4


		if (number === 1) { return firstForm; } // x1

		 return fifthForm; // else (x0)
	 }


// Функция filter - dz 2

function filter (str, rules = ['ЛОЛ']) {
	rules = rules.map(rule => {
		return {
			regexp: new RegExp('((^|\[^a-zA-Zа-яёА-ЯЁ]))' + rule + '(?=($|\[^a-zA-Zа-яёА-ЯЁ]))', 'ig'),
			length: rule.length
		};
	});
	rules.forEach(rule => {
	str = str.replace(rule.regexp, replacer)
});
	return str;
}
function replacer (str, p1, p2, offset, s) {
	let score = str.split('');
	if ((score[0] > 'а' && score[0] < 'я') || (score[0] > 'А' && score[0] < 'Я') || score[0] === 'Ё' || score[0] === 'ё') {
		let i = 0;
		while (i < str.length) {
			score[i] = '*';
			i++;
		};
	} else {
		let j = 1;
		while (j < str.length) {
			score[j] = '*';
			j++;
		};
	}
	return score.join('');
}

function jsonRequest (url, data) {
	let temp = new XMLHttpRequest();
	temp.open('POST', url, false);
	 temp.setRequestHeader('Content-Type', 'application/json');
	temp.send(JSON.stringify(data));
	return temp.responseText;
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
				jsonRequest('https://java-heroku-test-victor.herokuapp.com/session', formData);



				chat.set({
					username: formData.username,

				}).render();

				chat.subscribe();

				loginPage.hidden = true;
				chatPage.hidden = false;
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
				regPage.hidden = true;
				alert('Регистрация прошла успешно!')
			});
			regPage.appendChild(formReg.el);


		}());

function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.filter = filter;
	exports.plural = plural;
}
