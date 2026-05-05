import express from "express";
import protect from "../../middlewares/authMiddleware";
import userController from "../../controllers/userController";

const router = express.Router();

router.get("/fetch",
    protect,
    userController.getUser
);

router.patch("/update",
    protect,
    userController.update
);

router.get("/github/:username",
    userController.getRepos
);

export default router;