import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import goalRouter from "./routers/goalRouter.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/users", userRouter);
app.use("/goals", goalRouter);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
