import QuizAttempt from "../../models/Quiz/totascore.js"

export const getUserDashboardStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // All attempts by this user
    const attempts = await QuizAttempt.find({ user: userId }).sort({ createdAt: -1 });

    // Aggregate stats
    const totalQuizzes = attempts.length;
    const highScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
    const totalPoints = attempts.reduce((sum, a) => sum + a.score, 0);
    const recentQuizzes = attempts.slice(0, 3); // top 3 latest attempts

    res.json({
      success: true,
      totalQuizzes,
      highScore,
      totalPoints,
      recentQuizzes,
    });
  } catch (error) {
    console.error("Error fetching user dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user dashboard stats",
      error: error.message,
    });
  }
};
