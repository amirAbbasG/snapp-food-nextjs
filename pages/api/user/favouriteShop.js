import jwt_decode from "jwt-decode"

import mongoDb from "../../../src/lib/mongoDb";
import UserModel from "../../../src/models/User";


const favouriteOrUnfavouriteShop = async (req, res) => {
  console.log("requested")
  try {
    await mongoDb();

    const {_id} = jwt_decode(req.headers.authorization)

    const user = await UserModel.findOne({ _id });

    if (!user) {
      const error = new Error("کاربری با ای مشخصات پیدا نشد");
      error.statusCode = 404;
      throw error;
    }

    const { shopId } = req.query;
    const foundIndex = user.favoriteShop.findIndex((f) => f._id == shopId);

    if (foundIndex === -1) {
      user.favoriteShop.push(shopId);
      res.status(200).send({ message: "done", favourite: true });
    } else {
      user.favoriteShop.splice(foundIndex, 1);
      res.status(200).send({ message: "done", favourite: false });
    }

    await user.save();
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default favouriteOrUnfavouriteShop;
