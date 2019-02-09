const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();
const routes = require('./src/routes');

app.use(cors());
app.use(bodyParser());
app.use(routes);

module.exports = app;
