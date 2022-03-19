import bcrypt from "bcrypt";

import mongoDb from "../../src/lib/mongoDb";
import UserModel from "../../src/models/User";
import { userLoginValidator } from "../../src/validators/UserValidator";

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { error } = userLoginValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }
      const { number, password } = req.body;
      const user = await UserModel.findOne({ number });
      if (!user) {
        const error = new Error("کاربری با ای مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        const error = new Error("کاربری با ای مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      const token = user.genAuthToken();
      res.status(200).send({ message: "done", token, userId: user._id });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default login;
