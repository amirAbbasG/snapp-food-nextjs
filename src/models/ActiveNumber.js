import { Schema, model } from "mongoose";

const ActiveNumberSchema = new Schema({
  number: { type: String, required: true, max: 11, min: 11, unique: true },
});

const ActiveNumberModel = model("activeNumberSchemas", ActiveNumberSchema);

export default ActiveNumberModel;
