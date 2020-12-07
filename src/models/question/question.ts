import { model } from "mongoose";
import { IQuestion } from "./question.d";
import { QuestionSchema } from "./question.model";

const questionModel = model<IQuestion>("question", QuestionSchema);
export default questionModel;
