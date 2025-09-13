import mongoose from "mongoose";

export interface UserInput {
    name: string,
    email: string,
    password: string
}

export interface UserInputUpdate {
    name: string,
    email: string,
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    roles: UserRole[];
} 

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}