import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";

const shopsByCategory = async (req, res) => {
  try {
    await mongoDb();

    const { category, limit } = req.query;

    const shops = await ShopModel.find({
      $or: [{ shopType: category }, { category }],
    })
      .populate({ path: "comments", select: "score -_id" })
      .select("-userNumber -userPassword -ownerFullName")
      .limit(limit);

    res.status(200).send({ shops });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default shopsByCategory;
