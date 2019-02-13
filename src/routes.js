const Router = require('koa-router');
const router = new Router();
const machineController = require('./controllers/MachineController');
const validate = require('./validators/Validators');

router.post(
  '/machines',
  validate.machine.machineCreation,
  machineController.createMachine
);

module.exports = router.routes();
