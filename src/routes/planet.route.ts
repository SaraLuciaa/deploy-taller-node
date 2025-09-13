import express from "express";
import { planetController } from "../controllers";

export const router = express.Router();

router.get("/galaxy/:galaxyId", planetController.getByGalaxyId);
router.get("/:id", planetController.getOne);
router.post("/", planetController.create);
router.put("/:id", planetController.update);
router.delete("/:id", planetController.delete);