import express from "express";
import {
  deleteUser,
  getProfilePost,
  getUser,
  getUsers,
  savePost,
  updateUser,
} from "../controllers/user.controller.js";
const router = express.Router();
import { verifyToken } from "../middleware/verifyToken.js";

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profilePosts", verifyToken, getProfilePost);

export default router;
