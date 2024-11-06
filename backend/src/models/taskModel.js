import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence"


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    cost: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    order: {
        type: Number,
        unique: true
    }
},
{timestamps: true})

TaskSchema.plugin(mongooseSequence(mongoose), {inc_field: 'order'})

export const Task = mongoose.model("tasks", TaskSchema)