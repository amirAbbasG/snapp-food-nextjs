import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";
import { getFoodWithDiscount } from "../../../src/utils/rateCalculator";

const discountedShops = async (req, res) => {
  try {
    await mongoDb();

    const { limit } = req.query;

    const shops = await ShopModel.find()
      .populate({ path: "comments", select: "score -_id" })
      .populate({ path: "foods", select: "price discount -_id" })
      .select("-userNumber -userPassword -ownerFullName");

    const discountedShops = [...shops]
      .filter((s) => getFoodWithDiscount(s.foods > 0))
      .slice(0, limit);

    res.status(200).send({ discountedShops });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default discountedShops;
