'use strict';

const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());

app.use('/', require('./routes/home.js')(express));
app.user('/users', require('./routes/users.js')(express));
app.user('/meals', require('./routes/meals.js')(express));
app.user('/trends', require('./routes/trends.js')(express));
app.user('/intolerances', require('./routes/intolerances.js')(express));

const server = app.listen(port, () => {
  console.log('Listening on port ' + port + '...');
});

module.exports = server;
