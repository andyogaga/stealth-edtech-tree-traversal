import { Request, Response, NextFunction } from 'express';
import excelToJson from 'convert-excel-to-json';
import { readFileSync, unlinkSync } from 'fs';
import { createQuestion } from '../services/question.services';
import { getRelatedQuestionsFromTopic } from './../services/topic.services';

export const createQuestionsFromExcel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const excelFile = req.files?.file;
  if (!excelFile) res.status(404).json({ message: 'File not found' });
  excelFile?.mv(
    `${__dirname}-questions`,
    async (err): Promise<void> => {
      if (err) {
        next({
          message: 'Generating Details from excel failed',
          error: err,
        });
      }
      try {
        const result: { [key: string]: string[] } = await excelToJson({
          source: readFileSync(`${__dirname}-questions`),
          header: {
            rows: 1,
          },
          sheets: ['Questions'],
        });
        unlinkSync(`${__dirname}-questions`);
        const { Questions: sheet } = result;
        for (const questionsRow of sheet) {
          const [questionNumber, ...annotations] = Object.values(questionsRow);
          await createQuestion({
            questionNumber,
            annotations: annotations ?? '',
          });
        }

        await res.status(201).json({ message: 'Questions saved' });
      } catch (error) {
        return next({
          message: 'saving questions failed',
          error,
        });
      }
    },
  );
};

export const getRelatedQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    /**
     * exact - tells whether to check if topic keywords matches the annotations (default = true)
     * q - the topic you wish to search for
     */
    const { q, exact } = req.query as any;
    if (!q) {
      res.status(400).send(`Bad Query, Please enter Query 'q' in url`);
      return;
    }
    const relatedQuestions = await getRelatedQuestionsFromTopic(
      q,
      !Boolean(exact == 'false'),
    );
    await res
      .status(200)
      .json(
        Array.from(new Set(relatedQuestions)).sort(
          (a: string, b: string): number => Number(a) - Number(b),
        ),
      );
  } catch (error) {
    return next({
      message: 'saving questions failed',
      error,
    });
  }
};
