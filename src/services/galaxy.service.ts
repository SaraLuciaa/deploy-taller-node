// Create, FindAll, FindById, DeleteById, UpdateById
import { GalaxyInput, GalaxyInputUpdate, GalaxyDocument } from "../interfaces";
import { GalaxyModel, UserModel } from "../models";

class GalaxyService {
    public async getByUserId(userId: string): Promise<GalaxyDocument[]> {
        return GalaxyModel.find({ createdBy: userId });
    }
    public async create(galaxyInput: GalaxyInput): Promise<GalaxyDocument> {
        const userExists = await UserModel.findById(galaxyInput.createdBy);
        if (!userExists) {
            throw new ReferenceError("User not found");
        }

        return GalaxyModel.create(galaxyInput);
    }

    public async update(id: string, galaxyInput: GalaxyInputUpdate): Promise<GalaxyDocument | null> {
        try {
            const galaxy: GalaxyDocument | null = await GalaxyModel.findOneAndUpdate(
                { _id: id },
                galaxyInput,
                { returnOriginal: false }
            );

            return galaxy;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<GalaxyDocument[]> {
        return GalaxyModel.find();
    }

    public getById(id: string): Promise<GalaxyDocument | null> {
        return GalaxyModel.findById(id);
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await GalaxyModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            throw error;
        }
    }
}

export const galaxyService = new GalaxyService();