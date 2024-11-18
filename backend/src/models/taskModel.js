import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence"


const TaskSchema = new mongoose.Schema({
    _id: Number,
    
    name: {
        type: String,
        required: true,
        unique:true
    },
    cost: {
        type: String,
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
TaskSchema.plugin(mongooseSequence(mongoose), {inc_field: '_id'})

export const Task = mongoose.model("tasks", TaskSchema)
