import { Schema, model } from "mongoose";
import AddressSchema from "./Address";
import CouponSchema from "./Coupon";
import jwt from "@tsndr/cloudflare-worker-jwt";

const ShopSchema = new Schema({
  shopType: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  foods: [{ type: Schema.Types.ObjectId, ref: "foods" }],
  shopName: { type: String, required: true, min: 3 },
  ownerFullName: { type: String, required: true, min: 3 },
  userNumber: { type: String, required: true, max: 11, min: 11 },
  userPassword: { type: String, required: true, min: 4 },
  comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  address: AddressSchema,
  shopImage: { type: String, default: "restaurant_icon.png" },
  shopLogo: { type: String, default: "default-shop-logo.jpg" },
  coupons: [CouponSchema],
  deliveryCost: { type: Number, default: 0 },
});

ShopSchema.methods.getAuthToken = function () {
  const data = {
    userNumber: this.userNumber,
    ownerFullName: this.ownerFullName,
    _id: this._id,
    role: "shopAdmin",
  };
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "36h",
  });
};
const ShopModel = model("shops", ShopSchema);
module.exports = ShopModel;
