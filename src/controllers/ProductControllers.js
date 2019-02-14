const Product = require('../models/Product');

async function createProduct(ctx) {
  let product = ctx.request.body;
  let createdProduct = await Product.create(product);

  ctx.body = {
    message: 'Produto criado com sucesso',
    data: {
      product: createdProduct
    }
  };
}

async function updateProduct(ctx) {
  let product = ctx.request.body;
  let updateProduct = await Product.findByIdAndUpdate(
    product.productId,
    {
      name: product.name,
      price: product.price
    },
    { new: true }
  );

  ctx.body = {
    message: 'Produto atualizado com sucesso',
    data: {
      product: updateProduct
    }
  };
}

async function removeProduct(ctx) {
  let productId = ctx.query.productId;
  await Product.findByIdAndDelete({ _id: productId });

  ctx.body = {
    message: `Produto ID ${productId} removido com sucesso`
  };
}

module.exports = { createProduct, updateProduct, removeProduct };
