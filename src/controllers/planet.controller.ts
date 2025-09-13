import { Request, Response } from "express";
import { PlanetDocument } from "../interfaces";
import { PlanetInput, PlanetInputUpdate } from "../interfaces";
import { planetService } from "../services";

class PlanetController {
    public async create(req: Request, res: Response) {
        try {
            const newPlanet: PlanetDocument = await planetService.create(req.body as PlanetInput);
            res.status(201).json(newPlanet);
        } catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "Galaxy not found" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const planet: PlanetDocument | null = await planetService.getById(id);
            if (planet === null) {
                res.status(404).json({ message: `Planet with id ${id} not found` });
                return;
            }
            res.json(planet);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const planet: PlanetDocument | null = await planetService.update(id, req.body as PlanetInputUpdate);
            if (planet === null) {
                res.status(404).json({ message: `Planet with id ${id} not found` });
                return;
            }
            res.json(planet);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const deleted: boolean = await planetService.delete(id);
            if (!deleted) {
                res.status(404).json({ message: `Planet with id ${id} not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getByGalaxyId(req: Request, res: Response) {
        try {
            const galaxyId: string = req.params.galaxyId || "";
            const planets: PlanetDocument[] = await planetService.getByGalaxyId(galaxyId);
            res.json(planets);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const planetController = new PlanetController();
