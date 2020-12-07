import questionModel from '../models/question/question';
import { IQuestion } from '../models/question/question.d';

export const createQuestion = async ({
  questionNumber,
  annotations,
}: {
  questionNumber: string;
  annotations: string[];
}): Promise<IQuestion> => {
  return await questionModel
    .create({
      questionNumber,
      annotations,
    })
    .catch((error: Error) => {
      // Log error

      throw new Error('Failed to create new question');
    });
};

