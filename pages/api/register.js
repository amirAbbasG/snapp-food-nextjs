import _ from "lodash";
import bcrypt from "bcrypt";

import mongoDb from "../../src/lib/mongoDb";
import UserModel from "../../src/models/User";
import ActiveNumberModel from "../../src/models/ActiveNumber";
import { userRegisterValidator } from "../../src/validators/UserValidator";

const register = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { error } = userRegisterValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }

      const { number } = req.body;

      const activeNumber = await ActiveNumberModel.findOne({ number });
      if (!activeNumber) {
        const error = new Error("شماره فعال نشده");
        error.statusCode = 400;
        throw error;
      }
      const user = await new UserModel(
        _.pick(req.body, ["number", "fullName"])
      );
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
      await user.save();
      const token = user.genAuthToken();
      res.status(201).send({ message: "done", token, userId: user._id });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default register;
