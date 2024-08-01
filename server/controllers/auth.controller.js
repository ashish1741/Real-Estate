import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // verfiying placeholder
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user on DB
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      message: "User Register Successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "please provide required field",
    });
  }

  try {
    //check user exist

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials !",
      });
    }

    //check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        message: "Invalid Credentials !",
      });
    }

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin :  false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { ...userInfo} =  user

    //generate COOKIE Tokn and send to the user
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({
        userInfo
      });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message:"Logout Sucessfully"
  })
};
