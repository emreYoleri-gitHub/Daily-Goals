import express from "express";
import Goal from "../db/goalModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { _id, startDay, timeOfProgram, goals, goalStatus } = req.body;



        const goal = await Goal.create({
            _id,
            startDay,
            timeOfProgram,
            goals,
            goalStatus
        });


        res.status(200).json(goal);
    } catch (error) {
        res.json({ error: message.error })
    }
})

export default router;
