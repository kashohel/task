import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tasksRouter from './routes/task.js';


dotenv.config({path: './.env'});


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Health check
app.get('/', (_req, res) => {
res.json({ ok: true, message: 'TaskFlow API is running' });
});


// Routes
app.use('/tasks', tasksRouter);


// Mongo connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskasses';


mongoose.connect(MONGODB_URI).then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost${PORT == 80 ? '' : ':'+PORT}`));
})
.catch((err) => {
console.error('Mongo connection error:', err.message);
process.exit(1);
});