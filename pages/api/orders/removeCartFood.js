import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import FoodModel from "../../../src/models/Food";
import {getUser} from "../../../src/utils/apiHelprs";

const removeCartFood = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      await mongoDb();

      const { foodId } = req.query;

      if (!foodId) {
        const err = new Error("غذای مورد نطر پیدا نشد");
        err.statusCode = 404;
        throw err;
      }

      const {_id} = getUser(req.headers.authorization)

      const food = await FoodModel.findOne({ _id: foodId });
      let order = await OrderModel.findOne({
        userId: _id,
        isPaid: false,
        shopId: food.shopId,
      });
      const targetFood = order.foods.find((f) => f._id == foodId);
      if (targetFood != null) {
        if (order.foods.count == 1 && order.foods[0].count == 1) {
          OrderModel.findByIdAndRemove(order._id);
        } else {
          if (targetFood.count > 1) {
            targetFood.count -= 1;
          } else {
            const newOrderFoods = [...order.foods].filter(
              (f) => f._id != targetFood._id
            );
            order.foods = newOrderFoods;
          }
          order.amount = order.foods.reduce((acc, item) => {
            return acc + item.price * item.count;
          }, 0);
          order.amountByDiscount = order.foods.reduce((acc, item) => {
            return (
              acc +
              (item.price - (item.price * item.discount) / 100) * item.count
            );
          }, 0);
        }
      }
      await order.save();
      const newOrder = await OrderModel.findOne({ _id: order._id }).populate({
        path: "shopId",
        select: "shopName shopLogo deliveryCost",
      });
      res.status(200).send({ message: "done", order: newOrder });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default removeCartFood;
