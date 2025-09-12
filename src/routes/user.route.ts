import express, { Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import { userValidations } from "../validation";

export const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userValidations.id, userController.getOne);
router.put("/:id", userValidations.id, userValidations.update, userController.update);
router.post("/", userValidations.create, userController.create);
router.delete("/:id", userValidations.id, userController.delete);