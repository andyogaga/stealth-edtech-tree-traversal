import { Document } from "mongoose";

export interface ITopic extends Document {
  topic: string;
  head: string;
  keywords: [string];
}
