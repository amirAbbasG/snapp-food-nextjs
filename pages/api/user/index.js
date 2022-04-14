import mongoDb from "../../../src/lib/mongoDb";
import {ShopModel, CommentModel, UserModel} from "../../../src/models"
import {getUser} from "../../../src/utils/apiHelper";



const userInformation = async (req, res) => {

    try {
        await mongoDb();

        const {_id} = getUser(req)

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
        console.error(error)
       res.status(500).send({done: false, error})
    }
};

export default userInformation;
