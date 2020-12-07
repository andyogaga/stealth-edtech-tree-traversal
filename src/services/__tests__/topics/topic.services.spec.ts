import {
  createTopic,
  findTopic,
  getRelatedQuestionsFromTopic,
} from '../../topic.services';
import topicModel from '../../../models/topic/topic';

describe('Topics test (unit)', () => {
  it('should create a topic in DB => createTopic', async (done) => {
    jest.spyOn(topicModel, 'create').mockImplementation(
      async (): Promise<any> => {
        return {
          _id: '123456',
          topic:
            'Identify cell structures (including organelles) of typical plant and animal cells from diagrams, photomicrographs and as seen under the light microscope using prepared slides and fresh material treated with an appropriate temporary staining technique:',
          head: 'Cell Structure and Organisation',
          keywords: [
            'Identify',
            'cell',
            'structures',
            'organelles',
            'typical',
            'plant',
            'animal',
            'cells',
            'photomicrographs',
            'seen',
            'under',
            'light',
            'microscope',
            'material',
            'treated',
            'temporary',
            'staining',
            'technique',
          ],
        };
      },
    );
    const res = await createTopic({
      topic:
        'Identify cell structures (including organelles) of typical plant and animal cells from diagrams, photomicrographs and as seen under the light microscope using prepared slides and fresh material treated with an appropriate temporary staining technique:',
      head: 'Cell Structure and Organisation',
    });
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('topic');
    expect(res).toHaveProperty('head');
    expect(Array.isArray(res?.keywords)).toBe(true);
    expect(res?.keywords[0]).toBe('Identify');
    done();
  });

  it('should find a null if empty string is passed as topic in createTopic', async (done) => {
    const res = await createTopic({ head: '', topic: '' });
    expect(res).toBeNull();
    done();
  });

  it('should find a topic in DB', async (done) => {
    jest.spyOn(topicModel, 'findOne').mockImplementation((): any => {
      return {
        _id: '123456',
        topic:
          'Identify cell structures (including organelles) of typical plant and animal cells from diagrams, photomicrographs and as seen under the light microscope using prepared slides and fresh material treated with an appropriate temporary staining technique:',
        head: 'Cell Structure and Organisation',
        keywords: [
          'Identify',
          'cell',
          'structures',
          'organelles',
          'typical',
          'plant',
          'animal',
          'cells',
          'photomicrographs',
          'seen',
          'under',
          'light',
          'microscope',
          'material',
          'treated',
          'temporary',
          'staining',
          'technique',
        ],
      };
    });
    const res = await findTopic(
      'Identify cell structures (including organelles) of typical plant and animal cells from diagrams, photomicrographs and as seen under the light microscope using prepared slides and fresh material treated with an appropriate temporary staining technique:',
    );
    expect(res).toHaveProperty('_id');
    expect(res).toHaveProperty('topic');
    expect(res).toHaveProperty('head');
    expect(Array.isArray(res?.keywords)).toBe(true);
    expect(res?.keywords?.[0]).toBe('Identify');
    done();
  });

  it('should find a null if empty string is passed in findTopic', async (done) => {
    const res = await findTopic('');
    expect(res).toBeNull();
    done();
  });

  it('should aggregate topic and return question array', async (done) => {
    jest.spyOn(topicModel, 'aggregate').mockImplementation((): any => {
      return [
        {
          _id: '5fcbeab4e2cac22580797a17',
          questionNumber: '1',
          annotations: [
            'Define diffusion and describe its role in nutrient uptake and gaseous exchange in plants and humans',
            'Define active transport and discuss its importance as an energy-consuming process by which substances are transported against a concentration gradient, as in ion uptake by root hairs and uptake of glucose by cells in the villi',
            'Define homeostasis as the maintenance of a constant internal environment',
          ],
          createdAt: '2020-12-05T20:16:52.011Z',
          updatedAt: '2020-12-05T20:16:52.011Z',
          questions: {
            _id: '5fcbeab4e2cac22580797a17',
            questionNumber: '1',
            annotations: [
              'Define diffusion and describe its role in nutrient uptake and gaseous exchange in plants and humans',
              'Define active transport and discuss its importance as an energy-consuming process by which substances are transported against a concentration gradient, as in ion uptake by root hairs and uptake of glucose by cells in the villi',
              'Define homeostasis as the maintenance of a constant internal environment',
            ],
            createdAt: '2020-12-05T20:16:52.011Z',
            updatedAt: '2020-12-05T20:16:52.011Z',
          },
        },
      ];
    });
    const res = await getRelatedQuestionsFromTopic(
      'Identify cell structures (including organelles) of typical plant and animal cells from diagrams, photomicrographs and as seen under the light microscope using prepared slides and fresh material treated with an appropriate temporary staining technique:',
    );
    expect(Array.isArray(res)).toBe(true);
    expect(res?.[0]).toBe('1');
    done();
  });

  it('should find an empty array if an empty string is passed in getRelatedQuestionsFromTopic', async (done) => {
    const res = await getRelatedQuestionsFromTopic('');
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBe(0);
    done();
  });
});
