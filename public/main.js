
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
import ProfileView from './views/profile';
import GameAboutView from './views/gameabout';

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
.addRoute('/about', GameAboutView)
.addRoute('/profile', ProfileView)
.addRoute('/rules', GameRulesView)
.addRoute('/play', GamePlayView)
.addRoute('/scores', ScoreBoardView)
.addRoute('/user', RegistrationView)
.addRoute('/', LoginView) 
.start();
