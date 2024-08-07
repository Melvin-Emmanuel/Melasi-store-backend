
import express from "express"
import { CreateProduct } from "../controller/ProductController"
import { verifyToken } from "../Middleware/verify"
// import { upload } from "../utils/Multer"
const router = express.Router()


router.route("/Create-Product").post(verifyToken,CreateProduct
)

export default router
