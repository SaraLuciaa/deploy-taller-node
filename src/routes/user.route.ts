import express, { Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import { userValidations } from "../validation";
import { UserRole } from "../interfaces";
import { authMiddleware, checkRole } from "../middlewares";

export const router = express.Router();

router.get("/", authMiddleware,userController.getAll);
router.get("/:id", authMiddleware,userValidations.id, userController.getOne);
router.post("/", userValidations.create, userController.create);
router.put("/:id", authMiddleware, checkRole(UserRole.ADMIN),userValidations.id, userValidations.update, userController.update);
router.delete("/:id", authMiddleware, checkRole(UserRole.ADMIN),userValidations.id, userController.delete);