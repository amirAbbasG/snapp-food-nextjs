import _ from "lodash"

import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import ShopModel from "../../../src/models/Shop";
import UserModel from "../../../src/models/User";
import FoodModel from "../../../src/models/Food";
import {getUser} from "../../../src/utils/apiHelper";

const reorder = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const { orderId } = req.query;
      const {_id} = getUser(req)
      if (!orderId) {
        const err = new Error("سفارش مورد نطر پیدا نشد");
        err.statusCode = 404;
        throw err;
      }

      const PrvOrder = await OrderModel.findById(orderId);
      const user = await UserModel.findById(_id);

      const newOrder = new OrderModel(
        _.pick(PrvOrder, ["shopId", "userId", "foods"])
      );
      console.log("ok")
      newOrder.address = user.addresses[0];
      newOrder.createDate = Date.now();
      newOrder.foods.map(async (f) => {
        const targetFood = await FoodModel.findById(f._id);
        f.price = targetFood.price;
        f.discount = targetFood.discount;
        f.foodImage = targetFood.foodImage;
      });

      newOrder.amount = newOrder.foods.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
      newOrder.amountByDiscount = newOrder.foods.reduce((acc, item) => {
        return (
          acc + (item.price - (item.price * item.discount) / 100) * item.count
        );
      }, 0);

      await newOrder.save();

      const order = await OrderModel.findById( newOrder._id ).populate({
        path: "shopId",
        select: "shopName shopLogo deliveryCost ",
        model: ShopModel
      });
      return res.status(201).send({ order });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default reorder;
