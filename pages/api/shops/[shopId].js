import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";

const shopById = async (req, res) => {
  try {
    await mongoDb();
    const shopDetails = await ShopModel.findOne({ _id: req.params.shopId })
      .populate({
        path: "comments",
      })
      .populate({
        path: "foods",
        populate: {
          path: "comments",
        },
      })
      .select("-userNumber -userPassword");

    res.status(200).send({ shopDetails, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default shopById;
