

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


function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.filter = filter;
}
