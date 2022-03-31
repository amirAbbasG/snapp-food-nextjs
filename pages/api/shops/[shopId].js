import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";
import FoodModel from "../../../src/models/Food";
import CommentModel from "../../../src/models/Comment";


const shopById = async (req, res) => {
  try {
    await mongoDb();

    const {shopId} = req.query
    const shopDetails = await ShopModel.findById(shopId)
      .populate({
        path: "comments",
        model: CommentModel
      })
      .populate({
        path: "foods",
        model: FoodModel,
        populate: {
          path: "comments",
          model: CommentModel
        },
      })
      .select("-userNumber -userPassword");

    res.status(200).send({ shopDetails, message: true });
  } catch (error) {
    res.status(500).send({done: false, message: `مشکلی پیش آمده : ${error}`})
  }
};

export default shopById;
