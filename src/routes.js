const Router = require('koa-router');
const router = new Router();
const jwt = require('./middlewares/JwtMiddleware');
const machineController = require('./controllers/MachineController');
const productController = require('./controllers/ProductControllers');
const productMiddleware = require('./middlewares/ProductMiddleware');
const authController = require('./controllers/AuthController');
const validate = require('./validators/Validators');

router.post('/auth', validate.machine.machineAuth, authController.authenticate);

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

router.post(
  '/products',
  validate.product.productCreation,
  jwt,
  productMiddleware.doesProductExist,
  productController.createProduct
);

router.patch(
  '/products',
  validate.product.productUpdate,
  jwt,
  productMiddleware.doesNotProductExist,
  productController.updateProduct
);

router.delete(
  '/products',
  validate.product.productRemoval,
  jwt,
  productMiddleware.doesNotProductExist,
  productController.removeProduct
);

module.exports = router.routes();
