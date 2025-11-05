import Contact from "../../models/user/Contact";
import httpStatus from "http-status"

export const SendContactMessage = async ( req, res) =>{
    try {
        const {name, email, message}= req.body
        if(!name || !email || !message ){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: "Error",
                message: "All fields are require"
            })
    
        }

        const newMessage = new Contact({name, email, message});
        await newMessage.save();

        return res.status(httpStatus.OK).json({
            status: "success",
            message: "Messade received successfully!"
        })
    } catch (error) {
        console.log("contact message error:", error)
    }
};