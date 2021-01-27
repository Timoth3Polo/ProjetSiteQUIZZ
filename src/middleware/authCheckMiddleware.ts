import  { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { verify } from "jsonwebtoken";

export const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader)
    {
        res.sendStatus(400);
        return;
    }

    const [Bearer, token] = authHeader.split(" ");

    try
    {
        //à revoir
        const eleveInfo: any = verify(token, (process.env.JWT_SECRET as string));
        Object.assign(req, {eleveId: eleveInfo.id})
    }
    catch(error)
    {
        return res.sendStatus(400);
    }

    console.log("16");
    return next();
}