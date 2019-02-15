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

describe('Testa a criação de máquinas', () => {
  it('Cria uma nova máquina', async done => {
    let response = await request(app.callback())
      .post('/machines')
      .send({
        name: 'maquina_muito_teste',
        location: 'Somewhere, Over the rainbow',
        hash: 'marvingaye'
      });
    expect(response.status).toEqual(200);
    let machineId = response.body.data.machine._id.toString();
    await request(app.callback())
      .delete('/machines')
      .set('Authorization', 'Bearer ' + jwt)
      .query({ machineId: machineId });
    await done();
  });
});
