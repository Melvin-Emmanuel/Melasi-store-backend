"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../Middleware/verify");
const CategoryController_1 = require("../controller/CategoryController");
const router = express_1.default.Router();
router.route("/create-Category").post(verify_1.verifyToken, CategoryController_1.CreateCategory);
router.route("/get-All-user").post(CategoryController_1.CreateCategory);
router.route("Update-Category").post(verify_1.verifyToken, CategoryController_1.updateCategory);
router.route("Delete-Category").post(verify_1.verifyToken, CategoryController_1.DeletCategory);
exports.default = router;
