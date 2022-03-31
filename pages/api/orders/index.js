import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import ShopModel from "../../../src/models/Shop";
import {getUser} from "../../../src/utils/apiHelprs";

const getOrders = async (req, res) => {
  try {
    await mongoDb();
    const {_id} = getUser(req.headers.authorization)
    const userOrders = await OrderModel.find({ userId: _id }).populate(
      {
        path: "shopId",
        select: "shopName shopLogo deliveryCost ",
        model: ShopModel
      }
    );
    res.status(200).send({ userOrders, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default getOrders;
