import express from "express"
import { createQuiz } from "../controller/quiz/createQuiz.js";
import { getAllQuizzes } from "../controller/quiz/getAllQuiz.js";
import { getQuizbyTopic } from "../controller/quiz/getQuizbyTopic.js";
import { authorizeUser, checkRole } from "../middleware/auth.js";
import { getQuizbyTechname } from "../controller/quiz/getQuizbyTechname.js";
import { getQuizById } from "../controller/quiz/getQuizbyid.js";
import { deleteQuiz } from "../controller/quiz/deleteQuiz.js";
import { submitQuiz } from "../controller/quiz/QuizSubmit.js";

const router = express.Router()
router.get('/allQuizzes', getAllQuizzes, checkRole("admin", "student"));
router.get('/Quiz/:topic', getQuizbyTopic, checkRole("admin", "student"));
router.get('/:id', getQuizById);
router.post('/createQuiz', createQuiz, checkRole("admin"));
router.get('/Quiz/:techname', getQuizbyTechname, checkRole("admin", "student"));
router.delete('/deleteQuiz/:id', deleteQuiz, checkRole("admin"));
router.post('/submit', authorizeUser, checkRole( "student", "Student"), submitQuiz);



export default router;