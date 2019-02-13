const joi = require('joi');
const validate = require('koa-joi-validate');

const machineCreation = validate({
  body: {
    name: joi.string().required(),
    location: joi.string().required(),
    hash: joi
      .string()
      .regex(/^(?=.*[a-zA-Z\d].*)[a-zA-Z\d!@#$%&*]{8,16}$/)
      .required()
  }
});

module.exports = {
  machineCreation
};
