const Machine = require('../models/Machine');

async function doesMachineExist(ctx, next) {
  let foundMachine = await Machine.findOne({
    name: ctx.request.body.name
  });

  if (foundMachine) {
    ctx.status = 400;
    ctx.body = {
      message: 'Máquina já cadastrada'
    };
    return;
  }

  await next();
}

async function doesNotMachineExist(ctx, next) {
  let filter = ctx.request.body.machineId
    ? { _id: ctx.request.body.machineId }
    : { _id: ctx.query.machineId };
  let foundMachine = await Machine.findOne(filter);

  if (!foundMachine) {
    ctx.status = 400;
    ctx.body = {
      message: 'Máquina não cadastrada'
    };
    return;
  }

  await next();
}

module.exports = { doesMachineExist, doesNotMachineExist };
