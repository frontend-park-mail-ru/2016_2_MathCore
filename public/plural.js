
//  Функция plural - dz1
function plural (number, firstForm, secondForm, fifthForm) {
		number %= 100;
		if (number >= 5 && number <= 20) { return fifthForm; } // 5 ... 20

		number %= 10;

		if (number >= 2 && number <= 4) { return secondForm; } // x2 ... x4


		if (number === 1) { return firstForm; } // x1

		 return fifthForm; // else (x0)
	}

	function hello (text) {
	return 'Привет, ' + text;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.plural = plural;
}
