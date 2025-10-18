import express from "express";
import getUserStas from "../controller/anaylitic/userStas.js";
import getDocstas from "../controller/anaylitic/docStas.js";
import getQuizstas from "../controller/anaylitic/quizStas.js";
import getUserCountByRole from "../controller/anaylitic/anayliticsController.js"
import { getUserDashboardStats } from "../controller/anaylitic/TotalScore.js";



const router = express.Router();

router.get("/alluserbyrole", getUserCountByRole)
router.get("/alluser", getUserStas)
router.get("/allDoc", getDocstas)
router.get("/allQuiz", getQuizstas)
router.get("/userdashboard/:userId", getUserDashboardStats)

export default router;
