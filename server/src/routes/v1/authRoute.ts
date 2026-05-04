import express from "express";
import authController from "../../controllers/authController";
import { validate } from "../../middlewares/validateMiddleware";
import { loginSchema, registerSchema } from "../../utils/validation";

const router = express.Router();

router.post("/register",
    validate(registerSchema),
    authController.register);

router.post("/login",
    validate(loginSchema),
    authController.login);

export default router;