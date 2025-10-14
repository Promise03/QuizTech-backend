import Quiz from "../../models/Quiz/quiz.js";
import httpStatus from 'http-status';

export const getQuizbyTopic = async (req, res) => {
    try {
        const topic = req.params.topic;
        if(!topic){
                  return res.status(httpStatus.BAD_REQUEST).json({
                    status: "",
                    message: "",
            })
        }
      
        const quiz = await Quiz.findOne({
          topic
        }).populate('createdBy', 'name'); // Populate the creator's name

        // 3. Handle the result
        if (quiz) {
            return res.status(httpStatus.OK).json({
                status: "success",
                quizData: quiz // Note: returning a single object, not an array
            });
        } else {
            return res.status(httpStatus.NOT_FOUND).json({
                status: "error",
                message: `No quiz found for tech stack: ${topic}`
            });
        }
    } catch (error) {
        console.error("Error fetching quiz by tech stack:", error); 
        
        // 4. Handle internal server errors
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 
            message: 'Server error while fetching quiz.' 
        });
    }
}