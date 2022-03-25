import mongoDb from "../../../src/lib/mongoDb";
import ShopTypesModel from "../../../src/models/ShopTypes";

const shopTypeByName = async (req, res) => {
  try {
    await mongoDb();
    const { name } = req.query;
    const shopType = await ShopTypesModel.findOne({
     $or: [{type: name}, {categories: name}]
    })
    res.status(200).send({ shopType });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default shopTypeByName;
