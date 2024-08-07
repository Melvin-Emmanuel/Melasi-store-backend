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
exports.CreateProduct = void 0;
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const ProductModel_1 = __importDefault(require("../Model/ProductModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
// import path from "path"
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { catID } = req.params
        const { Name, Image, Desc, Quantity, Price, Category } = req.body;
        if (!Name || !Desc || !Quantity || !Price) {
            return res.status(401).json({
                message: "fields cannot be empty"
            });
        }
        // const getCat: any = await CategoryModel.findOne({_id:catID})
        // console.log(getCat)
        // if (!getCat) {
        //     return res.status(404).json({
        //         message:"This Category does not exist. you must crate category first"
        //     })
        // }
        console.log("hvjhvjh", req.file.path);
        const ImageURl = yield cloudinary_1.default.uploader.upload(req.file.path);
        const createProduct = yield ProductModel_1.default.create({
            Name,
            Image: ImageURl.secure_url,
            Desc,
            Quantity,
            Price,
            Category,
        });
        const checkproducts = yield ProductModel_1.default.findOne({ Name: Name });
        if (checkproducts) {
            return res.status(401).json({
                message: "this Product already exists, update product or input different product Name"
            });
        }
        const getCatByName = yield CategoryModel_1.default.findOne({
            Name: createProduct.Category
        });
        console.log("dhshsjs", getCatByName);
        const userId = getCatByName === null || getCatByName === void 0 ? void 0 : getCatByName.User;
        console.log("userId", userId);
        const LoggedInUser = req.User._id;
        if (userId !== LoggedInUser) {
            return res.status(404).json({
                message: "currently logged in user not allowed to create products for this category"
            });
        }
        const checkUser = yield UserModel_1.default.findOne({ _id: getCatByName === null || getCatByName === void 0 ? void 0 : getCatByName.User });
        console.log(checkUser);
        if (!checkUser) {
            return res.status(404).json({
                message: "Sign In to create Products",
            });
        }
        // getCatByName?.Products.push(createProduct._id)
        (getCatByName === null || getCatByName === void 0 ? void 0 : getCatByName.Products).push(createProduct.id);
        yield createProduct.save();
        yield (getCatByName === null || getCatByName === void 0 ? void 0 : getCatByName.save());
        return res.status(201).json({
            message: "Product created successfully",
            result: createProduct
        });
    }
    catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
});
exports.CreateProduct = CreateProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Desc, Quantity, Image } = req.body;
        const ImageURl = yield cloudinary_1.default.uploader.upload(req.file.path);
        const ProductId = req.params;
        const UpdateProduct = ProductModel_1.default.findByIdAndUpdate(ProductId, { Name, Desc, Quantity, Image: ImageURl.secure_url });
        return res.status(201).json({
            message: "product updated"
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
});
// export const GetAllProducts = async (req:any,res:Response):Promise<Response> => {
//     try {
//         const UserID = req.User._id
//         const getCategoriesForLoggedInuser=
//     } catch (error) {
//     }
// }
