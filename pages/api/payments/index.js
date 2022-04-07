import jwt_decode from "jwt-decode"

import mongoDb from "../../../src/lib/mongoDb";
import PaymentModel from "../../../src/models/Payment";
import ShopModel from "../../../src/models/Shop";

const getPayments = async (req, res) => {
  try {
    await mongoDb();
    const {_id} = jwt_decode(req.headers.authorization)

    const userPayments = await PaymentModel.find({
      userId: _id,
    }).populate({ path: "shopId", select: "shopName", model: ShopModel });

    res.status(200).send({ userPayments, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default getPayments;
