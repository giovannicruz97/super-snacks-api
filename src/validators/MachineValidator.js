let joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
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

const machineAuth = validate({
  body: {
    name: joi.string().required(),
    hash: joi
      .string()
      .regex(/^(?=.*[a-zA-Z\d].*)[a-zA-Z\d!@#$%&*]{8,16}$/)
      .required()
  }
});

const machineFetching = validate({
  query: {
    name: joi.string().optional(),
    location: joi.string().optional()
  }
});

const machineRemoval = validate({
  query: {
    machineId: joi.objectId().required()
  }
});

module.exports = {
  machineCreation,
  machineAuth,
  machineFetching,
  machineRemoval
};
