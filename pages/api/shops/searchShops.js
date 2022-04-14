import mongoDb from "../../../src/lib/mongoDb";
import {FoodModel, ShopModel, CommentModel} from "../../../src/models"

const searchShops = async (req, res) => {
    try {
        await mongoDb();

        const {filter, limit} = req.query


        let shops = await ShopModel
            .find()
            .or([
                {shopName: {$regex: filter}},
                {category: {$regex: filter}},
                {shopType: {$regex: filter}}
            ]).limit(limit).select( limit === "7" ? "shopName" : "-userNumber -userPassword -ownerFullName")
            .populate(limit !== "7" && { path: "comments", select: "score -_id", model: CommentModel})
            .populate(limit !== "7" && { path: "foods", select: "price discount -_id", model: FoodModel })


        res.status(200).send({ shops, done: true });
    } catch (error) {
        const err = new Error("مشکلی پیش آمده : ", error);
        err.statusCode = 500;
        throw err;
    }
};

export default searchShops;
