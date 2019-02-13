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
  location: '',
  hash: ''
};

afterAll(async () => await Machine.findByIdAndRemove(fakeMachine._id));

describe('Testa o MachineController', () => {
  describe('Testa a criação de Máquinas', () => {
    it('Tenta criar uma nova máquina', async done => {
      let response = await request(app.callback())
        .post('/machines')
        .send(fakeMachine);
      expect(response.status).toEqual(200);
      fakeMachine._id = response.body.data.machine._id;
      done();
    });

    it('Tenta criar uma máquina com informações existentes', async done => {
      let response = await request(app.callback())
        .post('/machines')
        .send(fakeMachine);
      expect(response.status).toEqual(400);
      done();
    });

    it('Tenta criar uma máquina com valores vazios', async done => {
      let response = await request(app.callback())
        .post('/machines')
        .send(emptyFakeMachine);
      expect(response.status).toEqual(400);
      done();
    });
  });
});
