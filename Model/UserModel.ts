import mongoose from "mongoose";

interface user{
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    profile:{}
}

interface Iuser extends user, mongoose.Document { }
const UserSchema = new mongoose.Schema(
    {
        FirstName: {
            type: String
        },
        LastName: {
            type: String
        },
        Email: {
            type: String
        },
        Password: {
            type:String
        },
        Profile: {
            type: mongoose.Types.ObjectId,
            ref:"profile"
        }
    })
export default mongoose.model<Iuser>("user",UserSchema)