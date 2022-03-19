import mongoDb from "../../../src/lib/mongoDb";
import FoodModel from "../../../src/models/Food";

const getFoods = async (req, res) => {
  try {
    await mongoDb();
    const { shopId } = req.query;
    if (!shopId) {
      const err = new Error("رستوران مورد نطر پیدا نشد");
      err.statusCode = 404;
      throw err;
    }
    const foods = await FoodModel.find({ shopId }).populate({
      path: "comments",
      select: "score",
    });

    res.status(200).send({ foods, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default getFoods;
