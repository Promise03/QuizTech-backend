import User from "../../models/user/user.js";
import generateToken from "../../utils/generateToken.js";
import httpStatus from 'http-status'
import { loginSchema } from "../../validation/authvalidator.js";
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
           // ✅ Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(httpStatus.NOT_FOUND).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Server error' });
    }
};


export default login