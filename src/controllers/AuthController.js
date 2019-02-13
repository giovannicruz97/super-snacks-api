const Machine = require('../models/Machine');
const hashService = require('../services/HashService');

async function authenticate(ctx) {
  let postData = ctx.request.body;

  let foundMachine = await Machine.findOne({ name: postData.name });
  if (!foundMachine) {
    ctx.status = 401;
    ctx.body = {
      message: 'Credenciais inválidas'
    };
    return;
  }

  let hash = await hashService.verifyHash(postData.hash, foundMachine.hash);
  if (!hash) {
    ctx.status = 401;
    ctx.body = {
      message: 'Credenciais inválidas'
    };
    return;
  }

  let token = hashService.createToken({
    name: postData.name,
    location: foundMachine.location
  });

  ctx.body = {
    messagem: 'Autenticação realizada com sucesso',
    data: {
      token: token
    }
  };
}

module.exports = { authenticate };
