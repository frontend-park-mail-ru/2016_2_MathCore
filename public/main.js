(function () {
	'use strict';

	const Router = window.Router;
	const MainView = window.MainView;
	const LoginView = window.LoginView;
	const RegistrationView = window.RegistrationView;
	const ScoreBoardView = window.ScoreBoardView;


	// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
	// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]
	(new Router)
	  .addRoute('/scores', ScoreBoardView)
		.addRoute('/user', RegistrationView)
		.addRoute('/', LoginView) //Welcome Page
		.start();
})();
