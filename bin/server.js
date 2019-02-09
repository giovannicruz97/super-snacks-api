const logger = require('koa-logger');
const app = require('../app');

app.use(logger());
app.on('error', err => console.error('app error: ', err));
app.listen(process.env.APP_PORT);
