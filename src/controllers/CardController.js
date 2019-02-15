const Card = require('../models/Card');

async function createCard(ctx) {
  let createdCard = await Card.create(ctx.request.body);
  ctx.body = {
    message: 'Cartão criado com sucesso',
    data: {
      card: {
        createdCard
      }
    }
  };
}

module.exports = { createCard };
