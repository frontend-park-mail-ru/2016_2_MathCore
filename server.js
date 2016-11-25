const express = require('express');
const parser = require('body-parser');

const app = express();
const technoDoc = require('techno-gendoc');

const mime = require('mime');

app.use('/', express.static('public', { maxAge: 1 }));
app.use('/user', express.static('public', {maxAge: 1})); //
app.use('/play', express.static('public', {maxAge: 1})); //
app.use('/scores', express.static('public', {maxAge: 1})); //
app.use('/rules', express.static('public', {maxAge: 1})); //
technoDoc.generate(require('./api'), 'public');

mime.define({
  'application/babylon': ['babylon',],
  'application/fx': ['fx',],
  'application/babylonmeshdata': ['babylonmeshdata',],
});

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.listen(process.env.PORT || 3001, () => {
  console.log(mime.lookup('cosmo.babylon'));
  console.log(`App started on port ${process.env.PORT || 3001}`);
});
