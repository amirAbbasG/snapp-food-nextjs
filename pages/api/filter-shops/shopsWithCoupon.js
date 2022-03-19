import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";

const shopsWithCoupon = async (req, res) => {
  try {
    await mongoDb();
    const { limit } = req.query;

    const shopWithCoupon = await ShopModel.find({
      "coupons.0": { $exists: true },
    })
      .populate({ path: "comments", select: "score -_id" })
      .select("-userNumber -userPassword -ownerFullName")
      .limit(limit);

    res.status(200).send({ shopWithCoupon });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default shopsWithCoupon;
