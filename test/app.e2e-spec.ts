import request from 'supertest';
import app from '../src/index';
import Mongoose from 'mongoose';

describe('Server test (e2e)', () => {
  afterAll(() => {
    Mongoose.connection.close();
    app.close();
  });

  it('/ (GET)', async done => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Welcome to the Server Apis');
    done();
  });
});
