let joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const validate = require('koa-joi-validate');

const cardCreation = validate({
  body: {
    defaultCredit: joi
      .number()
      .min(0)
      .required()
  }
});

const cardRemoval = validate({
  query: {
    cardId: joi.objectId().required()
  }
});

const cardFetching = validate({
  query: {
    cardId: joi.objectId().optional()
  }
});

module.exports = { cardCreation, cardRemoval, cardFetching };
