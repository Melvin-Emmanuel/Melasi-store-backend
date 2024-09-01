import express, { Application } from "express";
import cors from "cors";
import UserRouter from "./Router/UserRouter"
import VerifyUser from "./Router/UserRouter"
import LoginUser from "./Router/UserRouter"
import LogoutUser from "./Router/UserRouter"
import CreateCategory from "./Router/CategoryRouter"
import updateCategory from "./Router/CategoryRouter";
import DeleteCategory from "./Router/CategoryRouter"
import GetAllCategory from "./Router/CategoryRouter";
import GetAllProducts  from "./Router/ProductRouter";

export const MainApp = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      message: "Api is running successfully",
    });
  });
  app.use("/api/v1", UserRouter)
  app.use("/api/v1", VerifyUser)
  app.use("api/v1", LoginUser)
  app.use("api/v1", LogoutUser)
  app.use("/api/v1", CreateCategory)
  app.use("api/v1", updateCategory)
  app.use("api/v1", DeleteCategory)
  app.use("api/v1", GetAllCategory)
  app.use("api/v1",GetAllProducts)
};
