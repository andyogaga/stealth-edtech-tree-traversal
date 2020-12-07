import { model } from "mongoose";
import { ITopic } from "./topic.d";
import { TopicSchema } from "./topic.model";

const topicModel = model<ITopic>("topic", TopicSchema);
export default topicModel;
