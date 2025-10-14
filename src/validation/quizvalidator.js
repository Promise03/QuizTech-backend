import Joi from "joi";

const questionSchema = Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(Joi.string().required()).required(),
    correctAnswer: Joi.string().required(),
    explanation: Joi.string()
});

const quizSchema = Joi.object({
    topic: Joi.string().required(),
    techStack: Joi.string().required(),
    difficulty: Joi.string().required(),
    questions: Joi.array().items(questionSchema).required(),
    createdBy: Joi.string().required(), // Assuming createdBy is a string ID from the request
});

export default quizSchema;