import User from "../../models/user/user.js";
import { loginSchema } from "../../validation/authvalidator.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  // ✅ ADD THIS LINE
  console.log('Backend Received Body:', req.body);
  try {
    // ✅ Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "Validation Error",
        message: error.details[0].message,
      });
    }

    // ✅ Collect login credentials
    const { email, password } = req.body;

    // ✅ Check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "login error",
        message: "No record found",
      });
    }

    // ✅ Compare password
    const isConfirmed = await ComparePassword(password, userExist.password);
    if (!isConfirmed) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Credential not correct",
      });
    }

    // ✅ Create real JWT token
    const token = jwt.sign(
      { sub: userExist._id.toString(), role: userExist.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    // ✅ Build safe user object (don’t leak hashed password!)
    const safeUser = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };

    // ✅ Send response
    return res.status(httpStatus.OK).json({
      status: "success",
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Error",
      message: error.message,
    });
  }
};

// ✅ Password comparison helper
async function ComparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export default login