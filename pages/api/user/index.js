import mongoDb from "../../../src/lib/mongoDb";
import UserModel from "../../../src/models/User";

const userById = async (req, res) => {
  try {
    await mongoDb();

    const user = await UserModel.findOne({ _id: req.user._id })
      .select("-password")
      .populate({
        path: "favoriteShop",
        select: "-userNumber -userPassword -ownerFullName -coupons -foods",
        populate: {
          path: "comments",
          select: "score -_id",
        },
      });
    res.status(200).send({ user, message: true });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default userById;
