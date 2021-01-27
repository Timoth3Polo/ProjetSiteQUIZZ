//import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { Professeur } from "../models/Professeur";
import { hash, compare } from "bcrypt";
import "dotenv/config";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

export class ProfesseurController {

    //Create Professeur
    async createProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const body: Professeur = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }

        const newProfesseur = Professeur.create(body);
        if(!newProfesseur)
        {
            res.sendStatus(400);
            return;
        }

        res.json(await newProfesseur.save());
    }

    //Prend l'info du Professeur courant
    async getProfesseurCourant(req: Request, res: Response, next: NextFunction)
    {
        const professeurId = (req as any).id;
        if(!professeurId)
        {
            res.sendStatus(400);
            return;
        }

        const me = await Professeur.findOne(professeurId);
        if(!me)
        {
            res.sendStatus(400);
            return;
        }

        return res.json(me);
    }

    //Update du Professeur courant
    async patchProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const professeurId = (req as any).id;
        if(!professeurId)
        {
            res.sendStatus(400);
            return;
        }

        const body: Professeur = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }

        const me = await Professeur.findOne(professeurId);
        if(!me)
        {
            res.sendStatus(400);
            return;
        }

        const professeurRepository = getRepository(Professeur);
        if(!professeurRepository)
        {
            res.sendStatus(400);
            return;
        }

        await professeurRepository.update(me.id, body);
        return res.json(await professeurRepository.findOne(me.id));
    }

    //Delete du Professeur courant
    async deleteProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const professeurIdToDelete = req.params.id;
        if(!professeurIdToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const professeurToDelete = await Professeur.findOne(professeurIdToDelete);
        if(!professeurToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const professeurRepository = getRepository(Professeur);
        if(!professeurRepository)
        {
            res.sendStatus(400);
            return;
        }

        professeurRepository.delete(professeurToDelete.id);
        return res.json({message: `Le professeur avec l'id ${professeurIdToDelete} est supprimé.`});
    }
}