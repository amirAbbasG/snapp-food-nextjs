import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";

const getOrders = async (req, res) => {
  try {
    await mongoDb();
    const userOrders = await OrderModel.find({ userId: req.user._id }).populate(
      {
        path: "shopId",
        select: "shopName shopLogo deliveryCost ",
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
