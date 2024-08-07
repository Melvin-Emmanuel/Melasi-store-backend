"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.route("/Create-User").post(UserController_1.CreateUser);
router.route("/verify-Account/:id").get(UserController_1.VerifyUser);
router.route("/Login-user").post(UserController_1.VerifyUser, UserController_1.LoginUser);
router.route("/LogoutUser").post(UserController_1.LogoutUser);
exports.default = router;
