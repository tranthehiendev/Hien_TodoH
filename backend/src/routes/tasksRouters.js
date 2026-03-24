import express from "express";
import { createTask, getAllTask, updateTask, deleteTask } from "../controllers/tasksControllers.js"
const router = express.Router();
// post ~ create
router.post("/", createTask);
// get ~ read
router.get("/", getAllTask);
// put ~ update
router.put("/:id", updateTask);
//delete ~ delete
router.delete("/:id", deleteTask);
export default router;