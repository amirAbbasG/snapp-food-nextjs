import mongoDb from "../../../src/lib/mongoDb";
import CommentModel from "../../../src/models/Comment";
import FoodModel from "../../../src/models/Food";
import { commentValidator } from "../../../src/validators/UserValidator";
import {getUser} from "../../../src/utils/apiHelprs";

const addComment = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { error } = commentValidator(req.body);
      if (error) {
        const err = new Error(error.message);
        err.statusCode = 400;
        throw err;
      }
      const { text, score, id } = req.body;
      const userInfo = getUser(req.headers.authorization)
      const newComment = {
        sender: userInfo.fullName,
        text,
        score,
        createDate: Date.now(),
      };
      const addComment = await new CommentModel(newComment);

      const food = await FoodModel.findOne({ _id: id });
      if (food) {
        food.comments.push(addComment._id);
        await food.save();
      } else {
        const shop = await ShopModel.findOne({ _id: id });
        if (shop) {
          shop.comments.push(addComment._id);
          await shop.save();
        } else {
          const err = new Error("غدا یا رستوران مورد نطر پیدا نشد");
          err.statusCode = 400;
          throw err;
        }
      }
      await addComment.save();
      res.status(201).send({ message: "done", comment: addComment });
    } catch (error) {
      const err = new Error("مشکلی پیش آمده : ", error);
      err.statusCode = 500;
      throw err;
    }
    await mongoDb();
  }
};

export default addComment;
