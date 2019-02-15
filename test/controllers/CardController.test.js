const app = require('../../app');
const request = require('supertest');
const Card = require('../../src/models/Card');
const Machine = require('../../src/models/Machine');

let token;
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
});

describe('Teste o CardController', () => {
  it('Cria um cartão', async done => {
    let cardRes = await request(app.callback())
      .post('/cards')
      .set('Authorization', 'Bearer ' + token)
      .send({
        defaultCredit: 35
      });
    cardId = cardRes.body.data.card._id.toString();
    expect(cardRes.status).toEqual(200);
    await done();
  });
  it('Lista um cartão', async done => {
    let cardRes = await request(app.callback())
      .get('/cards')
      .set('Authorization', 'Bearer ' + token)
      .query({
        cardId: cardId
      });
    expect(cardRes.status).toEqual(200);
    await done();
  });
  it('Remove um cartão', async done => {
    let cardRes = await request(app.callback())
      .delete('/cards')
      .set('Authorization', 'Bearer ' + token)
      .query({ cardId: cardId });
    expect(cardRes.status).toEqual(200);
    await done();
  });
});

afterAll(async () => {
  await Card.deleteMany({});
  await Machine.deleteMany({});
});
