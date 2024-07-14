import express, { Application } from "express";
import cors from "cors"




export const MainApp = (app:Application) => {
    app.use(express.json())
    app.use(cors())
    app.get("/api/v1", (req, res) => {
        res.status(200).json({
            message:"Api is running successfully"
        })
    })
}

