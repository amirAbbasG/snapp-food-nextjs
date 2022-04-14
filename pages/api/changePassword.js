import bcrypt from "bcrypt";

import mongoDb from "../../src/lib/mongoDb";
import {UserModel} from "../../src/models";
import { changePasswordValidator } from "../../src/validators/UserValidator";
import { isValidCode } from "../../src/lib/kavenegar";

const changePassword = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { error } = changePasswordValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }

      const { code, number, password } = req.body;
      if (!isValidCode(code, number)) {
        const error = new Error("کد ارسال شده نادرست است");
        error.statusCode = 400;
        throw error;
      }

      const user = await UserModel.findOne({ number });
      if (!user) {
        const error = new Error("کاربری با ای مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).send({ message: "done", action: "login" });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default changePassword;
