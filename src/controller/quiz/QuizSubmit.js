import Quiz from "../../models/Quiz/quiz.js";
import QuizAttempt from "../../models/Quiz/totascore.js";
import User from "../../models/user/user.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, userId, score, totalQuestions } = req.body;

    if (!quizId || !userId || score === undefined || !totalQuestions) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Find the quiz to get its title (or techStack) for record keeping
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Optional: check if user exists (only if you want validation)
    // const user = await User.findById(userId);
    // if (!user) return res.status(404).json({ message: "User not found" });

    // Save attempt
    const attempt = await QuizAttempt.create({
      user: userId,
      quizTitle: quiz.techStack || "Untitled Quiz",
      score,
      totalQuestions,
    });

    console.log("✅ Quiz Attempt Saved:", attempt);

    res.status(201).json({
      message: "Quiz submitted successfully!",
      attempt,
    });
  } catch (error) {
    console.error("❌ Error submitting quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
