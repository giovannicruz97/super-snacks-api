const app = require('../../app');
const request = require('supertest');
const Machine = require('../../src/models/Machine');

beforeAll(async () => {
  // Criação de uma máquina
  await request(app.callback())
    .post('/machines')
    .send({
      name: 'maquina_de_testes_1',
      location: 'Localização teste',
      hash: 'senhateste123'
    });
});

describe('Testa o AuthController', () => {
  it('Realiza autenticação da máquina', async done => {
    let authRes = await request(app.callback())
      .post('/auth')
      .send({
        name: 'maquina_de_testes_1',
        hash: 'senhateste123'
      });
    expect(authRes.status).toEqual(200);
    await done();
  });
});

afterAll(async () => await Machine.deleteMany({}));
