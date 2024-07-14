import mongoose from "mongoose"
const localUrl = "mongodb://0.0.0.0:27017/Melasi-stores"

const db=mongoose.connect(localUrl).then(() => {
    console.log("A connection has been made")
}).catch((error:any) => {
    console.log(error,"there was an error in database connection")
})

export default db