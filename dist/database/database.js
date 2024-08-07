"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const localUrl = "mongodb://0.0.0.0:27017/Melasi-stores";
const db = mongoose_1.default.connect(localUrl).then(() => {
    console.log("A connection has been made");
}).catch((error) => {
    console.log(error, "there was an error in database connection");
});
exports.default = db;
