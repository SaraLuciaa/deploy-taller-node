
import mongoose from "mongoose";
import { CategoryPlanet } from "../enumerations";

export interface PlanetDocument extends mongoose.Document {
    name: string;
    category: CategoryPlanet;
    galaxyId: mongoose.Types.ObjectId;                      
    mass_earth: number;
    radius_km: number;
    temperature_k: number; 
    has_life: boolean;
    moons_count: number;
    discovery_year: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface PlanetInput {
    name: string;
    category: CategoryPlanet;
    galaxyId: mongoose.Types.ObjectId;                      
    mass_earth: number;
    radius_km: number;
    temperature_k: number; 
    has_life: boolean;
    moons_count: number;
    discovery_year: number;
    createdBy: mongoose.Types.ObjectId;
}

export interface PlanetInputUpdate {
    name?: string;
    category?: CategoryPlanet;
    galaxyId?: mongoose.Types.ObjectId;                      
    mass_earth?: number;
    radius_km?: number;
    temperature_k?: number; 
    has_life?: boolean;
    moons_count?: number;
    discovery_year?: number;
    createdBy?: mongoose.Types.ObjectId;
}