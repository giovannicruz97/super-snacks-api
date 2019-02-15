const app = require('../../app');
const request = require('supertest');

let jwt;

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
    expect(response.status).toEqual(200);
    await done();
  });
  // it('Atualiza um cartão', async done => {});
  // it('Remove um cartão', async done => {});
  // it('Cria um novo cartão', async done => {});
});
