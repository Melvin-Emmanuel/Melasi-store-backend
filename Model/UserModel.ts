import mongoose from "mongoose";

interface user {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
    Profile?: mongoose.Types.ObjectId;
    Verify: boolean;
    role: string;
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
        },
        Verify: {
            type: Boolean,
            default:false
        },
        role: {
            type: String,
            enum: ["User", "StoreOwner", "Admin"],
            default:"User"
            
        }
    })
export default mongoose.model<Iuser>("user",UserSchema)