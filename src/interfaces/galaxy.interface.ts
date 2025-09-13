import mongoose from "mongoose";
import { UserDocument } from "./user.interface";

export interface GalaxyDocument extends mongoose.Document {
    name: string, 
    type: string,
    distance_ly: number,
    mass_estimate_solar: number,
    stars_estimate: number,
    constellation: string,
    discovered_by: string,
    discovery_year: number,
    description: string,
    createdBy: UserDocument;
    createdAt: Date,
    updatedAt: Date,
}

export interface GalaxyInput{
    name: string, 
    type: string,
    distance_ly: number,
    mass_estimate_solar: number,
    stars_estimate: number,
    constellation: string,
    discovered_by: string,
    discovery_year: number,
    description: string,
    createdBy: string;
}

export interface GalaxyInputUpdate{
    name?: string, 
    type?: string,
    distance_ly?: number,
    mass_estimate_solar?: number,
    stars_estimate?: number,
    constellation?: string,
    discovered_by?: string,
    discovery_year?: number,
    description?: string,
}