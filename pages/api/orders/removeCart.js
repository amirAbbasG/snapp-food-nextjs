import mongoDb from "../../../src/lib/mongoDb";
import OrderModel from "../../../src/models/Order";

const removeCart = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      await mongoDb();

      const { orderId } = req.query;

      if (!orderId) {
        const err = new Error("سفارش مورد نطر پیدا نشد");
        err.statusCode = 404;
        throw err;
      }

      const result = await OrderModel.deleteOne({ _id: orderId });
      if (result.deletedCount != 0) {
        res.status(200).send({ message: "done" });
      } else {
        const error = new Error("حذف نشد");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
  }
};

export default removeCart;
