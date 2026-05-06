import express from "express";
import protect from "../../middlewares/authMiddleware";
import projectController from "../../controllers/projectController";
import { validate } from "../../middlewares/validateMiddleware";
import { projectSchema } from "../../utils/validation";

const router = express.Router();

router.post("/create",    
    protect,
    validate(projectSchema),
    projectController.create
);

router.get('/myProjects',
    protect,
    projectController.getUserProjects
)

export default router;