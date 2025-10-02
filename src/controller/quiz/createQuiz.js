import Quiz from '../../models/Quiz/quiz.js';
import httpStatus from 'http-status';
import quizSchema from '../../validation/quizvalidator.js';

const createQuiz = async (req, res) => {
    try {
        const { error } = quizSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "Validation Error",
                message: error.details[0].message,
            });
        }

        // Correctly destructure the fields from the request body
        // to match the Joi and Mongoose schemas.
        const { catagories, questions, createdBy } = req.body;

        // Check if a quiz with the same catagories already exists.
        // The Mongoose schema specifies `catagories` as unique.
        const existingQuiz = await Quiz.findOne({
            catagories,
        });

        if (existingQuiz) {
            return res.status(httpStatus.CONFLICT).json({
                status: "Error",
                message: "A quiz for this catagory already exists."
            });
        }

        // Create the new quiz document
        const createdQuiz = await Quiz.create({
            catagories,
            questions,
            createdBy,
        });

        return res.status(httpStatus.CREATED).json({
            status: "Success",
            message: "Quiz created successfully",
            quiz: createdQuiz,
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: "An error occurred while creating the quiz",
            error: e.message,
        });
    }
};

export { createQuiz };




// // @desc    Get all quizzes
// // @route   GET /api/quizzes
// // @access  Public
// const getQuizzes = async (req, res) => {
//     try {
//         const quizzes = await Quiz.find().populate('createdBy', 'name');
//         res.json(quizzes);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// // @desc    Get a single quiz
// // @route   GET /api/quizzes/:id
// // @access  Public
// const getQuiz = async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { createQuiz, getQuizzes, getQuiz };