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
      message: 'Máquina cadastrada com sucesso',
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

async function updateMachine(ctx) {
  let postData = ctx.request.body;
  let decoded = await hashService.extractToken(ctx.header.authorization);
  let machineId = decoded.data.machineId;
  let foundMachine = await Machine.findOne({ _id: machineId });

  if (!foundMachine) {
    ctx.status = 404;
    ctx.body = {
      message: 'Máquina não encontrada'
    };
    return;
  }

  let encrypted = await hashService.createHash(postData.hash);
  try {
    let updatedMachine = await Machine.findOneAndUpdate(
      { _id: machineId },
      {
        name: postData.name,
        location: postData.location,
        hash: encrypted
      },
      { new: true }
    );
    ctx.body = {
      message: 'Máquina atualizada com sucesso',
      data: {
        machine: {
          updatedMachine
        }
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

module.exports = { createMachine, updateMachine };
