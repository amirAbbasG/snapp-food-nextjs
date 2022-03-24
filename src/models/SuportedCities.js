import { Schema, model, models } from "mongoose";

const schema = new Schema({}, { strict: false });


export default models.supportedCities || model("supportedCities", schema, "supportedCities")
