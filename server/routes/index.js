import { Router } from "express";
import isAuthenticated from "../middleware/auth";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", isAuthenticated, userRoutes);

export default router;