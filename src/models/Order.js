import { Schema, model, models } from "mongoose";
import AddressSchema from "./Address";
import CouponSchema from "./Coupon";

const OrderSchema = new Schema({
  shopId: { type: Schema.Types.ObjectId, ref: "shops", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  foods: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true, min: 3 },
      price: { type: Number, required: true },
      shopId: { type: Schema.Types.ObjectId, ref: "shops" },
      discount: { type: Number, default: 0, max: 100 },
      foodImage: { type: String },
      count: { type: Number, default: 1 },
    },
  ],
  address: AddressSchema,
  amount: { type: Number, required: true },
  amountByDiscount: { type: Number, required: true },
  createDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
  usedCoupon: CouponSchema,
});


export default models.orders || model("orders", OrderSchema);
