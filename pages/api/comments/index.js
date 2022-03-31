import mongoDb from "../../../src/lib/mongoDb";
import CommentModel from "../../../src/models/Comment";
import {getUser} from "../../../src/utils/apiHelprs";

const userComment = async (req, res) => {
  try {
    await mongoDb();
    const userInfo = getUser(req.headers.authorization)
    const comments = await CommentModel.find({ userId: userInfo._id });
    res.status(200).send({ comments, message: "done" });
  } catch (error) {
    const err = new Error("مشکلی پیش آمده : ", error);
    err.statusCode = 500;
    throw err;
  }
};

export default userComment;
