const Card = require('../models/Card');

async function createCard(ctx) {
  let card = await Card.create(ctx.request.body);
  ctx.body = {
    message: 'Cartão criado com sucesso',
    data: {
      card
    }
  };
}

async function removeCard(ctx) {
  let removedCard = await Card.findByIdAndDelete(ctx.query.cardId);
  ctx.body = {
    message: `Cartão ID ${removedCard._id} removido com sucesso`
  };
}

module.exports = { createCard, removeCard };
