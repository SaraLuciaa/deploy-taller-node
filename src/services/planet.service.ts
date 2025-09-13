import { PlanetInput, PlanetInputUpdate, PlanetDocument } from "../interfaces";
import { GalaxyModel } from "../models/galaxy.model";
import { PlanetModel } from "../models/planet.model";

class PlanetService {
    public async create(planetInput: PlanetInput): Promise<PlanetDocument> {
        const galaxyExists = await GalaxyModel.findById(planetInput.galaxyId);
        if (!galaxyExists) {
            throw new ReferenceError("Galaxy not found");
        }

        return PlanetModel.create(planetInput);
    }

    public async update(id: string, planetInput: PlanetInputUpdate): Promise<PlanetDocument | null> {
        try {
            const planet: PlanetDocument | null = await PlanetModel.findOneAndUpdate(
                { _id: id },
                planetInput,
                { returnOriginal: false }
            );

            return planet;
        } catch (error) {
            throw error;
        }
    }

    public getByGalaxyId(galaxyId: string): Promise<PlanetDocument[]> {
        return PlanetModel.find({ galaxyId: galaxyId });
    }

    public async getByUserId(userId: string): Promise<PlanetDocument[]> {
        return PlanetModel.find({ createdBy: userId });
    }
    
    public getById(id: string): Promise<PlanetDocument | null> {
        return PlanetModel.findById(id);
    }

    public async delete(id: string): Promise<boolean> {
        try {
            const result = await PlanetModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            throw error;
        }
    }
}

export const planetService = new PlanetService();