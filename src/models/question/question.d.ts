import { Document } from 'mongoose';

export interface IQuestion extends Document {
  questionNumber: string;
  annotations: string[];
}
