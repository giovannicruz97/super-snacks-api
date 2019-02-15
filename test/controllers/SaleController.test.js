const app = require('../../app');
const request = require('supertest');
const Card = require('../../src/models/Card');
const Machine = require('../../src/models/Machine');
const Product = require('../../src/models/Product');

let token;
let cardId;
let productId;

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

  // Criação de um produto
  let productRes = await request(app.callback())
    .post('/products')
    .set('Authorization', 'Bearer ' + token)
    .send({
      name: 'Exemplo de Produto 2',
      price: 4.5
    });
  productId = productRes.body.data.product._id.toString();

  // Criação de um cartão
  let cardResp = await request(app.callback())
    .post('/cards')
    .set('Authorization', 'Bearer ' + token)
    .send({
      defaultCredit: 35
    });
  cardId = cardResp.body.data.card._id.toString();

  // Inicialização os créditos do cartão recém-criado
  await request(app.callback())
    .get('/cards')
    .set('Authorization', 'Bearer ' + token)
    .query({ cardId: cardId });
});

describe('Testa o SaleController', () => {
  it('Lança uma venda', async done => {
    let saleResp = await request(app.callback())
      .post('/sales')
      .set('Authorization', 'Bearer ' + token)
      .send({
        productId: productId,
        cardId: cardId
      });

    expect(saleResp.status).toEqual(200);
    await done();
  });
});

afterAll(async () => {
  await Card.deleteMany({});
  await Machine.deleteMany({});
  await Product.deleteMany({});
});
