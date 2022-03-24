import mongoDb from "../../../src/lib/mongoDb";
import ShopTypesModel from "../../../src/models/ShopTypes";

const shopTypeById = async (req, res) => {
  try {
    await mongoDb();
    const { id } = req.query;
    console.log({id})
    const shopType = await ShopTypesModel.findById(id)
    res.status(200).send({ shopType });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default shopTypeById;
