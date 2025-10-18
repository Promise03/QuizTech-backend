import httpStatus from "http-status";
import Quiz from "../../models/Quiz/quiz.js";

const getQuizstas = async (req, res) => {
  try {
    const TotalQuiz = await Quiz.countDocuments();

    const stas = await Quiz.aggregate([
      {
        $addFields: {
          quizdate: { $dateTrunc: { date: "$createdAt", unit: "day" } },
        },
      },
      {
        $group: {
          _id: "$quizdate",
          quizAdded: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(httpStatus.OK).json({
      status: "successful",
      message: "Quiz stats retrieved successfully",
      data: {
        totalQuiz: TotalQuiz,
        quizAddedPerDay: stas,
      },
    });
  } catch (error) {
    console.error("Error in getQuizstas:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

export default getQuizstas;
