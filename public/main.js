
import './modules/swLoader';
import './css/main.scss';
import './hand';

import Router from './modules/router';
import MainView from './views/main';
import LoginView from './views/login';
import RegistrationView from './views/registration';
import ScoreBoardView from './views/scoreboard';
import GamePlayView from './views/gameplay';
import GameRulesView from './views/gamerules';
import Session from "./models/session";

window.session = new Session({});
window.session.isAuthorised().then((response) => {
	let userData =JSON.parse(response);

	if (userData.isAuthorized){

		window.session.login(userData.login);

	}

	document.dispatchEvent( new CustomEvent("updateMenu", {
		detail:{
			isAuthorized: userData.isAuthorized
		}
	}) );

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
