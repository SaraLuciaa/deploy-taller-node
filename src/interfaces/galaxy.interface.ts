import mongoose from "mongoose";

export interface GalaxyDocument extends mongoose.Document {
    name: string;
    description: string;
    state: string;
    tagetTemperature: number;
    targetPH: number;
    maxDurationHours: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface GalaxyInput{
    name: string;
    description: string;
    state: string;
    tagetTemperature: number;
    targetPH: number;
    maxDurationHours: number;
}

export interface GalaxyInputUpdate{
    name?: string;
    description?: string;
    state?: string;
    tagetTemperature?: number;
    targetPH?: number;
    maxDurationHours?: number;
}