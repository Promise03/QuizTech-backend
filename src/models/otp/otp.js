import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    otpHash: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
    used:{
        type: Boolean,
        default: false,
    },
    attempts: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

const Otptoken = mongoose.model("otpToken", otpTokenSchema);

export default Otptoken