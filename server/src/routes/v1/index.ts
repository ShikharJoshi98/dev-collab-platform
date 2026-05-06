import express from "express";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import projectRoutes from "./projectRoute";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);

export default router;