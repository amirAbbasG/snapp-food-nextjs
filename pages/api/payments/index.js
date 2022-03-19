import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import PaymentModel from "../../../src/models/Payment";

const getPayments = async (req, res) => {
  try {
    await mongoDb();

    const userPayments = await PaymentModel.find({
      userId: req.user._id,
    }).populate({ path: "shopId", select: "shopName" });
    res.status(200).send({ userPayments, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default getPayments;
