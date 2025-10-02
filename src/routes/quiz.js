import express from "express"
import { createQuiz } from "../controller/quiz/createQuiz.js";
import { getAllQuizzes } from "../controller/quiz/getAllQuiz.js";

const router = express.Router()
router.get('/allQuizzes', getAllQuizzes);
// router.get('Quiz/:id', getQuiz);
router.post('/createQuiz', createQuiz);

export default router;