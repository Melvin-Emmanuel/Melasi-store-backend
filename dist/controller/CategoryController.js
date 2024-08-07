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
exports.getSingleCategory = exports.GetAllCategory = exports.DeletCategory = exports.updateCategory = exports.CreateCategory = void 0;
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const slugify_1 = __importDefault(require("slugify"));
const CreateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Parent } = req.body;
        const userID = req.user._id;
        function generateCategoryId() {
            const characters = "ABCDEFGHIJKLMNOPRSTUabcdefghijklmnop";
            const length = 6;
            let randomId = "";
            for (let i = 0; i < length; i++) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return randomId;
        }
        const checkCategory = yield CategoryModel_1.default.findOne({ Name: Name });
        if (checkCategory) {
            if (checkCategory.User.toString() === userID) {
                return res.status(401).json({
                    message: "this category already exists for this user",
                });
            }
        }
        if (!Name) {
            return res.status(400).json({
                message: "name cannot be empty",
            });
        }
        const checkUser = yield UserModel_1.default.findOne({ _id: userID });
        if (!checkUser) {
            return res.status(401).json({
                message: "user does not exist",
            });
        }
        if (checkUser.role == "User") {
            return res.status(401).json({
                message: "user cannot create category"
            });
        }
        console.log(checkUser, "this is user info");
        const CatData = yield CategoryModel_1.default.create({
            Name,
            Parent,
            Slug: `${(0, slugify_1.default)(Name)}-${generateCategoryId()}`,
        });
        //    CatData.Products=[]
        CatData.User = userID;
        yield CatData.save();
        return res.status(201).json({
            message: "Category Created successfully",
            result: CatData
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
});
exports.CreateCategory = CreateCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.user._id;
        const { Name, NewName } = req.body;
        const checkCategory = yield CategoryModel_1.default.findOne({ Name: Name, User: userID });
        if (!checkCategory) {
            return res.status(404).json({
                message: "Category not found for this user",
            });
        }
        checkCategory.Name = NewName || checkCategory.Name;
        yield checkCategory.save();
        return res.status(200).json({
            message: "updated category successfully"
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.updateCategory = updateCategory;
const DeletCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catID } = req.body;
        const data = yield CategoryModel_1.default.findByIdAndDelete(catID);
        return res.status(200).json({
            message: "Category has been deleted successfully",
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.DeletCategory = DeletCategory;
const GetAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = req.User._id;
        const getUser = yield UserModel_1.default.findOne({ _id: UserID });
        const getCat = yield CategoryModel_1.default.find({ User: getUser === null || getUser === void 0 ? void 0 : getUser._id });
        return res.status(401).json({
            message: "category gotten",
            result: getCat
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.GetAllCategory = GetAllCategory;
const getSingleCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { catID } = req.params;
    const data = CategoryModel_1.default.findOne({ _id: catID }).populate({
        path: "User",
        select: "FullName"
    });
    return res.status(200).json({
        message: "single Category gotten",
        result: data
    });
});
exports.getSingleCategory = getSingleCategory;
