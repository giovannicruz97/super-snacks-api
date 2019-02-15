let joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const validate = require('koa-joi-validate');

const productCreation = validate({
  body: {
    name: joi.string().required(),
    price: joi
      .number()
      .min(2)
      .max(5.5)
      .required()
  }
});

const productUpdate = validate({
  body: {
    productId: joi.objectId().required(),
    name: joi.string().required(),
    price: joi
      .number()
      .min(2)
      .max(5.5)
      .required()
  }
});

const productRemoval = validate({
  query: {
    productId: joi.objectId().required()
  }
});

const productFetching = validate({
  query: {
    name: joi.string().optional()
  }
});

module.exports = {
  productCreation,
  productUpdate,
  productRemoval,
  productFetching
};
