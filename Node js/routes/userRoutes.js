import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", registerUser);
router.post("/loginUser", loginUser);
router.get("/users", getUsers);
router.get("/getUsers/:id", getUserById);
router.put("/updateUsers/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;