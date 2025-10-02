import express from "express";
import { verifyOtp } from "../controller/auth/verifyOtp";

const router = express.Route();

router.post("/vrify-otp", verifyOtp)

export default router