import express from "express";
import { galaxyController } from "../controllers/galaxy.controller";
import { authMiddleware, checkRole } from "../middlewares";
import { galaxyOwnerOrAdmin } from "../middlewares/galaxy.middleware";

export const router = express.Router();
router.get("/user/:userId", authMiddleware, galaxyController.getByUser);
router.get("/", authMiddleware, galaxyController.getAll);
router.get("/:id", authMiddleware, galaxyController.getOne);
router.post("/", authMiddleware, galaxyController.create);
router.put("/:id", authMiddleware, galaxyOwnerOrAdmin, galaxyController.update);
router.delete("/:id", authMiddleware, galaxyOwnerOrAdmin, galaxyController.delete);