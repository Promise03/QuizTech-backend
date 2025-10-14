import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { registerSchema } from "../../validation/authvalidator.js";
import User from "../../models/user/user.js";

const registerUser = async (req, res) => {
  console.log("Backend Received Body:", req.body);

  // TEMPORARY test trigger
  if (req.body.name === "TEST_ERROR") {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Forced test error to check frontend message display.",
    });
  }

  try {
    // Validate input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, username, password, email, role } = req.body;

    // Check existing email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // Check existing username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Username already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const createdUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });

    console.log("✅ SUCCESS PATH HIT. User ID:", createdUser._id);

    // ✅ Return consistent data format
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while registering user.",
      error: error.message,
    });
  }
};

export default registerUser;
