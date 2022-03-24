import { Schema, model, models } from "mongoose";

const schema = new Schema({}, { strict: false });

export default models.ShopTypes ||  model("ShopTypes", schema, "ShopTypes")
