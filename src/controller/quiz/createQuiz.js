import Quiz from '../../models/Quiz/quiz.js';
import httpStatus from 'http-status';
import quizSchema from '../../validation/quizvalidator.js';

const createQuiz = async (req, res) => {
    try {
        // 1. Validation check using Joi (quizSchema)
        const { error } = quizSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "Validation Error",
                message: error.details[0].message,
            });
        }

        // 2. Correctly destructure ALL fields required by the final Mongoose schema
        const { 
            topic, 
            difficulty, 
            techStack, 
            questions, 
            createdBy 
        } = req.body;

        // --- REMOVED THE CHECK FOR `catagories` ---
        // Your final schema does not have a unique field like 'categories'.
        // If you need to enforce uniqueness (e.g., uniqueness of a combination of topic/difficulty/techStack),
        // you would add that logic here. Since it's not in the schema, this check is removed.

        // 3. Create the new quiz document with ALL required fields
        const createdQuiz = await Quiz.create({
            topic,      // Required: e.g., "Frontend"
            difficulty, // Required: e.g., "Intermediate"
            techStack,
            questions,
            createdBy,
        });

        return res.status(httpStatus.CREATED).json({
            status: "Success",
            message: "Quiz created successfully",
            quiz: createdQuiz,
        });
    } catch (e) {
        // Log the full error for better debugging
        console.error("Error creating quiz:", e); 
        
        // Handle internal server errors
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: "An error occurred while creating the quiz",
            error: e.message,
        });
    }
};

export { createQuiz };

// (The commented-out getQuizzes and getQuiz functions remain unchanged and are functionally correct)