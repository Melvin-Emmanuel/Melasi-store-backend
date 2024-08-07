"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUser = exports.VerifyUser = exports.LoginUser = exports.CreateUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const ProfileModel_1 = __importDefault(require("../Model/ProfileModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const transporter = nodemailer_1.default.createTransport({
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
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FirstName, Email, LastName, Password } = req.body;
        if (!FirstName || !LastName || !Email || !Password) {
            return res.status(401).json({
                message: "All fields required"
            });
        }
        const CheckEmail = yield UserModel_1.default.findOne({ Email: Email });
        if (CheckEmail) {
            return res.status(401).json({
                message: "Email Already in use",
            });
        }
        if (Password.length < 8) {
            return res.status(401).json({
                message: "password must not be less than eight characters"
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const HashedPassword = yield bcrypt_1.default.hash(Password, salt);
        const UserData = yield UserModel_1.default.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: HashedPassword
        });
        const CreateProfile = yield ProfileModel_1.default.create({
            _id: UserData.id,
            FullName: `${FirstName} ${LastName}`,
            Gender: "",
            Address: "",
            Avatar: ""
        });
        UserData.Profile = CreateProfile._id;
        yield UserData.save();
        let mailOption = {
            from: '"Melasi Stores 🤳📱📺" <noreply@MelasiStores.com>',
            to: Email,
            subject: "Melasi Stores",
            html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:5032/api/v1/verify-account/${UserData._id}">link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
        };
        yield transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log("eeror sending mail", error);
            }
            else {
                console.log("email send", info.response);
            }
        });
        return res.status(200).json({
            message: "registration was successful chehck email to verify account",
            success: 1,
            Result: UserData
        });
    }
    catch (error) {
        res.status(400).json({
            message: "unable to create user",
            Reason: error.message
        });
    }
});
exports.CreateUser = CreateUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const checkEmail = yield UserModel_1.default.findOne({ Email: Email });
        if (checkEmail) {
            const CheckPassword = yield bcrypt_1.default.compare(Password, checkEmail.Password);
            if (CheckPassword) {
                if (checkEmail.Verify) {
                    //  const token = jwt.sign(
                    //    {
                    //      _id: checkEmail?._id,
                    //      userName: checkEmail.FirstName + " " + checkEmail.LastName,
                    //      role: checkEmail.role,
                    //    },
                    //    "variationofeventsisatrandom",
                    //    { expiresIn: "40m" }
                    //  );
                    // //  console.log("Melasi", token);
                    //  const { password, ...info } = checkEmail._doc;
                    //  res.cookie("sessionId", token);
                    //    console.log(req.headers["cookie"]);
                    //    console.log(Data)
                    return res.status(201).json({
                        success: 1,
                        message: "login successful",
                        //  data: { info, token },
                    });
                }
                else {
                    let mailOption = {
                        from: '"Melasi Stores 📱🤳" "<Noreply@melasistores.com>"',
                        to: Email,
                        subject: "Melasi stores",
                        html: `<b>PLEASE CLICK ON THE LINK <a href="http://localhost:5032/api/v1/Verify-Account/${checkEmail._id}"/>link</a>TO VERIFY YOUR ACCOUNT</b>`, // html body
                    };
                    yield transporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            console.log("eeror sending mail", error);
                        }
                        else {
                            console.log("email send", info.response);
                        }
                    });
                    return res
                        .status(404)
                        .json({
                        message: "please check your email to verify account",
                    });
                }
            }
            else {
                return res.status(404).json({
                    message: "Password is incorrect"
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User does not exist"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "unable to login"
        });
    }
});
exports.LoginUser = LoginUser;
const VerifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findById(req.params.id);
        if ((user === null || user === void 0 ? void 0 : user.Verify) == false) {
            const VerifyData = yield UserModel_1.default.findByIdAndUpdate(req.params.id, { Verify: true }, { new: true });
            return res.status(200).render("verifyAccount", {
                Message: "Account Has been verified",
            });
        }
        else {
            return res.status(200).render("verifyAccount2", {
                message: "Account Already verified"
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            error: error.message,
        });
    }
});
exports.VerifyUser = VerifyUser;
const LogoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("sessionId");
        return res.status(200).json({
            success: 1,
            message: "logout successful",
        });
    }
    catch (error) {
        return res.status(404).json({ message: "failed to logout user" });
    }
});
exports.LogoutUser = LogoutUser;
