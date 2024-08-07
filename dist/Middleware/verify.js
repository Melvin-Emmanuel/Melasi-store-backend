"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getSession = req.headers["cookie"];
    if (!getSession) {
        return res.status(404).json({
            message: "please login to get token",
        });
    }
    const tokenCookies = yield getSession.split("=")[1];
    // console.log("melvin", tokenCookies);
    if (tokenCookies) {
        const tokens = yield tokenCookies;
        jsonwebtoken_1.default.verify(tokens, "variationofeventsisatrandom", (err, payload) => {
            if (err) {
                return res.status(404).json({ message: "token expire" });
            }
            req.user = payload;
            next();
        });
    }
    else {
        return res.status(404).json({
            message: "please provide a valid token",
        });
    }
});
exports.verifyToken = verifyToken;
