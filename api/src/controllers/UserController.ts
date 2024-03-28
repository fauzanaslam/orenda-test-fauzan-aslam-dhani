import { Request, Response } from "express";
import User from "../db/models/User";
import jwt from "jsonwebtoken";
import "dotenv/config";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const name = req.body;

    let user = await User.findOne(name);
    user = new User(req.body);
    await user.save();

    return res.status(201).send({
      status: 200,
      message: "OK",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).send({
      status: 500,
      message: error.message,
      error: error,
    });
  }
};

const UserLogin = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(400).json({ message: "User belum terdaftar" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
      sameSite: "none",
    });

    res.status(200).json({ userId: user.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const userLogout = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.send("logout berhasil");
};

export default { Register, UserLogin, userLogout };
