import UserModel from "../Model/UserModel";
import ProfileModel from "../Model/ProfileModel";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
// import bcrypt from "bcrypt"
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "emmanulmelv@gmail.com",
    pass: "lvlq vsja tjro fmrc",
  },
});
export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { FirstName, Email, LastName, Password } = req.body;
    if (!FirstName || !LastName || !Email || !Password) {
      return res.status(401).json({
        message: "All fields required",
      });
    }
    const CheckEmail = await UserModel.findOne({ Email: Email });
    if (CheckEmail) {
      return res.status(401).json({
        message: "Email Already in use",
      });
    }
    if (Password.length < 8) {
      return res.status(401).json({
        message: "password must not be less than eight characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(Password, salt);
    const UserData = await UserModel.create({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: HashedPassword,
    });
    const CreateProfile = await ProfileModel.create({
      _id: UserData.id,
      FullName: `${FirstName} ${LastName}`,
      Gender: "",
      Address: "",
      Avatar: "",
    });
    UserData.Profile = CreateProfile._id as mongoose.Types.ObjectId;

    await UserData.save();

    let mailOption = {
      from: '"Melasi Stores 🤳📱📺" <noreply@MelasiStores.com>', // sender address
      to: Email, // list of receivers
      subject: "Melasi Stores", // Subject line
      html: `<b>PLEASE CLICK ON THE LINK <a href="faint-lily-melasicodelab-31cb4284.koyeb.app/api/v1/verify-account/${UserData._id}">link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
    };
    await transporter.sendMail(mailOption, (error: any, info: any) => {
      if (error) {
        console.log("eeror sending mail", error);
      } else {
        console.log("email send", info.response);
      }
    });

    return res.status(200).json({
      message: "registration was successful chehck email to verify account",
      success: 1,
      Result: UserData,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "unable to create user",
      Reason: error.message,
    });
  }
};

export const LoginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const checkEmail = await UserModel.findOne({ Email: email }).lean();

    if (checkEmail) {
      const CheckPassword = await bcrypt.compare(password, checkEmail.Password);

      if (CheckPassword) {
        if (checkEmail.Verify) {
          const token = jwt.sign(
            {
              _id: checkEmail?._id,
              userName: checkEmail.FirstName + " " + checkEmail.LastName,
              role: checkEmail.role,
            },
            "variationofeventsisatrandom",
            { expiresIn: "40m" }
          );
          //  console.log("Melasi", token);
          // const { password, ...info } = checkEmail._doc;
          res.cookie("sessionId", token);
          console.log(req.headers["cookie"]);

          return res.status(201).json({
            success: 1,
            message: "login successful",
            // data: { info, token },
          });
        } else {
          let mailOption = {
            from: '"Melasi Stores 📱🤳" "<Noreply@melasistores.com>"', // sender address
            to: email, // list of receivers
            subject: "Melasi stores", // Subject line
            html: `<b>PLEASE CLICK ON THE LINK <a href="faint-lily-melasicodelab-31cb4284.koyeb.app/api/v1/Verify-Account/${checkEmail._id}"/>Link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
          };
          await transporter.sendMail(mailOption, (error: any, info: any) => {
            if (error) {
              console.log("eeror sending mail", error);
            } else {
              console.log("email send", info.response);
            }
          });
          return res.status(404).json({
            message: "please check your email to verify account",
          });
        }
      } else {
        return res.status(404).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: `unable to login because ${error}`,
    });
  }
};
export const VerifyUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (user?.Verify == false) {
      const VerifyData = await UserModel.findByIdAndUpdate(
        req.params.id,
        { Verify: true },
        { new: true }
      );

      return res.status(200).render("verifyAccount", {
        Message: "Account Has been verified",
      });
    } else {
      return res.status(200).render("verifyAccount2", {
        message: "Account Already verified",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      error: error.message,
    });
  }
};

export const LogoutUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    res.clearCookie("sessionId");
    return res.status(200).json({
      success: 1,
      message: "logout successful",
    });
  } catch (error) {
    return res.status(404).json({ message: "failed to logout user" });
  }
};
