import multer from "multer";
import express, { Request } from "express";
import path from "path";

type callBackDestination = (err: Error | null, destination: string) => void;
type fileNamecallBack = (err: Error | null, destination: string) => void;

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: callBackDestination) {
    cb(null, path.join(__dirname, "../Uploads/Products"));
  },
  filename: function (req: Request, file: any, cb: fileNamecallBack) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
export const upload = multer({ storage: storage }).single("Image");
