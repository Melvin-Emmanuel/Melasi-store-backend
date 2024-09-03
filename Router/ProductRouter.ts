
import express from "express"
import { CreateProduct, GetAllProducts } from "../controller/ProductController"
import { verifyToken } from "../Middleware/verify"
// import { upload } from "../utils/Multer"
const router = express.Router()


router.route("/Create-Product").post(verifyToken,CreateProduct)
router.route("/Get-All-Products").get(GetAllProducts);

export default router
