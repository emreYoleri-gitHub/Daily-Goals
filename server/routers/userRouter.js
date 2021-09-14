import bcrypt from "bcryptjs";
import express from "express";
import User from "../db/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

    res.json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Wrong password",
      });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({
        message: "There is a user with this email",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/signout/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findOneAndUpdate(
      {
        userID: id,
      },
      { isLogin: false },
      { new: true }
    );

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
