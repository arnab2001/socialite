import express, { Router } from "express";
import {getFeedPosts, getUserPosts, likePost , commentPost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comment", verifyToken, commentPost);

export default router;