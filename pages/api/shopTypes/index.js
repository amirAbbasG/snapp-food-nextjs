import mongoDb from "../../../src/lib/mongoDb";
import {ShopTypesModel} from "../../../src/models";

const getShopTypes = async (req, res) => {

  try {
    await mongoDb();

    const shopTypes = await ShopTypesModel.find();
    res.status(200).send({ shopTypes });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default getShopTypes;
