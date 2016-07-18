'use strict';

const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());

app.use('/', require('./routes/home.js')(express));
app.use('/meals', require('./routes/meals.js')(express));
app.use('/users', require('./routes/users.js')(express));

const server = app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});

module.exports = server;
