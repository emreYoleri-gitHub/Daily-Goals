import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
});
