import mongoDb from "../../../src/lib/mongoDb";
import UserModel from "../../../src/models/User";
import ShopModel from "../../../src/models/Shop";
import CommentModel from "../../../src/models/Comment";
import {getUser} from "../../../src/utils/apiHelprs";

const userInformation = async (req, res) => {

    try {
        await mongoDb();

        const {_id} = getUser(req.headers.authorization)

        const user = await UserModel.findOne({_id})
            .select("-password")
            .populate({
                path: "favoriteShop",
                select: "-userNumber -userPassword -ownerFullName -coupons -foods",
                model: ShopModel,
                populate: {
                    path: "comments",
                    select: "score -_id",
                    model: CommentModel
                },
            });
        res.status(200).send({user, message: true});
    } catch (error) {
        const err = new Error("مشکلی پیش آمده : ", error);
        err.statusCode = 500;
        throw err;
    }
};

export default userInformation;
