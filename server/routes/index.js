import { Router } from "express";
import isAuthenticated from "../middleware/auth.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", isAuthenticated, userRoutes);

export default router;
