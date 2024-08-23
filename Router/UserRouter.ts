import express from "express";
import { CreateUser, VerifyUser,LoginUser,LogoutUser } from "../controller/UserController";
const router = express.Router()
router.route("/Create-User").post(CreateUser)
router.route("/verify-Account/:id").get(VerifyUser)
router.route("/Login-user").post(LoginUser)
router.route("/LogoutUser").post(LogoutUser)

export default router