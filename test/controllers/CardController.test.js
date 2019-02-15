const app = require('../../app');
const request = require('supertest');

let jwt;
let cardId;

beforeAll(async () => {
  let secondRequest = await request(app.callback())
    .post('/auth')
    .send({
      name: 'maquina_testes_admin_1',
      hash: 'madalice'
    });
  let newToken = secondRequest.body.data.token;
  jwt = newToken;
});

describe('Testa a criação de um cartão', () => {
  it('Cria um novo cartão', async done => {
    let response = await request(app.callback())
      .post('/cards')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        defaultCredit: 20
      });
    cardId = response.body.data.card._id.toString();
    expect(response.status).toEqual(200);
    await done();
  });
  it('Visualiza o saldo do cartão', async done => {
    let response = await request(app.callback())
      .get('/cards')
      .set('Authorization', 'Bearer ' + jwt)
      .query({
        cardId: cardId
      });
    expect(response.status).toEqual(200);
    await done();
  });
  it('Remove um cartão', async done => {
    let response = await request(app.callback())
      .delete('/cards')
      .set('Authorization', 'Bearer ' + jwt)
      .query({
        cardId: cardId
      });
    expect(response.status).toEqual(200);
    await done();
  });
});
