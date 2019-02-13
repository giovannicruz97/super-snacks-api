const Machine = require('../models/Machine');
const hashService = require('../services/HashService');

async function createMachine(ctx) {
  let postData = ctx.request.body;
  let foundMachine = await Machine.findOne({
    name: postData.name
  });

  if (foundMachine) {
    ctx.status = 400;
    ctx.body = {
      message: 'Máquina já cadastrada'
    };
    return;
  }

  let encrypted = await hashService.createHash(postData.hash);

  try {
    let createdMachine = await Machine.create({
      name: postData.name,
      location: postData.location,
      hash: encrypted
    });
    ctx.body = {
      message: 'Máquina cadastrada com sucesso!',
      data: {
        machine: createdMachine
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Ops, algo aconteceu com a API',
      serverMessage: error.message
    };
  }
}

module.exports = { createMachine };
