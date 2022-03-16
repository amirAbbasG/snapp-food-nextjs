import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  score: { type: Number, min: 0, max: 5, default: 0 },
  createDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  replay: String,
});

const CommentModel = model("comments", CommentSchema);

export default CommentModel;
