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
  if (!topic) return null;
  return await topicModel
    .create({
      topic,
      head,
      keywords: generateKeywords(topic),
    })
    .catch((error) => {
      // Log error
      logError(error);
      throw new Error('Failed to create new topic');
    });
};

export const findTopic = async (topic: string): Promise<ITopic | null> => {
  try {
    if (!topic) return null;
    return await topicModel.findOne({ topic });
  } catch (error) {
    // Log error
    logError(error);
    throw new Error('Failed to create new topic');
  }
};

export const getRelatedQuestionsFromTopic = async (
  topic: string,
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
      {
        $unwind: {
          path: '$children.keywords',
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: 'children.keywords',
          foreignField: 'annotations',
          as: 'questions',
        },
      },
      {
        $project: {
          questions: 1,
        },
      },
      {
        $unwind: {
          path: '$questions',
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    return questions.map(
      (question) => question?.questions?.questionNumber ?? '',
    );
  } catch (error) {
    // Log error
    logError(error);
    throw new Error('Failed to create new question');
  }
};
