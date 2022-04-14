import mongoDb from "../../../src/lib/mongoDb";
import {UserModel} from "../../../src/models";
import { userEditValidator } from "../../../src/validators/UserValidator";
import {setTokenCookie} from "src/lib/cookie";
import {getUser} from "../../../src/utils/apiHelper";


const editProfile = async (req, res) => {
  if (req.method === "PUT") {
    try {
      await mongoDb();

      const {_id} = getUser(req)

      const { error } = userEditValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }
      const user = await UserModel.findOne({ _id });
      if (!user) {
        const error = new Error("کاربری با ای مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      user.fullName = req.body.fullName;
      if (req.body.email) {
        user.email = req.body.email;
      }

      if (req.body.creditCardNumber) {
        user.creditCardNumber = req.body.creditCardNumber;
      }

      if (req.body.address) {
        user.addresses.push(req.body.address);
      }
      await user.save();
      const token = user.genAuthToken();
      setTokenCookie(token, res)
      res.status(200).send({ message: "edit successfully", done: true });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default editProfile;
