import Document from '../../models/document/document.js';
import httpStatus from 'http-status';
import { documentSchema } from '../../validation/documentvalidator.js';

// Create new document
export const createDocument = async (req, res) => {
    try {
        // 🚨 FIX 1: Check if the request body is empty. 
        // This is a safety check if the JSON parsing somehow yields an empty object.
        if (Object.keys(req.body).length === 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "Validation Error",
                message: "Request body cannot be empty. Missing document data."
            });
        }
        
        // Joi validation
        // 🚨 FIX 2: Ensure you are using the correct field name 'category'
        const {error} = documentSchema.validate(req.body); 
        
        if(error){
            return res.status(httpStatus.BAD_REQUEST).json({
                status: "Validation Error",
                message: error.details[0].message
            })
        }

        // 🚨 FIX 3: Destructure 'category' instead of 'categories'
        const { title, summary, category, link, videoUrl, quizId } = req.body; 

        const exists = await Document.findOne({ title });
        if (exists) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ message: 'Document with this title already exists' });
        }

        const document = await Document.create({
            title,
            summary,
            // 🚨 FIX 4: Use 'category' in the database save
            category, 
            link,
            videoUrl,
            quizId,
        });

        res.status(httpStatus.CREATED).json(document);
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating document:", error); 
        res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Server error', error: error.message });
    }
};