import mongoDb from "../../../src/lib/mongoDb";
import UserModel from "../../../src/models/User";

const favouriteOrUnfavouriteShop = async (req, res) => {
  try {
    await mongoDb();

    const user = await UserModel.findOne({ _id: req.user._id });

    if (!user) {
      const error = new Error("کاربری با ای مشخصات پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    const { shopId } = req.query;
    const foundIndex = user.favoriteShop.findIndex((f) => f._id == shopId);

    if (foundIndex === -1) {
      user.favoriteShop.push(shopId);
      res.status(200).send({ message: "done" });
    } else {
      user.favoriteShop.splice(foundIndex, 1);
      res.status(200).send({ message: "done" });
    }

    await user.save();
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default favouriteOrUnfavouriteShop;
