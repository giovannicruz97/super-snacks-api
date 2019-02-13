const Router = require('koa-router');
const router = new Router();
const machineController = require('./controllers/MachineController');
const authController = require('./controllers/AuthController');
const validate = require('./validators/Validators');

router.post(
  '/machines',
  validate.machine.machineCreation,
  machineController.createMachine
);

router.post('/auth', validate.machine.machineAuth, authController.authenticate);

module.exports = router.routes();
