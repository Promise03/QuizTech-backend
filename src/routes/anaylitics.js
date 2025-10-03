import express from "express";
import getUserCountByRole from "../controller/anaylitic/anayliticsController.js";
import getUserStas from "../controller/anaylitic/userStas.js";
import getDocstas from "../controller/anaylitic/docStas.js";
import getQuizstas from "../controller/anaylitic/quizStas.js";


const router = express.Router();

router.get("/alluserbyrole", getUserCountByRole)
router.get("/alluser", getUserStas)
router.get("/allDoc", getDocstas)
router.get("/allQuiz", getQuizstas)

export default router
