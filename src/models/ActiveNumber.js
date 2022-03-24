import { Schema, model, models } from "mongoose";

const ActiveNumberSchema = new Schema({
  number: { type: String, required: true, max: 11, min: 11, unique: true },
});



export default models.activeNumberSchemas ||  model("activeNumberSchemas", ActiveNumberSchema);


