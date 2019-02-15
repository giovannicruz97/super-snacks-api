const app = require('../../app');
const request = require('supertest');
const Machine = require('../../src/models/Machine');

let token;
let machineId;
let machineName;

describe('Testa o MachineController', () => {
  it('Cria uma máquina', async done => {
    let machineRes = await request(app.callback())
      .post('/machines')
      .send({
        name: 'maquina_teste_2',
        location: 'Localizacao Teste 2',
        hash: 'senhadificil2'
      });
    machineId = machineRes.body.data.machine._id.toString();
    expect(machineRes.status).toEqual(200);
    await done();
  });
  it('Atualiza uma máquina', async done => {
    let authRes = await request(app.callback())
      .post('/auth')
      .send({
        name: 'maquina_teste_2',
        hash: 'senhadificil2'
      });
    token = authRes.body.data.token;

    let machineRes = await request(app.callback())
      .patch('/machines')
      .set('Authorization', 'Bearer ' + token)
      .send({
        machineId: machineId,
        name: 'maquina_atualizada_teste_2',
        location: 'Localização Atualizada Teste 2',
        hash: 'mudouasenha1'
      });
    machineName = machineRes.body.data.machine.name;
    expect(machineRes.status).toEqual(200);
    await done();
  });
  it('Busca uma máquina', async done => {
    let machineRes = await request(app.callback())
      .get('/machines')
      .set('Authorization', 'Bearer ' + token)
      .query({ name: machineName });
    expect(machineRes.status).toEqual(200);
    await done();
  });
  it('Remove uma máquina', async done => {
    let machineRes = await request(app.callback())
      .delete('/machines')
      .set('Authorization', 'Bearer ' + token)
      .query({ machineId: machineId });
    expect(machineRes.status).toEqual(200);
    await done();
  });
});

afterAll(async () => {
  await Machine.deleteMany({});
});
