import _ from "lodash";

import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";
import FoodModel from "../../../src/models/Food";
import UserModel from "../../../src/models/User";
import {getUser} from "../../../src/utils/apiHelper";

const addToCart = async (req, res) => {
  if (req.method === "POST") {
    try {
      await mongoDb();

      const {_id} = getUser(req)

      const { foodId } = req.query;
      const food = await FoodModel.findById(foodId);
      const user = await UserModel.findOne({ _id });
      if (!user) {
        const error = new Error("کاربری با ای مشخصات پیدا نشد");
        error.statusCode = 404;
        throw error;
      }
      let order = await OrderModel.findOne({
        userId: _id,
        isPaid: false,
        shopId: food.shopId,
      });
      if (order != null) {
        let orderFood = order.foods.find((f) => f._id == food._id);
        if (orderFood != null) {
          orderFood.count += 1;
        } else {
          orderFood = {
            ..._.pick(food, [
              "_id",
              "name",
              "price",
              "shopId",
              "discount",
              "foodImage",
            ]),
            count: 1,
          };
          order.foods.push(orderFood);
        }
      } else {
        order = new OrderModel({
          shopId: food.shopId,
          userId: _id,
          address: user.addresses[0],
          createDate: Date.now(),
          foods: [
            {
              ..._.pick(food, [
                "_id",
                "name",
                "price",
                "shopId",
                "discount",
                "foodImage",
              ]),
              count: 1,
            },
          ],
        });
      }
      order.amount = order.foods.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
      order.amountByDiscount = order.foods.reduce((acc, item) => {
        return (
          acc + (item.price - (item.price * item.discount) / 100) * item.count
        );
      }, 0);
      await order.save();
      const newOrder = await OrderModel.findOne({ _id: order._id }).populate({
        path: "shopId",
        select: "shopName shopLogo deliveryCost",
      });
      res.status(201).send({ message: "done", order: newOrder });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default addToCart;
