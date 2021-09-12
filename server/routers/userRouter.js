import bcrypt from "bcryptjs";
import express from "express";
import User from "../db/userModel.js";

const router = express.Router();



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

    await Token.findOneAndUpdate(
      { userId: user._id },
      { isLogin: true },
      { new: true }
    );

    localStorage.setItem("user", JSON.stringify({ email, password }));

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, confrimPassword, firstName, lastName } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(400).json({
        message: "There is a user with this email",
      });

    if (password !== confrimPassword)
      return res.status(400).json({
        message: "Passwords do not match",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
    });

   localStorage.setItem("user", JSON.stringify({ email, hashedPassword }));

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

    localStorage.removeItem("user");
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
