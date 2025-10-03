import mongoose from 'mongoose'
// import quizSchema from '../../validation/quizvalidator.js';

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
        categories: {
        type: String,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        required: true,
    },
        videoUrl: {
            type: String,
            required: true,
        },
    
    // questions: quizSchema
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;