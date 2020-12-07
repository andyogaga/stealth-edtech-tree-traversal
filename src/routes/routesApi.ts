import express from 'express';
import fileUpload from 'express-fileupload';
import { createTopicsFromExcel } from '../controllers/topic.controller';
import {
  createQuestionsFromExcel,
  getRelatedQuestions,
} from '../controllers/question.controller';

const router = express.Router();

router.use(fileUpload());

router.post('/topic/create-batch', createTopicsFromExcel);
router.post('/question/create-batch', createQuestionsFromExcel);
router.get('/search', getRelatedQuestions);
export default router;
