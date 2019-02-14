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

let fakeJwtToken = '';

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

describe('Testa a atualização de Máquina', () => {
  it('Tenta atualizar uma máquina existente', async done => {
    // É necessário criar uma máquina para atualiza-la, posteriomente
    let creationResponse = await request(app.callback())
      .post('/machines')
      .send({
        name: fakeMachine.name,
        location: fakeMachine.location,
        hash: fakeMachine.hash
      });

    // É necessário, realizar o login e receber o token JWT
    let loginResponse = await request(app.callback())
      .post('/auth')
      .send({
        name: fakeMachine.name,
        hash: fakeMachine.hash
      });
    fakeJwtToken = loginResponse.body.data.token;

    let updateMachine = {
      name: 'maquina_atualizada_fake_1',
      location: 'Taubaté Shoppin - Taubaté, SP',
      hash: 'novasenha123'
    };
    fakeMachine._id = creationResponse.body.data.machine._id;

    let finalResponse = await request(app.callback())
      .patch('/machines')
      .set('Authorization', 'Bearer ' + fakeJwtToken)
      .send(updateMachine);
    expect(finalResponse.status).toEqual(200);
    done();
  });

  it('Tenta atualizar uma máquina com valores inválidos', async done => {
    let response = await request(app.callback())
      .patch('/machines')
      .set('Authorization', 'Bearer ' + fakeJwtToken)
      .send(emptyFakeMachine);

    expect(response.status).toEqual(400);
    done();
  });
});

afterEach(async () => await Machine.findOneAndDelete({ _id: fakeMachine._id }));
