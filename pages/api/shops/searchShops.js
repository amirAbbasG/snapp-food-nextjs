import mongoDb from "../../../src/lib/mongoDb";
import ShopModel from "../../../src/models/Shop";
import CommentModel from "../../../src/models/Comment";
import FoodModel from "../../../src/models/Food";


const searchShops = async (req, res) => {
    try {
        await mongoDb();

        const {filter, limit} = req.query


        const shops = await ShopModel
            .find()
            .or([
                {shopName: {$regex: filter}},
                {category: {$regex: filter}},
                {shopType: {$regex: filter}}
            ])
            .populate({ path: "comments", select: "score -_id", model: CommentModel})
            .populate({ path: "foods", select: "price discount -_id", model: FoodModel })
            .select("-userNumber -userPassword -ownerFullName")
            .limit(limit)

        res.status(200).send({ shops, done: true });
    } catch (error) {
        const err = new Error("مشکلی پیش آمده : ", error);
        err.statusCode = 500;
        throw err;
    }
};

export default searchShops;
