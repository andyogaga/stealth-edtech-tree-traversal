import { Schema } from "mongoose";

export const QuestionSchema: Schema = new Schema(
  {
    questionNumber: {
      type: String,
      default: "",
    },
    annotations: [String],
  },
  { timestamps: true }
);
