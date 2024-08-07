import mongoose from "mongoose";

interface Products {
  Name: string;
  Image: string;
  Desc: string;
  Quantity: string;
  Price: number;
  Category: string;
}

interface Iproducts extends Products, mongoose.Document {}

const ProductSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Image: {
      type: String,
    },
    Desc: {
      type: String,
    },
    Quantity: {
      type: String,
    },
    Category: {
      type: String,
    },
    Price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Iproducts>("products", ProductSchema);
