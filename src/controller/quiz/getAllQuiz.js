import Quiz from "../../models/Quiz/quiz.js";
import httpStatus from "http-status";


export const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'name');
       if(quizzes){
        return res.status(httpStatus.OK).json({
            status: "success",
            quizData: quizzes
        })
       }else{
        return res.status(httpStatus.NOT_FOUND).json({
            status: "error",
            message: "No quiz(s) found!"
        })
       }
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
    }
};