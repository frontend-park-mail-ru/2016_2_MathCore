let assert = require('assert');
let hello = require('./public/filter.js').hello;
let plural = require('./public/plural.js').plural;
let filter = require('./public/filter.js').filter;


// Тесты для plural
assert.equal(plural(0, 'решение', 'решения','решений'), 'решений');
assert.equal(plural(1, 'решение', 'решения','решений'), 'решение');
assert.equal(plural(2, 'решение', 'решения','решений'), 'решения');
assert.equal(plural(5, 'решение', 'решения','решений'), 'решений');
assert.equal(plural(21, 'решение', 'решения','решений'), 'решение');
assert.equal(plural(302, 'решение', 'решения','решений'), 'решения');
assert.equal(plural(3348, 'раз', 'раза','раз'),'раз');
assert.equal(plural(302567, 'яблоко', 'яблока','яблок'), 'яблок');
assert.equal(plural(302561, 'яблоко', 'яблока','яблок'), 'яблоко');

// Тесты для filter
assert.equal(hello('Test'), 'Привет, Test');
//TODO: Кейсы для функции filter
assert.equal(filter('ЛОЛ'), '***');
assert.equal(filter('ЛОЛ   '), '***   ');
assert.equal(filter('asdЛОЛasd'), 'asdЛОЛasd');
assert.equal(filter('ЛОЛЛОЛ'), 'ЛОЛЛОЛ');
assert.equal(filter('    ЛОЛ'), '    ***');
assert.equal(filter('    ЛОЛ лол'), '    *** ***');
