let assert = require('assert');
let hello = require('./public/main').hello;
let filter = require('./public/main').filter;



assert.equal(hello('Test'), 'Привет, Test');
//TODO: Кейсы для функции filter
assert.equal(filter('ЛОЛ'), '***');
assert.equal(filter('ЛОЛ   '), '***   ');
assert.equal(filter('asdЛОЛasd'), 'asdЛОЛasd');
assert.equal(filter('ЛОЛЛОЛ'), 'ЛОЛЛОЛ');
assert.equal(filter('    ЛОЛ'), '    ***');
