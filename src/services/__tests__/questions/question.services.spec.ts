import { createQuestion } from '../../question.services';
import questionModel from '../../../models/question/question';

describe('Questions test (unit)', () => {
  it('/ (GET)', async (done) => {
    jest.spyOn(questionModel, 'create').mockImplementation(
      async (): Promise<any> => {
        const res = {
          _id: '123456',
          questionNumber: 'question 1',
          annotations: ['anotation 1', 'anotation 2', 'anotation 3'],
        };
        return await res;
      },
    );
    const res = await createQuestion({
      questionNumber: 'question 1',
      annotations: ['anotation 1', 'anotation 2', 'anotation 3'],
    });
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('questionNumber');
    expect(res).toHaveProperty('annotations');
    expect(Array.isArray(res.annotations)).toBe(true);
    expect(res.annotations[0]).toBe('anotation 1');
    await done();
  });

  it('should catch an error when create topic fails', async (done) => {
    jest.spyOn(questionModel, 'create').mockImplementation(
      async (): Promise<any> => {
        return Promise.reject();
      },
    );
    try {
      await createQuestion({
        questionNumber: 'question 1',
        annotations: ['anotation 1', 'anotation 2', 'anotation 3'],
      });
    } catch (error) {
      expect(error.message).toBe('Failed to create new question');
      done();
    }
  });
});
