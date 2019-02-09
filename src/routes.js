const Router = require('koa-router');
const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    greetings: 'It\'s magic!'
  };
});

module.exports = router.routes();
