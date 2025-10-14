import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  
    // This 'topic' field now serves as your primary, coarse-grained filter/category
     techStack: { 
        type: String, 
        required: true,
        // 🚀 Updated enum to serve as the main high-level categories
        enum: ["Frontend", "Backend", "Cyber Security", "Data Science", "DevOps", "Mobile Development", "Cloud Computing", "AI/Machine Learning", "FullStack", "Data Analysis" ], 
    },
    
    // 'techStack' provides additional detail and allows for multiple tags
   topic: { 
        type: [String], // Allows multiple tech stacks (e.g., ['React', 'Node.js', 'AWS'])
        required: false, // Optional
        default: []
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
            required: true,
        },
        options: [{
            type: String,
            required: true,
        }],
        correctAnswer: {
            type: String,
            required: true,
        },
        explanation: { type: String } 
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;