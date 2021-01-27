import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Professeur } from './Professeur';
import { Eleve } from './Eleve';
import { ParticipantQuizz } from './ParticipantQuizz';
  
@Entity()
export class Cours extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    //Entities
    @Column()
    libelle: string;

    //Foreign Key Professeur
    @ManyToOne(() => Professeur, professeur => professeur.createCours)
    professeur: Professeur;

    //Foreign Key Eleve
    @ManyToMany(() => Eleve, eleve => eleve.coursAvoirEleve)
    eleveParticiperCours: Eleve[];

    //Foreign Key ParticipantQuizz
    @OneToMany(() => ParticipantQuizz, (participantQuizz) => participantQuizz.cours)
    lesParticipantsQuizzCours: [ParticipantQuizz];
}