import mongoose from "mongoose";

const goalSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    startDay: {
        type: Date,
        required: true,
    },
    timeOfProgram: {
        type: Number,
        required: true
    },
    goals: [String],
    goalStatus: [{
        day: Number,
        completedId: [String],
        success: Number
    }]

});

const Goal = mongoose.model("goal", goalSchema);

export default Goal;
