import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import PaymentModel from "../../../src/models/Payment";
import ShopModel from "../../../src/models/Shop";
import { zarinpal } from "../../../src/lib/zarinpal";

const checkPayment = async (req, res) => {
  try {
    await mongoDb();

    const { orderId } = req.query;

    if (!orderId) {
      const err = new Error("سفارش مورد نطر پیدا نشد");
      err.statusCode = 404;
      throw err;
    }
    const order = await OrderModel.findOne({ _id: orderId });
    const shop = await ShopModel.findById(order.shopId);

    let couponDiscount = 0;
    if (order.usedCoupon && order.usedCoupon.discount > 0) {
      couponDiscount =
        (order.amountByDiscount * order.usedCoupon.discount) / 100;
    }
    const payment = new PaymentModel({
      orderId: order._id,
      shopId: shop._id,
      userId: order.userId,
      amount: order.amountByDiscount + shop.deliveryCost - couponDiscount,
      createDate: Date.now(),
    });
    const response = await zarinpal.PaymentRequest({
      Amount: payment.amount,
      CallbackURL: "http://localhost:3000/api/verifyPayment",
      Description: `خرید از رستوران ${shop.shopName}`,
    });
    payment.paymentCode = response.authority;
    if (req.body.address) {
      order.Address = req.body.address;
    }
    await order.save();
    await payment.save();
    res.send({ paymentUrl: response.url });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default checkPayment;
