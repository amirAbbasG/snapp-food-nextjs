import mongoDb from "../../src/lib/mongoDb";
import ActiveNumberModel from "../../src/models/ActiveNumber";
import { isValidCode } from "../../src/lib/kavenegar";

const verifyNumber = async (req, res) => {
  try {
    await mongoDb();
    const { code, number } = req.body;

    if (isValidCode(code, number)) {
      const activeNumber = await new ActiveNumberModel({
        number: req.body.number,
      });
      await activeNumber.save();
      res.status(200).send({ action: "register", success: true });
    } else {
      const error = new Error("کد ارسال شده نادرست است");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default verifyNumber;
