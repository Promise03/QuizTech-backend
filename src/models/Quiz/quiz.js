import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    categories: {
        type: String,
        required: true,
        unique: true
    },
      category: { 
        type: String, 
        enum: ["Frontend", "Backend"], 
        required: true 
    },
        difficulty: { 
            type: String, 
            enum: ["Easy", "Intermediate", "Advanced"], 
            required: true 
        },
    // description: {
    //     type: String,
    //     required: true
    // },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        correctAnswer: {
            type: String,
            required: true
        },
        explanation: { type: String } 
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;