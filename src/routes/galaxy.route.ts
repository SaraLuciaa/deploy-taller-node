// Create, FindAll, FindById, DeleteById, UpdateById
import express from "express";
import { galaxyController } from "../controllers/galaxy.controller";

export const router = express.Router();

router.get("/", galaxyController.getAll);
router.get("/:id", galaxyController.getOne);
router.post("/", galaxyController.create);
router.put("/:id", galaxyController.update);
router.delete("/:id", galaxyController.delete);