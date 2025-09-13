import { Request, Response } from "express";
import { GalaxyDocument, GalaxyInput, GalaxyInputUpdate } from "../interfaces";
import { galaxyService } from "../services/galaxy.service";

class GalaxyController {
    public async create(req: Request, res: Response) {
        try {
            const newGalaxy: GalaxyDocument = await galaxyService.create(req.body as GalaxyInput);
            res.status(201).json(newGalaxy);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const galaxys: GalaxyDocument[] = await galaxyService.getAll();
            res.json(galaxys);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const galaxy: GalaxyDocument | null = await galaxyService.getById(id);
            if (galaxy === null) {
                res.status(404).json({ message: `Galaxy with id ${id} not found` });
                return;
            }
            res.json(galaxy);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const galaxy: GalaxyDocument | null = await galaxyService.update(id, req.body as GalaxyInputUpdate);
            if (galaxy === null) {
                res.status(404).json({ message: `Galaxy with id ${id} not found` });
                return;
            }
            res.json(galaxy);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const deleted: boolean = await galaxyService.delete(id);
            if (!deleted) {
                res.status(404).json({ message: `Galaxy with id ${id} not found` });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export const galaxyController = new GalaxyController();