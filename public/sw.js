// наименование для нашего хранилища кэша
const CACHE_NAME = 'app_mathcore_service-worker';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',


  "/components/button/button.css",
  "/components/menu/menu.css",
  "/components/form/form.css",
  "/components/scoreboard/scoreboard.css",
  "/components/gamerules/rules.css",
  "/components/logo/logo.css",
  "/css/main.css",
  "/babylon.js",
	"/hand.js",

  "/modules/swLoader.js",
  "/sw.js",

  "/libs/technolibs/index.js",
  "/modules/pathToRegex.js",
  "/modules/view.js",
  "/modules/model.js",
  "/modules/route.js",
  "/modules/router.js",

  "/models/session.js",
  "/models/user.js",
  "/models/player.js",
  "/models/collectionUser.js",
  "/components/block/block.js",
  "/components/button/button.js",
  "/components/form/form.tmpl.js",
  "/components/form/form.js",
  "/components/menu/menu.tmpl.js",
  "/components/menu/menu.js",
  "/components/scoreboard/scoreboard.js",
  "/components/scoreboard/scoreboard.tmpl.js",
  "/components/gamerules/rules.js",
  "/components/gamerules/rules.tmpl.js",
  "/components/logo/logo.js",
  "/components/logo/logo.tmpl.js",
  "/views/main.js",
  "/views/login.js",
  "/views/scoreboard.js",
  "/views/registration.js",
  "/views/gameplay.js",
  "/views/gameplay.js",
  "/views/gamerules.js",

	'/main.js'
];

this.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME)
			.then(function (cache) {
			// загружаем в наш cache необходимые файлы
			return cache.addAll(cacheUrls);
		})
	);
});

this.addEventListener('fetch', function (event) {
	console.log(event);
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {

			// выдаём кэш, если он есть
			if (cachedResponse) {
        console.log("выдаем кэш");
				return cachedResponse;
			}
      console.log("без кэша");

			// иначе запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
