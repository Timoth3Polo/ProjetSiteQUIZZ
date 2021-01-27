import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToOne
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Groupe } from "./Groupe";
import { Cours } from "./Cours";

@Entity()
export class ParticipantQuizz extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    quizzTerminer: boolean;

    @Column()
    datePassage: Date;

    @Column()
    dureeQuizz: number;

    //Foreign Key Cours
    @ManyToOne(() => Cours, cours => cours.lesParticipantsQuizzCours)
    cours: Cours;

    //Foreign Key Groupe
    @ManyToOne(() => Groupe, groupe => groupe.lesParticipantsQuizzGroupe)
    groupe: Groupe;
}