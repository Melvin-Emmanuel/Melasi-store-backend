import { Request, Response } from "express"
import CategoryModel from "../Model/CategoryModel"
import UserModel from "../Model/UserModel"
import slugify from "slugify"

export const CreateCategory = async (req:any, res: Response):Promise<Response> => {
 try {
     const { Name,Parent } = req.body;
   const userID = req.user._id;
   
       function generateCategoryId() {
         const characters = "ABCDEFGHIJKLMNOPRSTUabcdefghijklmnop";
         const length = 6;
         let randomId = "";
         for (let i = 0; i < length; i++) {
           randomId += characters.charAt(
             Math.floor(Math.random() * characters.length)
           );
         }
         return randomId;
     }
       const checkCategory = await CategoryModel.findOne({ Name: Name }); 
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
  
     
     
     
       const checkUser = await  UserModel.findOne({ _id: userID });
     
       if (!checkUser) {
         return res.status(401).json({
           message: "user does not exist",
         });
   }
   if (checkUser.role == "User") {
     return res.status(401).json({
       message:"user cannot create category"
     })
   }
   console.log(checkUser,"this is user info")
       const CatData = await CategoryModel.create({
         Name,
         Parent,
         Slug: `${slugify(Name)}-${generateCategoryId()}`,
       });
    //    CatData.Products=[]
      CatData.User = userID
     await  CatData.save();
     
    
     return res.status(201).json({
         message: "Category Created successfully",
         result:CatData
    })
 } catch (error:any) {
     return res.status(401).json({
        message:error.message,
    })
 }
}

export const updateCategory = async (req: any, res: Response): Promise<Response>=> {
    try {
   
      const userID = req.user._id;
      const { Name,NewName } = req.body
      const checkCategory = await CategoryModel.findOne({Name:Name,User:userID})
       if (!checkCategory) {
         return res.status(404).json({
           message: "Category not found for this user",
         });
       }

     
       checkCategory.Name = NewName || checkCategory.Name;


       await checkCategory.save();
        return res.status(200).json({
            message:"updated category successfully"
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
export const DeletCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { catID } = req.body
        const data=await CategoryModel.findByIdAndDelete(catID)
        return res.status(200).json({
            message:"Category has been deleted successfully",
          
        })
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
    
}
export const GetAllCategory = async (req: any, res: Response): Promise<Response> => {
    try {
        const  UserID  = req.User._id
        const getUser=await UserModel.findOne({_id:UserID})
        const getCat = await CategoryModel.find({ User: getUser?._id });
        return res.status(401).json({
            message: "category gotten",
            result:getCat
        })
      
    } catch (error:any) {
        return res.status(401).json({
            message:error.message
        })
    }
}
export const getSingleCategory = async (req: Request, res: Response): Promise<Response> => {
    const { catID } = req.params

    
  
    const data = CategoryModel.findOne({ _id: catID }).populate({
        path: "User",
        select: "FullName"
        
    })
    return res.status(200).json({
        message: "single Category gotten",
        result: data
    })
}