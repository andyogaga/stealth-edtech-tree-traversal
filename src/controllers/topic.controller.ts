import { Request, Response, NextFunction } from 'express';
import excelToJson from 'convert-excel-to-json';
import { readFileSync, unlinkSync } from 'fs';
import { createTopic, findTopic } from '../services/topic.services';

export const createTopicsFromExcel = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const excelFile = req.files?.file;
  if (!excelFile) res.status(404).json({ message: 'File not found' });
  excelFile?.mv(
    `${__dirname}-topics`,
    async (err): Promise<void> => {
      if (err) {
        next({
          message: 'Generating Details from excel failed',
          error: err,
        });
      }
      try {
        const result = await excelToJson({
          source: readFileSync(`${__dirname}-topics`),
          header: {
            rows: 1,
          },
          sheets: ['Topics'],
          columnToKey: {
            A: 'topic1',
            B: 'topic2',
            C: 'topic3',
          },
        });
        unlinkSync(`${__dirname}-topics`);
        const { Topics: sheet } = result;
        for (const topicRow of sheet) {
          const topicArray = Object.entries(topicRow);
          for (let i = 0; i < topicArray.length; i++) {
            const created = await findTopic(topicRow[topicArray[i][0]]);
            if (!created) {
              await createTopic({
                topic: topicRow[topicArray[i][0]],
                head: topicRow[topicArray?.[i - 1]?.[0] ?? ''] ?? '',
              });
            }
          }
        }

        await res.status(201).json({ message: 'Topics saved' });
      } catch (error) {
        return next({
          message: 'saving topics failed',
          error,
        });
      }
    },
  );
};
