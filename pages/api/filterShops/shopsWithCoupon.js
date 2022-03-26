import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop"
import CommentModel from "../../../src/models/Comment"
import FoodModel from "../../../src/models/Food";

const getShopsWithCoupon = async (req, res) => {
  try {
    await mongoDb();
    const { limit } = req.query;

    const shopsWithCoupon = await ShopModel.find({
      "coupons.0": { $exists: true },
    }).limit(limit)
      .populate({ path: "comments", select: "score -_id", model: CommentModel })
        .populate({ path: "foods", select: "price discount -_id", model: FoodModel })
      .select("-userNumber -userPassword -ownerFullName")


    res.status(200).send({ shopsWithCoupon });
  } catch (error) {
    res.send({error})
    // const err = new Error("مشکلی پیش آمده : ", error);
    // err.statusCode = 500;
    // throw err;
  }
};

export default getShopsWithCoupon;
