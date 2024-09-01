import express from "express";
import { verifyToken } from "../Middleware/verify";
import {
  CreateCategory,
  updateCategory,
  DeletCategory,
  GetAllCategory,
} from "../controller/CategoryController";

const router = express.Router();
router.route("/create-Category").post(CreateCategory);
// router.route("/get-All-user").post(CreateCategory);
router.route("Update-Category").post(verifyToken, updateCategory);
router.route("Delete-Category").post(verifyToken, DeletCategory);
router.route("Get-All-Categories").get(verifyToken, GetAllCategory);
export default router;
