import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["Admin", "student", "admin", "Student"],
        default: "student", 
    },
    quizzesTaken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
});

const User = mongoose.model('User', userSchema);
export default User;