import mongoDb from "../../../src/lib/mongoDb";
import {PaymentModel, ShopModel} from "../../../src/models"
import {getUser} from "../../../src/utils/apiHelper";


const getPayments = async (req, res) => {
  try {
    await mongoDb();
    const {_id} = getUser(req)

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
