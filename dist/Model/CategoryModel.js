"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
    },
    Parent: {
        type: String,
    },
    Slug: {
        type: String,
    },
    Products: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "products",
        },
    ],
    User: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Categories", CategorySchema);
