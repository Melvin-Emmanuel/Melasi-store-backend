import express,{Request,Response} from "express"
import CategoryModel from "../Model/CategoryModel"
import UserModel from "../Model/UserModel"
import ProductModel from "../Model/ProductModel"
import cloudinary from "../utils/cloudinary"
import { Model, Types} from "mongoose"
import mongoose from "mongoose"
// import path from "path"

export const CreateProduct = async(req:any, res: Response): Promise<Response> => {
    try {
        // const { catID } = req.params
        const { Name, Image, Desc, Quantity, Price, Category } = req.body
        if (!Name||!Desc || !Quantity || !Price) {
            return res.status(401).json({
                message:"fields cannot be empty"
            })
        }
        // const getCat: any = await CategoryModel.findOne({_id:catID})
        // console.log(getCat)
        // if (!getCat) {
        //     return res.status(404).json({
        //         message:"This Category does not exist. you must crate category first"
        //     })
        // }
        console.log("hvjhvjh", req.file.path);
        const ImageURl = await cloudinary.uploader.upload(req.file.path);

        const createProduct = await ProductModel.create({
          Name,
          Image: ImageURl.secure_url,
          Desc,
          Quantity,
          Price,
          Category,
        });
        const checkproducts = await ProductModel.findOne({ Name: Name })
        
        if (checkproducts) {
            return res.status(401).json({
            message:"this Product already exists, update product or input different product Name"
            })
        }
           const getCatByName = await CategoryModel.findOne({
             Name: createProduct.Category
           })
           console.log("dhshsjs", getCatByName);
        const userId =   getCatByName?.User
        console.log("userId", userId)
        const LoggedInUser = req.User._id
        if (userId !== LoggedInUser) {
            return res.status(404).json({
                message:"currently logged in user not allowed to create products for this category"
            })
        }
        const checkUser = await UserModel.findOne({ _id: getCatByName?.User })
        console.log(checkUser)
      
    
        if (!checkUser) {
            return res.status(404).json({
                message: "Sign In to create Products",
                
            })
        }
     
        
     
        // getCatByName?.Products.push(createProduct._id)
         (getCatByName?.Products as Types.ObjectId[]).push(createProduct.id);
        await createProduct.save()
        await getCatByName?.save()
        return res.status(201).json({
            message: "Product created successfully",
            result:createProduct
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
const editProduct = async (req: any, res: Response): Promise<Response> => {
    

    try {
    

        const { Name, Desc, Quantity, Image } = req.body
         const ImageURl = await cloudinary.uploader.upload(req.file.path);
        const ProductId = req.params
        const UpdateProduct = ProductModel.findByIdAndUpdate(ProductId, { Name, Desc, Quantity, Image: ImageURl.secure_url })
        return res.status(201).json({
            message:"product updated"
        })
        

        
    
} catch (error:any) {
    return res.status(404).json({
        message:error.message
    })
    
}

}
// export const GetAllProducts = async (req:any,res:Response):Promise<Response> => {
//     try {
//         const UserID = req.User._id
//         const getCategoriesForLoggedInuser=
//     } catch (error) {
        
//     }
// }