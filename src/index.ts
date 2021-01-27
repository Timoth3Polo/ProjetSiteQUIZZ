import "reflect-metadata";
import Express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";

import { EleveController } from "./controllers/EleveController";
import { ProfesseurController } from "./controllers/ProfesseurController";
import { authCheckMiddleware } from "./middleware/authCheckMiddleware";

//Instance Express
const app = Express();

app.use(cors());
app.use(bodyParser.json());

//Instance Controllers
const eleveController = new EleveController();
const professeurController = new ProfesseurController();

//Root for Eleve
app.post("/api/newEleve", eleveController.createEleve);
app.get("/api/Eleve/Courant", authCheckMiddleware, eleveController.getEleveCourant);
app.patch("/api/Eleve/Patch", authCheckMiddleware, eleveController.patchEleve);
app.delete("/api/Eleve/Delete/:id", authCheckMiddleware, eleveController.deleteEleve);
app.post("/api/loginEleve", eleveController.loginEleve)

//Root for Professeur
app.post("/api/newProfesseur", professeurController.createProfesseur);
app.get("/api/professeurCourant", professeurController.getProfesseurCourant);
app.patch("/api/patchProfesseur", professeurController.patchProfesseur);
app.delete("/api/deleteProfesseur/:id", professeurController.deleteProfesseur);

//Serv connection
const StartServer = async() => {
    await createConnection();
    app.listen(4000, ()=> {
        console.log("Server started (4000) : Hello world !");
    });
}

StartServer();