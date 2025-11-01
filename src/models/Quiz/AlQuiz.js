import mongoose from "mongoose";
import Quiz from "./quiz";

const aiUserId = new mongoose.Types.ObjectId("000000000000000000000000"); // placeholder ObjectId

const quiz = new Quiz({
  techStack: document.techStack || "AI/Machine Learning", // or derive from doc
  difficulty: "Intermediate",
  topic: ["AI Generated"],
  questions: quizData.map(q => ({
    questionText: q.question,
    options: q.options,
    correctAnswer: q.answer,
    explanation: q.explanation || "",
  })),
  createdBy: aiUserId, // must be a valid ObjectId
});
