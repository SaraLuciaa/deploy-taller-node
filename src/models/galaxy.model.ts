import mongoose from "mongoose";
import { GalaxyDocument } from "../interfaces";
import { TypeGalaxy } from "../enumerations/galaxy.enumeration";

const GalaxySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: Object.values(TypeGalaxy), required: true },
    distance_ly: { type: Number, min: 0 },
    mass_estimate_solar: { type: Number, min: 0 },
    stars_estimate: { type: Number, min: 0 }, 
    constellation: { type: String, trim: true },
    discovered_by: { type: String, trim: true },
    discovery_year: { type: Number, min: 0 },
    description: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, collection: 'galaxies' });

export const GalaxyModel = mongoose.model<GalaxyDocument>("Galaxy", GalaxySchema);