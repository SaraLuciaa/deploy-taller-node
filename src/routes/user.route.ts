import express, { Request, Response } from "express";
import { userController } from "../controllers/user.controller";
import { userValidations } from "../validation";
import { UserRole } from "../interfaces";
import { authMiddleware, checkRole } from "../middlewares";

export const router = express.Router();
router.get("/profile", authMiddleware, userController.profile);
router.get("/", authMiddleware, checkRole(UserRole.ADMIN), userController.getAll);
router.get("/:id", authMiddleware, checkRole(UserRole.ADMIN), userValidations.id, userController.getOne);
router.post("/", authMiddleware, checkRole(UserRole.ADMIN), userValidations.create, userController.create);
router.put("/:id", authMiddleware, checkRole(UserRole.ADMIN), userValidations.id, userValidations.update, userController.update);
router.delete("/:id", authMiddleware, checkRole(UserRole.ADMIN), userValidations.id, userController.delete);