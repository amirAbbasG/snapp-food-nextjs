import bcrypt from "bcrypt";

import mongoDb from "../../../src/lib/mongoDb";
import {UserModel} from "../../../src/models";
import {getUser} from "../../../src/utils/apiHelper";


const changeAuthenticatedUserPassword = async (req, res) => {
  try {
    await mongoDb();
    const {_id} = getUser(req)

    const user = await UserModel.findOne({ _id });
    if (!user) {
      const error = new Error("کاربری با ای مشخصات پیدا نشد");
      error.statusCode = 404;
      throw error;
    }
    if (bcrypt.compare(req.body.oldPassword, user.password)) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).send({ message: "done" });
    } else {
      const error = new Error("پسورد فعلی درست نیست");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default changeAuthenticatedUserPassword;
