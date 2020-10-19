const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const favicon = require('serve-favicon');

const app = express();
const server = http.Server(app);

app.use(express.json());
app.use(express.static(path.join('public')));
app.use('/songs', express.static(path.join(__dirname, 'songs')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(path.resolve(__dirname, 'utils', 'icon', 'favicon.png')));
app.use(routes);

module.exports = app;