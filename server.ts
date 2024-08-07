import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import "./database/database"
import { MainApp } from "./MainApp"
import { error } from "console"
import path from "path"


const port = 5032
const app: Application = express()

MainApp(app)
app.set("view engine", "ejs");
app.set("Views", path.join(__dirname, "Views"));
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)

})

process.on("uncaughtException", (error: Error) => {
    console.log("stop here:uncaughtexceptionerror")
    process.exit(1)
})
process.on("unhandledRejection", (reason:any) => {
    console.log(`an unhhandleld rejection error has occured ${reason}`)
    server.close(() => {
        process.exit(1)
    })
})