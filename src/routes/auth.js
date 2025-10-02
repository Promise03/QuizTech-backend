import express from 'express'
import login from '../controller/auth/login.js';
import registerUser from '../controller/auth/register.js';
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', login);
// router.post('/logout', logout);

export default router