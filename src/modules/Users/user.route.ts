import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();

// create user
router.post("/", userController.createUser);

// get all user
router.get("/", userController.getAllUser);

// get single User
router.get("/:id", userController.getSingleUser);

// update user with id
router.put("/:id", userController.updateUserData);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
