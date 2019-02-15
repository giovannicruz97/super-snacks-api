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

async function findCards(ctx) {
  let filter = ctx.query;

  if (!('cardId' in filter)) {
    let foundCards = await Card.find({}).select({ __v: false });
    ctx.body = {
      message: `Total de ${foundCards.length} cartão(ões) encontrado(s)`,
      data: {
        cards: foundCards
      }
    };
    return;
  }

  let foundCard = await Card.find({ _id: filter.cardId });
  ctx.body = {
    message: 'Cartão encontrado',
    data: {
      cards: foundCard
    }
  };
}

module.exports = { createCard, removeCard, findCards };
