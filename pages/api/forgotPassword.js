import mongoDb from "../../src/lib/mongoDb";
import { sendCode } from "../../src/lib/kavenegar";

const forgotPassword = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      sendCode(req.body.number, (response, status) => {
        if (status === 200) {
          res.status(200).send({ message: "done", action: "changePassword" });
        } else {
          const error = new Error("مشکلی پیش آمده");
          error.statusCode = 404;
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

export default forgotPassword;
