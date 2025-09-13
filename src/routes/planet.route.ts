import express from "express";
import { planetController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { galaxyOwnerOrAdmin } from "../middlewares/galaxy.middleware";
import { planetOwnerOrAdmin } from "../middlewares/planet.middleware";

export const router = express.Router();

router.get("/galaxy/:galaxyId", authMiddleware, planetController.getByGalaxyId);
router.get("/user/:userId", authMiddleware, planetController.getByUser);
router.get("/:id", authMiddleware, planetController.getOne);
router.post("/", authMiddleware, planetController.create);
router.put("/:id", authMiddleware, planetOwnerOrAdmin, planetController.update);
router.delete("/:id", authMiddleware, planetOwnerOrAdmin, planetController.delete);