import mongoose from "mongoose";

interface Category {
  Name: string;
  Parent: string;
  Slug: string;
  Products: [];
  User: {};
}
interface Icategory extends Category, mongoose.Document {}

const CategorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Parent: {
      type: String,
    },
    Slug: {
      type: String,
    },
    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model<Icategory>("Categories", CategorySchema);
