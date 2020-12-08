import request from 'supertest';
import app from '../src/index';
import Mongoose from 'mongoose';

describe('Question recommendation test (e2e)', () => {
  afterAll(() => {
    Mongoose.connection.close();
    app.close();
  });

  it('/search?topic=Cell Structure and Organisation (GET)', async done => {
    const res = await request(app).get(
      '/search?topic=Cell Structure and Organisation',
    );
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toBe('2');
    expect(res.body.length).toBe(44);
    done();
  });

  it('/search?exact=false&topic=Cell Structure and Organisation (GET)', async done => {
    const res = await request(app).get(
      '/search?exact=false&topic=Cell Structure and Organisation',
    );
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toBe('1');
    expect(res.body.length).toBe(104);
    done();
  });
});
