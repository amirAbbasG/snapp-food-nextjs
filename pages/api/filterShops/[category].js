import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";
import FoodModel from "../../../src/models/Food";
import CommentModel from "../../../src/models/Comment";

const shopsByCategory = async (req, res) => {
  try {
    await mongoDb();

    const { category, limit } = req.query;


    const shops = await ShopModel.find({
      $or: [{ shopType: category }, { category}],
    })
      .populate({ path: "comments", select: "score -_id", model: CommentModel})
        .populate({ path: "foods", select: "price discount -_id", model: FoodModel })
      .select("-userNumber -userPassword -ownerFullName")
      .limit(limit);

    res.status(200).send({ shops, done: true });
  } catch (error) {
   res.status(500).send({message: "مشکلی پیش آمده", done: false, error})
  }
};

export default shopsByCategory;
