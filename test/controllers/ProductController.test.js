const app = require('../../app');
const request = require('supertest');
const Machine = require('../../src/models/Machine');
const Product = require('../../src/models/Product');

let token;
let productId;
let productName;

beforeAll(async () => {
  // Criação de uma máquina
  await request(app.callback())
    .post('/machines')
    .send({
      name: 'maquina_de_testes_1',
      location: 'Localização teste',
      hash: 'senhateste123'
    });

  // Geração de token da máquina
  let authRes = await request(app.callback())
    .post('/auth')
    .send({
      name: 'maquina_de_testes_1',
      hash: 'senhateste123'
    });
  token = authRes.body.data.token;
});

describe('Testa o ProductController', () => {
  it('Cria um produto', async done => {
    let productRes = await request(app.callback())
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'Exemplo de Produto 2',
        price: 4.5
      });
    productId = productRes.body.data.product._id.toString();
    expect(productRes.status).toEqual(200);
    await done();
  });

  it('Atualiza um produto', async done => {
    let productRes = await request(app.callback())
      .patch('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        productId: productId,
        name: 'Novo exemplo de Produto 2',
        price: 5
      });
    productName = productRes.body.data.product.name;
    expect(productRes.status).toEqual(200);
    await done();
  });

  it('Busca um produto', async done => {
    let productRes = await request(app.callback())
      .get('/products')
      .set('Authorization', 'Bearer ' + token)
      .query({
        name: productName
      });
    expect(productRes.status).toEqual(200);
    await done();
  });

  it('Remove um produto', async done => {
    let productRes = await request(app.callback())
      .delete('/products')
      .set('Authorization', 'Bearer ' + token)
      .query({
        productId: productId
      });
    expect(productRes.status).toEqual(200);
    await done();
  });
});

afterAll(async () => {
  await Machine.deleteMany({});
  await Product.deleteMany({});
});
