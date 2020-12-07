import { Document } from 'mongoose';

export interface IQuestion extends Document {
  _id?: string;
  questionNumber: string;
  annotations: string[];
}
