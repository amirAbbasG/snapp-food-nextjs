
import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import ShopModel from "../../../src/models/Shop";
import {getUser} from "../../../src/utils/apiHelper";

const getOrders = async (req, res) => {
  try {
    await mongoDb();

    const {_id} = getUser(req)
    const userOrders = await OrderModel.find({ userId: _id }).populate(
      {
        path: "shopId",
        select: "shopName shopLogo deliveryCost ",
        model: ShopModel
      }
    );
    res.status(200).send({ userOrders, message: true });
  } catch (error) {
      console.error(error)
    res.status(500).send({done: false, error})
  }
};

export default getOrders;
