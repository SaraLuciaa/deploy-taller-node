import mongoose from "mongoose";
import { GalaxyDocument } from "../interfaces";
import { StateGalaxy } from "../enumerations/galaxy.enumeration";

const galaxySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    state: { type: [String], enum: Object.values(StateGalaxy) },
    targetTemperature: { type: Number },
    targetPH: { type: Number },
    maxDurationHours: { type: Number },
}, { timestamps: true, collection: 'galaxy' })

export const GalaxyModel = mongoose.model<GalaxyDocument>("Galaxy", galaxySchema);  