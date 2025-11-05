import mongoose from "mongoose";

const SubcribeSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
)


export default mongoose.model("Subcribe", SubcribeSchema)