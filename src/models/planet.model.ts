import mongoose from "mongoose";
import { PlanetDocument } from "../interfaces";
import { CategoryPlanet } from "../enumerations";

const PlanetSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: Object.values(CategoryPlanet), required: true },
  galaxyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Galaxy', required: true },                      
  mass_earth: { type: Number, min: 0 },
  radius_km: { type: Number, min: 0 },
  temperature_k: { type: Number, min: 0 }, 
  has_life: { type: Boolean, default: false },
  moons_count: { type: Number, min: 0, default: 0 },
  discovery_year: { type: Number, min: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {  timestamps: true, collection: 'planets'});

export const PlanetModel = mongoose.model<PlanetDocument>("Planet", PlanetSchema)