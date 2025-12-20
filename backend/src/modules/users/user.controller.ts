// controllers/user.controller.ts
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import User from "../users/user.model";
import mongoose from "mongoose";


export const getUsers = async (req: AuthRequest, res: Response) => {
  const { q } = req.query;
  const { id: userId } = req.user;

  const query: any = {};
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { _id: { $regex: q, $options: "i" } },
    ];
  }

  try {
    const users = await User.find(query)
      .select("_id name email")
      .sort({ name: 1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};


export const getUsersByIds = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({ message: "IDs are required" });
    }

    const idArray = (ids as string).split(",");

    const validIds = idArray.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    const users = await User.find({
      _id: { $in: validIds },
    })
      .select("_id name email")
      .sort({ name: 1 });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
