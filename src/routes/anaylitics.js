import express from "express";
import getUserCountByRole from "../controller/anaylitic/anayliticsController";
import getUserStas from "../controller/anaylitic/userStas";
import getDocstas from "../controller/anaylitic/docStas";
import getQuizstas from "../controller/anaylitic/quizStas";


const router = express.Route();

router.get("/alluserbyrole", getUserCountByRole)
router.get("/alluser", getUserStas)
router.get("/allDoc", getDocstas)
router.get("/allQuiz", getQuizstas)

export default router
