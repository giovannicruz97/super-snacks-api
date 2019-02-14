const app = require('../../app');
const request = require('supertest');
const Product = require('../../src/models/Product');

let jwt;

beforeAll(async () => {
  await request(app.callback())
    .post('/machines')
    .send({
      name: 'maquina_testes_admin_1',
      location: 'Neverland',
      hash: 'madalice'
    });

  let secondRequest = await request(app.callback())
    .post('/auth')
    .send({
      name: 'maquina_testes_admin_1',
      hash: 'madalice'
    });

  let newToken = secondRequest.body.data.token;
  jwt = newToken;
});

describe('Testa a criação de produtos', () => {
  it('Cria um novo produto', async done => {
    const response = await request(app.callback())
      .post('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        name: 'Produto 30',
        price: 3.5
      });
    await Product.findByIdAndDelete(response.body.data.product._id);
    expect(response.status).toEqual(200);
    done();
  });

  it('Tenta criar um produto com mesmo nome', async done => {
    const product = await Product.create({
      name: 'Produto 66',
      price: 3.5
    });

    const response = await request(app.callback())
      .post('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        name: 'Produto 66',
        price: 3.5
      });
    expect(response.status).toEqual(400);
    await Product.deleteOne({ _id: product._id });
    done();
  });
});

describe('Testa a atualização de produtos', () => {
  it('Atualiza um produto existente', async done => {
    const product = await Product.create({
      name: 'Produto 3',
      price: 3.5
    });

    const response = await request(app.callback())
      .patch('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        productId: product._id,
        name: 'Produto  10',
        price: 3.0
      });
    expect(response.status).toEqual(200);
    await Product.deleteOne({ _id: product._id });
    done();
  });

  it('Tenta atualizar um produto não existente', async done => {
    const response = await request(app.callback())
      .patch('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        productId: '5c659adf393a2a3e2bbb0efd',
        name: 'Produto 3',
        price: 3.0
      });
    expect(response.status).toEqual(400);
    done();
  });
});

describe('Testa a remoção de produtos', () => {
  it('Remove um produto existente', async done => {
    const product = await Product.create({
      name: 'Produto 3',
      price: 3.5
    });

    const response = await request(app.callback())
      .delete('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .query({
        productId: product._id.toString()
      });
    expect(response.status).toEqual(200);
    done();
  });
  it('Tenta remover um produto inexistente', async done => {
    const response = await request(app.callback())
      .delete('/products')
      .set('Authorization', 'Bearer ' + jwt)
      .query({
        productId: '5c659adf393a2a3e2bbb0efd'
      });
    expect(response.status).toEqual(400);
    done();
  });
});
