const app = require('../../app');
const request = require('supertest');
const Machine = require('../../src/models/Machine');

let fakeMachine = {
  name: 'maquina_fake_1',
  location: 'Café Fake - Itaim Bibi, SP',
  hash: 'senhadamaquina1'
};

let emptyFakeMachine = {
  name: '',
  hash: ''
};

beforeAll(async () => {
  let response = await request(app.callback())
    .post('/machines')
    .send(fakeMachine);
  fakeMachine._id = response.body.data.machine._id;
});

describe('Testa o AuthController', () => {
  it('Tenta gerar um token JWT para a máquina', async done => {
    let response = await request(app.callback())
      .post('/auth')
      .send({
        name: fakeMachine.name,
        hash: fakeMachine.hash
      });
    expect(response.status).toEqual(200);
    done();
  });

  it('Tenta gerar um token JWT com informações vazias', async done => {
    let response = await request(app.callback())
      .post('/auth')
      .send(emptyFakeMachine);
    expect(response.status).toEqual(400);
    done();
  });

  it('Tenta gerar um token JWT com "name" ou "hash" inválidas', async done => {
    let response = await request(app.callback())
      .post('/auth')
      .send({
        name: fakeMachine.name,
        hash: 'wronghash'
      });
    expect(response.status).toEqual(401);
    done();
  });
});

afterAll(async () => await Machine.deleteOne({ _id: fakeMachine._id }));
