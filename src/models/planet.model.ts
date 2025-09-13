import mongoose from "mongoose";
import { StatusPlanet } from "../enumerations";
import { PlanetDocument } from "../interfaces";

const planetSchema = new mongoose.Schema({
    galaxyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Galaxy', required: true },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    operatorUsername: { type: String, required: true },
    status: { type: [String], enum: Object.values(StatusPlanet), default: StatusPlanet.RUNNING },
    notes: { type: String },
    measuredPH: { type: Number },
    measuredTemperature: { type: Number },
}, { timestamps: true, collection: 'planet' })

export const PlanetModel = mongoose.model<PlanetDocument>("Planet", planetSchema)