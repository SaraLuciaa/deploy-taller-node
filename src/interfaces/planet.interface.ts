
import mongoose from "mongoose";

export interface PlanetDocument extends mongoose.Document {
    galaxyId: string;
    startDate: Date;
    endDate: Date;
    operatorUsername: string;
    status: string;
    notes: string;
    measuredPH: number;
    measuredTemperature: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface PlanetInput {
    galaxyId: string;
    startDate: Date;
    endDate: Date;
    operatorUsername: string;
    status: string;
    notes: string;
    measuredPH: number;
    measuredTemperature: number;
}

export interface PlanetInputUpdate {
    startDate?: Date;
    endDate?: Date;
    operatorUsername?: string;
    status?: string;
    notes?: string;
    measuredPH?: number;
    measuredTemperature?: number;
}