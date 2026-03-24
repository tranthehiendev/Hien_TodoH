import express from "express";
import tasksRouter from './routes/tasksRouters.js';
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const PORT= process.env.PORT || 5001

const app = express();

app.use(express.json());

//Middlewares
app.use(cors({origin:"http://localhost:5173"}));

app.use("/api/tasks", tasksRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server bắt đầu trên cổng ${PORT}`);
    });
});

