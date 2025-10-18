import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizTitle: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizAttempt", quizAttemptSchema);
