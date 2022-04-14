import mongoDb from "../../../src/lib/mongoDb";
import {FoodModel,CommentModel} from "../../../src/models"

const foodById = async (req, res) => {
  try {
    await mongoDb();

    const { foodId } = req.params.query;
    if (!foodId) {
      const err = new Error("غذای مورد نطر پیدا نشد");
      err.statusCode = 404;
      throw err;
    }
    const foodDetails = await FoodModel.findOne({ _id: foodId }).populate({
      path: "comments", model: CommentModel
    });
    res.status(200).send({ foodDetails, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default foodById;
