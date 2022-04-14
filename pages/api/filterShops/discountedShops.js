import mongoDb from "../../../src/lib/mongoDb";
import { getFoodWithDiscount } from "../../../src/utils/rateCalculator";
import {FoodModel, ShopModel, CommentModel} from "../../../src/models"

const discountedShops = async (req, res) => {

  try {
    await mongoDb();

    const { limit } = req.query;

    const shops = await ShopModel.find()
      .populate({ path: "comments", select: "score -_id", model: CommentModel })
      .populate({ path: "foods", select: "price discount -_id", model: FoodModel })
      .select("-userNumber -userPassword -ownerFullName");

    const discountedShops = [...shops]
      .filter((s) => getFoodWithDiscount(s.foods ).length > 0)
      .slice(0, limit);

    res.status(200).send({ discountedShops });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default discountedShops;
