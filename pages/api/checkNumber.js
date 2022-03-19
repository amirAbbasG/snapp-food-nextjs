import mongoDb from "../../src/lib/mongoDb";
import UserModel from "../../src/models/User";
import { numberValidator } from "../../src/validators/UserValidator";
import { sendCode } from "../../src/lib/kavenegar";

const checkNumber = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { error } = numberValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }
      const user = await UserModel.findOne({ number: req.body.number });
      if (user)
        return res.status(200).send({ message: "done", action: "login" });
      sendCode(req.body.number, (response, status) => {
        if (status === 200) {
          res.status(200).send({ message: "done", action: "sendCode" });
        } else {
          const error = new Error("مشکلی پیش آمده");
          error.statusCode = status;
          throw error;
        }
      });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default checkNumber;
