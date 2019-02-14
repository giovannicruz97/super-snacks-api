const Machine = require('../models/Machine');
const hashService = require('../services/HashService');

async function createMachine(ctx) {
  let postData = ctx.request.body;

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
        machines: [createdMachine]
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

  let encrypted = await hashService.createHash(postData.hash);
  try {
    let updatedMachine = await Machine.findByIdAndUpdate(
      postData.machineId,
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
        machines: [updatedMachine]
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

async function findMachines(ctx) {
  let filter = ctx.query;

  if (!('location' in filter) && !('name' in filter)) {
    let foundMachines = await Machine.find({}).select({ __v: false });
    ctx.body = {
      message: `Total de ${foundMachines.length} máquina(s) encontrada(s)`,
      data: {
        machines: foundMachines
      }
    };
    return;
  }

  let foundMachine = await Machine.find(filter).select({ __v: false });
  if (foundMachine.length == 0) {
    ctx.status = 404;
    ctx.body = {
      message: 'Máquina não encontrada'
    };
    return;
  }

  ctx.body = {
    message: 'Máquina encontrada',
    data: {
      machines: foundMachine
    }
  };
}

async function removeMachine(ctx) {
  let machineId = ctx.query.machineId;
  await Machine.findOneAndRemove({ _id: machineId });

  ctx.body = {
    message: `Máquina ID ${machineId} removida`
  };
}

module.exports = { createMachine, updateMachine, findMachines, removeMachine };
