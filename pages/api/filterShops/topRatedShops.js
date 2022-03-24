
import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";
import CommentModel from "../../../src/models/Comment"
import { calculateRate } from "../../../src/utils/rateCalculator";

const topRatedShops = async (req, res) => {
  try {
    await mongoDb();

    const { limit } = req.query;

    const shops = await ShopModel.find()
      .populate({ path: "comments", select: "score -_id", model: CommentModel })
      .select("-userNumber -userPassword -ownerFullName");

    const topRatedShops = [...shops]
      .sort((a, b) => calculateRate(b.comments) - calculateRate(a.comments))
      .slice(0, limit);

    res.status(200).send({ topRatedShops });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default topRatedShops;
