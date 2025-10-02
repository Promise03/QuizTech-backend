import { attempt, number, string } from "joi";
import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        require: true,
    },
    otpHash: {
        tpye: string,
        require: true,
    },
    expireAt: {
        type: Date,
        require: true,
    },
    used:{
        type: Boolean,
        default: false,
    },
    attempts: {
        type: number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
})

const Otptoken = mongoose.model("otpToken", otpTokenSchema);

export default Otptoken