import request from 'supertest';
import app from '../src/index';
import Mongoose from 'mongoose';

describe('Question recommendation test (e2e)', () => {
  afterAll(() => {
    Mongoose.connection.close()
    app.close();
  });

  it('/search?topic=Cell Structure and Organisation (GET)', async done => {
    const res = await request(app).get(
      '/search?topic=Cell Structure and Organisation',
    );
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toBe('8');
    expect(res.body.length).toBe(22);
    done();
  });
});
