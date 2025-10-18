import mongoose from 'mongoose';

// 💡 Ensure this list is kept in sync with the Quiz model's techStack enum
const TECH_STACKS = [
    "Frontend", "Backend", "Cyber Security", "Data Science", 
    "DevOps", "Mobile Development", "Cloud Computing", 
    "AI/Machine Learning", "FullStack", "Data Analysis"
];

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
    // 🔗 Updated category enum to match the Quiz model's techStack
    category: { 
        type: String,
        required: true,
        enum: TECH_STACKS,
    },
    link: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    // 💡 BEST PRACTICE: Use a reference to the Quiz model instead of embedding
    // This allows you to easily find the associated quiz without duplicating data.
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // 'Quiz' is the name of the model you exported
        required: false, // Make it optional if not every document has a quiz
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;