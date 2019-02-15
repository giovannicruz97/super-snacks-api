const Product = require('../models/Product');
const Card = require('../models/Card');

async function registerSale(ctx) {
  let foundProduct = await Product.findById(ctx.request.body.productId);
  let foundCard = await Card.findById(ctx.request.body.cardId);

  if (foundProduct.price > foundCard.currentCredit) {
    ctx.status = 400;
    ctx.body = {
      message: 'Saldo insuficiente'
    };
    return;
  }

  foundCard.currentCredit -= foundProduct.price;
  await Card.findByIdAndUpdate(ctx.request.body.cardId, foundCard);

  ctx.body = {
    message: `Produto ${foundProduct.name} ID ${
      foundProduct._id
    } debitado com sucesso`,
    data: {
      card: foundCard
    }
  };
}

module.exports = { registerSale };
