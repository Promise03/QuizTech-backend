import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
export default generateToken