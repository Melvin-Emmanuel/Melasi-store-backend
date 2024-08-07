"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controller/ProductController");
const verify_1 = require("../Middleware/verify");
// import { upload } from "../utils/Multer"
const router = express_1.default.Router();
router.route("/Create-Product").post(verify_1.verifyToken, ProductController_1.CreateProduct);
exports.default = router;
