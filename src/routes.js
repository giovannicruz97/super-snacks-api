const Router = require('koa-router');
const router = new Router();
const jwt = require('./middlewares/JwtMiddleware');

const machineController = require('./controllers/MachineController');
const machineMiddleware = require('./middlewares/MachineMiddleware');

const productController = require('./controllers/ProductControllers');
const productMiddleware = require('./middlewares/ProductMiddleware');

const cardController = require('./controllers/CardController');
const cardMiddleware = require('./middlewares/CardMiddleware');

const authController = require('./controllers/AuthController');
const validate = require('./validators/Validators');

router.post('/auth', validate.machine.machineAuth, authController.authenticate);

router.post(
  '/machines',
  validate.machine.machineCreation,
  machineMiddleware.doesMachineExist,
  machineController.createMachine
);

router.patch(
  '/machines',
  validate.machine.machineUpdate,
  jwt,
  machineMiddleware.doesNotMachineExist,
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
  machineMiddleware.doesNotMachineExist,
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

router.get(
  '/products',
  validate.product.productFetching,
  jwt,
  productMiddleware.doesNotProductExist,
  productController.findProducts
);

router.post(
  '/cards',
  validate.card.cardCreation,
  jwt,
  cardController.createCard
);

router.delete(
  '/cards',
  validate.card.cardRemoval,
  jwt,
  cardMiddleware.doesNotCardExist,
  cardController.removeCard
);

router.get(
  '/cards',
  validate.card.cardFetching,
  jwt,
  cardMiddleware.doesNotCardExist,
  cardController.findCards
);

module.exports = router.routes();
