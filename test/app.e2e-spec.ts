import request from 'supertest';
import app from '../src/index';

describe('Server test (e2e)', () => {

  it('/ (GET)', async done => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Welcome to the Server Apis');

    await done();
  });
});
