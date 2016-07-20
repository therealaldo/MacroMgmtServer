'use strict';

const express = require('express');
const body_parser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use('/', require('/routes/home.js')(express));
app.use('/users', require('/routes/users.js')(express));

app.disable('x-powered-by');

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

var server = app.listen(port, () => {
    console.log("Listening on " + port + "...");
});

module.exports = server;
