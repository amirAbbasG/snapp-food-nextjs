import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import ShopModel from "../../../src/models/Shop";

const useCoupon = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { shopId, couponId } = req.body;

      if (!shopId) {
        const err = new Error("فروشگاه مورد نطر پیدا نشد");
        err.statusCode = 404;
        throw err;
      }
      const shop = await ShopModel.findById(shopId);
      const order = await OrderModel.findOne({
        userId: req.user._id,
        shopId: shop._id,
        isPaid: false,
      });
      const coupon = shop.coupons.find((c) => c._id == couponId);
      if (!order) {
        const error = new Error("سفارشی در این فروشگاه ندارید");
        error.statusCode = 404;
        throw error;
      }
      if (!coupon) {
        const error = new Error("کوپنی با این مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      if (coupon.usersUsed.includes(req.user._id)) {
        const error = new Error("قبلا از این کوپن استفاده کردید");
        error.statusCode = 400;
        throw error;
      }
      order.usedCoupon = coupon;
      await order.save();

      const newOrder = await OrderModel.findOne({ _id: order._id }).populate({
        path: "shopId",
        select: "shopName shopLogo deliveryCost ",
      });
      return res.status(200).send({ order: newOrder });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default useCoupon;
