import { Schema, model } from "mongoose";

const schema = new Schema({}, { strict: false });
const SupportedCities = model("supportedCities", schema, "supportedCities");

export default SupportedCities;
