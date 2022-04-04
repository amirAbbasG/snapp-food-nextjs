import mongoDb from "../../src/lib/mongoDb";
import OrderModel from "../../src/models/Order";
import PaymentModel from "../../src/models/Payment";
import FoodModel from "../../src/models/Food";
import ShopModel from "../../src/models/Shop";
import { zarinpal } from "../../src/lib/zarinpal";

const verifyPayment = async (req, res) => {
  try {
    await mongoDb();
    const paymentCode = req.query.Authority;
    const status = req.query.Status;

    const payment = await PaymentModel.findOne({ paymentCode });
    const order = await OrderModel.findById(payment.orderId);
    const shop = await ShopModel.findById(order.shopId);

    if (order.usedCoupon) {
      order.usedCoupon.usersUsed.push(order.userId);
      const newCouponList = [
        ...[...shop.coupons.filter((c) => c._id != order.usedCoupon._id)],
        order.usedCoupon,
      ];
      shop.coupons = newCouponList;
      await shop.save();
    }
    if (status === "OK") {
      const response = await zarinpal.PaymentVerification({
        Amount: payment.amount,
        Authority: paymentCode,
      });
      if (response.status === -21) {
        res.status(400).send("<p>failed</p>");
      } else {
        payment.refId = response.RefID;
        payment.success = true;
        order.isPaid = true;
        order.amountByDiscount = payment.amount - shop.deliveryCost;
        order.foods.map(async (f) => {
          const food = await FoodModel.findOne({ _id: f._id });
          food.totalOrdered += f.count;
          await food.save();
        });
        await order.save();
        await payment.save();
        res.status(200).send("<div>" +
            "<h1>success</h1>" +
            "<a href='/'>back</a>" +
            "</div>");
      }
    } else {
      res.status(400).send("<p>failed</p>");
    }
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default verifyPayment;
