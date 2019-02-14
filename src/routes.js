const Router = require('koa-router');
const router = new Router();
const jwt = require('./middlewares/JwtMiddleware');
const machineController = require('./controllers/MachineController');
const authController = require('./controllers/AuthController');
const validate = require('./validators/Validators');

router.post(
  '/machines',
  validate.machine.machineCreation,
  machineController.createMachine
);

router.patch(
  '/machines',
  validate.machine.machineCreation,
  jwt,
  machineController.updateMachine
);

router.get(
  '/machines',
  validate.machine.machineFetching,
  jwt,
  machineController.findMachines
);

router.delete(
  '/machines',
  validate.machine.machineRemoval,
  jwt,
  machineController.removeMachine
);

router.post('/auth', validate.machine.machineAuth, authController.authenticate);

module.exports = router.routes();
