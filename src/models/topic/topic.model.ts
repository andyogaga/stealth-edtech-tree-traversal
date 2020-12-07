import { Schema } from 'mongoose';

export const TopicSchema: Schema = new Schema(
  {
    topic: {
      type: String,
      index: true,
    },
    head: {
      type: String,
      default: '',
    },
    keywords: [String],
  },
  { timestamps: true },
);
