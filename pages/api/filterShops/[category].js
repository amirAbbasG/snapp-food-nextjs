import mongoDb from "../../../src/lib/mongoDb";
import {FoodModel, ShopModel, CommentModel} from "../../../src/models"

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
