import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
            trim: true
        },
        status:{
            type: String,
            enum:["active","completed"],
            default: "active"
        },
        completedAt:{
            type: Date,
            default: null
        }
    },
    {
        timestamps: true // createAt và updateAt sẽ tự động thêm vào
    }
);
const Task=mongoose.model("Task",taskSchema);
export default Task;