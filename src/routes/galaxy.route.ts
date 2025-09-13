import express from "express";
import { galaxyController } from "../controllers/galaxy.controller";
import { authMiddleware, checkRole } from "../middlewares";
import { galaxyOwnerOrAdmin } from "../middlewares/galaxy.middleware";
import { UserRole } from "../interfaces";
import { userOwnerOrAdmin } from "../middlewares/userOwnerOrAdmin.middleware";

export const router = express.Router();
router.get("/user/:userId", authMiddleware, userOwnerOrAdmin, galaxyController.getByUser);
router.get("/", authMiddleware, checkRole(UserRole.ADMIN), galaxyController.getAll);
router.get("/:id", authMiddleware, galaxyOwnerOrAdmin, galaxyController.getOne);
router.post("/", authMiddleware, galaxyController.create);
router.put("/:id", authMiddleware, galaxyOwnerOrAdmin, galaxyController.update);
router.delete("/:id", authMiddleware, galaxyOwnerOrAdmin, galaxyController.delete);