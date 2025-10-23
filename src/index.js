import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { dbconnection } from './config/dbconnection.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import documentrouter from './routes/document.js';
import anayliticRoutes from './routes/anaylitics.js';
import otpRouter from './routes/otp.js';
import cors from 'cors'



dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

// Use routes
app.use("/api/analytics", anayliticRoutes);
app.use('/api', otpRouter)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/documents', documentrouter);

const PORT = process.env.PORT || 5000;
if (process.env.ENV === "devlopment"){
    app.use(morgan("dev"))
}

dbconnection()
.then(() =>{
    console.log("Database connected successfully!")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

.catch((err) => {
console.log(`An error occurd while connection to the databasee ${err}`)
})

export default app;

