import request from 'supertest';
import app from '../src/index';
import topicModel from '../src/models/topic/topic';

describe('Question recommendation test (e2e)', () => {
  it('/search (GET)', async done => {
    const res = await request(app).get(
      'search?topic=Cell Structure and Organisation',
    );
    expect(res.status).toEqual(200);
    console.log(res);

    await done();
  });

  it('/search?topic=Cell structrures (GET)', async done => {
    const res = await request(app).get(
      '/search?topic=Cell Structure and Organisation',
    );
    expect(Array.isArray(res)).toBe(true);
    done();
  });
});
