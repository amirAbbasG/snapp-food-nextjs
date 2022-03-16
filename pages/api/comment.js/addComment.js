import mongoDb from "../../../src/lib/mongoDb";
import CommentModel from "../../../src/models/Comment";
import FoodModel from "../../../src/models/Food";
import { commentValidator } from "../../../src/validators/UserValidator";

const addComment = async (req, res) => {
  if (req.method === "POST") {
    await mongoDb();

    const { error } = commentValidator(req.body);
    if (error) {
      const err = new Error(error.message);
      err.statusCode = 400;
      throw err;
    }
    const { text, score } = req.body;

    const newComment = {
      sender: req.user.fullName,
      text,
      score,
      createDate: Date.now(),
    };
    const addComment = await new CommentModel(newComment);

    const food = await FoodModel.findOne({ _id: req.params.id });
    if (food) {
      food.comments.push(addComment._id);
      await food.save();
    } else {
      const shop = await ShopModel.findOne({ _id: req.params.id });
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
  }
};

export default addComment;
