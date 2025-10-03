import express from "express";
import { verifyOtp } from "../controller/auth/verifyOtp.js";

const router = express.Router();

router.post("/vrify-otp", verifyOtp)

export default router