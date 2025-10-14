import Quiz from "../../models/Quiz/quiz.js";
import httpStatus from "http-status";

// function to deleteQuiz
export const deleteQuiz = async (req, res) => {
    try{
        // 1. Get the ID from the request parameter
        const { id } = req.params;

        // 2. Find and delete the Quiz in one operation
        // This returns the deleted document, or null if not found.
        const deletedQuiz = await Quiz.findByIdAndDelete(id);

        // 3. Check if a quiz was actually deleted (i.e., if it was found)
        if (!deletedQuiz){
            // ❌ FIX: Use httpStatus.NOT_FOUND (404) and ensure message refers to Quiz
            return res.status(httpStatus.NOT_FOUND).json({
                status: "Not found",
                message: `Quiz with id ${id} not found` // Corrected message
            });
        }

        // 4. Success response
        return res.status(httpStatus.OK).json({
            status: "successful",
            message: `Quiz with id: ${id} deleted successfully!`
        });

    }catch(e){
        // ❌ FIX: Ensure httpStatus is used correctly in the error response
        console.error("Quiz Deletion Error:", e.message); 
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "An error occurred while deleting the Quiz",
            error: e.message,
        });
    }
};