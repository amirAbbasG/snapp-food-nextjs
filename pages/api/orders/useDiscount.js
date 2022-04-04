import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import DiscountModel from "../../../src/models/Discount";
import {getUser} from "../../../src/utils/apiHelprs";

const useDiscount = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();
      const {_id} = getUser(req.headers.authorization)
      const { orderId, discountCode } = req.body;

      const order = await OrderModel.findById(orderId);

      const targetDiscount = await DiscountModel.findOne({ discountCode });

      if (!targetDiscount) {
        const error = new Error("کد وارد شده درست نیست");
        error.statusCode = 404;
        throw error;
      }

      if (targetDiscount.userUsed.includes(_id)) {
        const error = new Error("قبلا از این کد استفاده کردید");
        error.statusCode = 400;
        throw error;
      }

      if (
        (order.amountByDiscount * targetDiscount.discount) / 100 >
        targetDiscount.maxDiscount
      ) {
        order.amountByDiscount -= targetDiscount.maxDiscount;
      } else {
        order.amountByDiscount -=
          (order.amountByDiscount * targetDiscount.discount) / 100;
      }

      if (targetDiscount.count > 1) {
        targetDiscount.count -= 1;
        targetDiscount.userUsed.push(_id);
      } else {
        await DiscountModel.findByIdAndDelete(targetDiscount._id);
      }
      await order.save();
      await targetDiscount.save();
      res.status(200).send({ order });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default useDiscount;
