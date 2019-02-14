const Product = require('../models/Product');

async function doesProductExist(ctx, next) {
  let foundProduct = await Product.findOne({
    name: ctx.request.body.name
  });

  if (foundProduct) {
    ctx.status = 400;
    ctx.body = {
      message: 'Produto já cadastrado'
    };
    return;
  }

  await next();
}

async function doesNotProductExist(ctx, next) {
  let filter = ctx.request.body.productId
    ? { _id: ctx.request.body.productId }
    : { _id: ctx.query.productId };
  let foundProduct = await Product.findOne(filter);

  if (!foundProduct) {
    ctx.status = 400;
    ctx.body = {
      message: 'Produto não cadastrado'
    };
    return;
  }

  await next();
}

module.exports = { doesProductExist, doesNotProductExist };
