const Card = require('../models/Card');

async function doesNotCardExist(ctx, next) {
  let filter = ctx.request.body.cardId
    ? { _id: ctx.request.body.cardId }
    : null;

  if (!filter) {
    if (ctx.query.cardId) {
      filter = { _id: ctx.query.cardId };
    }
  }

  let foundCard = await Card.findOne(filter);

  if (!foundCard) {
    ctx.status = 400;
    ctx.body = {
      message: 'Cartão não cadastrado'
    };
    return;
  }

  await next();
}

module.exports = { doesNotCardExist };
