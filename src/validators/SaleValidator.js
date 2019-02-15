let joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const validate = require('koa-joi-validate');

const saleCreation = validate({
  body: {
    cardId: joi.objectId().required(),
    productId: joi.objectId().required()
  }
});

module.exports = { saleCreation };
