import bcrypt from "bcrypt";

import { UserInput, UserInputUpdate, UserDocument } from "../interfaces";
import { UserModel } from "../models";

class UserService {
    public async create(userInput: UserInput): Promise<UserDocument> {

        process.loadEnvFile();

        const userExists: UserDocument | null = await this.findByEmail(userInput.email);
        if (userExists !== null) {
            throw new ReferenceError("User already exists");
        }

        const newUser = JSON.parse(JSON.stringify(userInput));
        if (newUser.password) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
        }

        const createUser = await UserModel.create(newUser);

        const userWithoutPassword = createUser.toObject();
        delete (userWithoutPassword as { password?: string }).password;

        return userWithoutPassword;
    }

    public findByEmail(email: string, password: boolean = false): Promise<UserDocument | null> {
        return UserModel.findOne({ email }).select(password ? '+password' : '-password');
    }

    public async update(id: string, userInput: UserInputUpdate): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate(
                { _id: id },
                userInput,
                { returnOriginal: false }
            );

            return user;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<UserDocument[]> {
        return UserModel.find({ deletedAt: null });
    }

    public getById(id: string): Promise<UserDocument | null> {
        return UserModel.findById(id);
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() })
            return result !== null;
        } catch (error) {
            throw error;
        }
    }

}

export const userService = new UserService();