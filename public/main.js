(function () {
	'use strict';

	const Router = window.Router;
	const MainView = window.MainView;
	const LoginView = window.LoginView;
	const RegistrationView = window.RegistrationView;
	const ScoreBoardView = window.ScoreBoardView;
	const GamePlayView = window.GamePlayView;
	const GameRulesView = window.GameRulesView;

	//session


	window.session = new window.Session({});
	window.session.isAuthorised().then((response) => {
		let userData =JSON.parse(response);

		if (userData.isAuthorized){

			window.session.login(userData.login);
		  document.dispatchEvent( new CustomEvent("updateMenu", {}) );

		}

	});


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
	.addRoute('/rules', GameRulesView)   // rules static page
	  .addRoute('/play', GamePlayView) //игровое поле
	  .addRoute('/scores', ScoreBoardView)
		.addRoute('/user', RegistrationView)
		.addRoute('/', LoginView) //Welcome Page
		.start();
})();
