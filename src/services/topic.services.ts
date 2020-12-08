import { ITopic } from '../models/topic/topic.d';
import topicModel from '../models/topic/topic';
import { generateKeywords, logError } from '../utils';

export const createTopic = async ({
  topic,
  head,
}: {
  topic: string;
  head: string;
}): Promise<ITopic | null> => {
  try {
    if (!topic) return null;
    return await topicModel.create({
      topic,
      head,
      keywords: generateKeywords(topic),
    });
  } catch (error) {
    // Log error
    logError(error);
    throw new Error('Failed to create new topic');
  }
};

export const findTopic = async (topic: string): Promise<ITopic | null> => {
  try {
    if (!topic) return null;
    return await topicModel.findOne({ topic });
  } catch (error) {
    // Log error
    logError(error);
    throw new Error('Failed to find topic');
  }
};

export const getRelatedQuestionsFromTopic = async (
  topic: string,
  exact?: boolean,
): Promise<string[]> => {
  try {
    if (!topic) return [];
    const questions = await topicModel.aggregate([
      {
        $match: {
          topic,
        },
      },
      {
        $graphLookup: {
          from: 'topics',
          startWith: '$topic',
          connectFromField: 'topic',
          connectToField: 'head',
          as: 'children',
        },
      },
      {
        $unwind: {
          path: '$children',
        },
      },
      ...(!!exact
        ? [
            {
              $lookup: {
                from: 'questions',
                localField: 'children.topic',
                foreignField: 'annotations',
                as: 'question',
              },
            },
          ]
        : [
            {
              $unwind: {
                path: '$children.keywords',
              },
            },
            {
              $lookup: {
                from: 'questions',
                let: {
                  keyword: '$children.keywords',
                },
                pipeline: [
                  {
                    $unwind: {
                      path: '$annotations',
                    },
                  },
                  {
                    $addFields: {
                      topicMatch: {
                        $regexMatch: {
                          input: '$annotations',
                          regex: '$$keyword',
                          options: 'i',
                        },
                      },
                    },
                  },
                  {
                    $match: {
                      topicMatch: true,
                    },
                  },
                ],
                as: 'question',
              },
            },
          ]),
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    return questions.map(question => question?.question?.questionNumber ?? '');
  } catch (error) {
    // Log error
    logError(error);
    throw new Error('Failed to get question numbers');
  }
};
