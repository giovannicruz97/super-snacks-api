const app = require('../../app');
const request = require('supertest');
const Card = require('../../src/models/Card');
const Product = require('../../src/models/Product');
const Machine = require('../../src/models/Machine');

let token;
let productId;
let cardId;
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
      name: 'Teste 1',
      price: 3
    });
  productId = productRes.body.data.product._id.toString();

  // Criação de um cartão
  let cardRes = await request(app.callback())
    .post('/cards')
    .set('Authorization', 'Bearer ' + token)
    .send({
      defaultCredit: 20
    });
  cardId = cardRes.body.data.card._id.toString();
});

describe('Suíte do desafio proposto', () => {
  it('Executa o teste proposto', async done => {
    // Insere o cartão na máquina, exibe o saldo já recarregado, pois essa é a primeira utilização.
    let firstUseRes = await request(app.callback())
      .get('/cards')
      .set('Authorization', 'Bearer ' + token)
      .query({ cardId: cardId });

    expect(firstUseRes.status).toEqual(200);
    expect(firstUseRes.body.data.cards[0].currentCredit).toEqual(20);
    expect(firstUseRes.body.data.cards[0].reloadedToday).toEqual(true);

    // Realiza uma venda com o produto previamente cadastrado e exibe o saldo atual
    let saleRes = await request(app.callback())
      .post('/sales')
      .set('Authorization', 'Bearer ' + token)
      .send({
        productId: productId,
        cardId: cardId
      });

    expect(saleRes.status).toEqual(200);
    expect(saleRes.body.data.card.currentCredit).toEqual(17);

    // Reliza o reset do cartão, simulando a chamada de uma cron job
    let resetRes = await request(app.callback())
      .get('/cards/reset')
      .set('Authorization', 'Bearer ' + token);

    expect(resetRes.status).toEqual(200);

    // Insere o cartão novamente na máquina, simulando a primeira utilização de um novo dia
    let anotherDayFirstUse = await request(app.callback())
      .get('/cards')
      .set('Authorization', 'Bearer ' + token)
      .query({ cardId: cardId });

    expect(anotherDayFirstUse.status).toEqual(200);
    expect(anotherDayFirstUse.body.data.cards[0].currentCredit).toEqual(20);
    expect(anotherDayFirstUse.body.data.cards[0].defaultCredit).toEqual(20);
    expect(anotherDayFirstUse.body.data.cards[0].reloadedToday).toEqual(true);

    await done();
  });
});

afterAll(async () => {
  await Product.deleteMany({});
  await Card.deleteMany({});
  await Machine.deleteMany({});
});
