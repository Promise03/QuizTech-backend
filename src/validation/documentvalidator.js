import Joi from "joi";

// 💡 IMPORTANT: Keep this list synchronized with the 'techStack' enum in your Quiz Mongoose Model
const TECH_STACKS = [
    "Frontend", "Backend", "Cyber Security", "Data Science", 
    "DevOps", "Mobile Development", "Cloud Computing", 
    "AI/Machine Learning", "FullStack", "Data Analysis"
];

/**
 * Joi schema for validating the Document creation/update data.
 */
export const documentSchema = Joi.object({
    // --- REQUIRED FIELDS ---
    title: Joi.string().trim().required().messages({
        'string.empty': 'Title is required.',
        'any.required': 'Title is required.'
    }),
    summary: Joi.string().trim().required().messages({
        'string.empty': 'Summary is required.',
        'any.required': 'Summary is required.'
    }),
    // Category must be one of the defined tech stacks
    category: Joi.string().valid(...TECH_STACKS).required().messages({ 
        'any.required': 'Category is required.',
        'any.only': 'Invalid category selected.'
    }),
    // Link must be a valid URL
    link: Joi.string().uri().required().messages({ 
        'string.empty': 'Document link is required.',
        'string.uri': 'Link must be a valid URL.',
        'any.required': 'Document link is required.'
    }),
    // videoUrl must be a valid URL
    videoUrl: Joi.string().uri().required().messages({
        'string.empty': 'Video URL is required.',
        'string.uri': 'Video URL must be a valid URL.',
        'any.required': 'Video URL is required.'
    }),

    // --- OPTIONAL FIELDS ---
    // quizId is optional and must be a valid 24-character hexadecimal MongoDB ObjectId string
    quizId: Joi.string().hex().length(24).optional().allow(null) 
});