'use strict';

let userData = {};

function filter (str, rules = ['ЛОЛ']) {
//	str = win2unicode(str) ;
	rules = rules.map(rule=> {
        return {
            regexp: new RegExp('((^|\[^a-zA-Zа-яёА-ЯЁ]))'+rule+'(?=($|\[^a-zA-Zа-яёА-ЯЁ]))','ig'),
            length: rule.length
        };
    });
/*	var test = [];
	rules.forEach(rule =>{test[test.length] = rule.regexp.exec(str)});
	test.forEach(tst=>{ if(tst){ if(tst.index>0){ tst.index+=1 }} });
    console.log(test);*/
    rules.forEach(rule=> {
       str = str.replace(rule.regexp, replacer)
    });
//	str = str.substr(2, str.length-2);
//	console.log(rules);
//	console.log(str);
    return str;
}
function replacer(str, p1, p2, offset, s) {
    var score = str.split('');
	if(('а'<score[0] && score[0]<'я')||('А'<score[0] && score[0]<'Я')||score[0]=='Ё'||score[0]=='ё') {
        var i = 0;
		while ( i < str.length ) {
		    score[i]='*';
			i++;
		};
    } else {
        var i = 1;
		while ( i < str.length ) {
		    score[i]='*';
			i++;
		};
	}
	return score.join('');
}

/*
function win2unicode(str) {
   var charmap   = unescape(
      "%u0402%u0403%u201A%u0453%u201E%u2026%u2020%u2021%u20AC%u2030%u0409%u2039%u040A%u040C%u040B%u040F"+
      "%u0452%u2018%u2019%u201C%u201D%u2022%u2013%u2014%u0000%u2122%u0459%u203A%u045A%u045C%u045B%u045F"+
      "%u00A0%u040E%u045E%u0408%u00A4%u0490%u00A6%u00A7%u0401%u00A9%u0404%u00AB%u00AC%u00AD%u00AE%u0407"+
      "%u00B0%u00B1%u0406%u0456%u0491%u00B5%u00B6%u00B7%u0451%u2116%u0454%u00BB%u0458%u0405%u0455%u0457")
   var code2char = function(code) {
               if(code >= 0xC0 && code <= 0xFF) return String.fromCharCode(code - 0xC0 + 0x0410)
               if(code >= 0x80 && code <= 0xBF) return charmap.charAt(code - 0x80)
               return String.fromCharCode(code)
            }
   var res = ""
   for(var i = 0; i < str.length; i++) res = res + code2char(str.charCodeAt(i))
   return res
}
*/
function onLogin (form, block) {
	userData = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	 jsLogin.hidden = true;
	 jsChat.hidden = false;

	 if (userData.user) {
		 userData.user = filter(userData.user);
		 jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
	 }

	 subscribe();
}

function createMessage (opts, isMy = false) {
	let message = document.createElement('div');
	let email = document.createElement('div');

	message.classList.add('chat__message');
	email.classList.add('chat__email');

	if (isMy) {
		message.classList.add('chat__message_my');
	} else {
		message.style.backgroundColor = `#${technolibs.colorHash(opts.email || '')}`;
	}
	message.innerHTML = opts.message;
	email.innerHTML = opts.email;
	message.appendChild(email);


	return message;
}

function onChat (form) {
	let data = {
		message: form.elements['message'].value,
		email: userData.email
	};

	let result = technolibs.request('/api/messages', data);
	form.reset();
}

function renderChat (items) {
	jsMessages.innerHTML = '';
	items.forEach(item => {
		let message = createMessage(item, item.email === userData.email);
		jsMessages.appendChild(message);
	});
	jsMessages.scrollTop = jsMessages.scrollHeight;
}

function subscribe () {
	technolibs.onMessage(data => {
		renderChat(Object.keys(data).map(key => data[key]));
	});
}

function hello(text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.filter = filter;
}
