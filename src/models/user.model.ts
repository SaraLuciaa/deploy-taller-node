import mongoose from "mongoose";
import { UserDocument } from "../interfaces";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    deletedAt: { type: Date, default: null }
}, { timestamps: true, collection: 'users' })

export const UserModel = mongoose.model<UserDocument>("User", userSchema); 