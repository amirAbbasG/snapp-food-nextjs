import { Schema, model } from "mongoose";

const schema = new Schema({}, { strict: false });
const ShopTypes = model("ShopTypes", schema, "ShopTypes");

module.exports = ShopTypes;
