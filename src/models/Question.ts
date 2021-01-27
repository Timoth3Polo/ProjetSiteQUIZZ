import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Reponse } from "./Reponse";

@Entity()
export class Question extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    laQuestion: string;

    @Column()
    nbPoint: number;

    @Column()
    niveau: number;

    //Foreign Key Réponse
    @ManyToOne(() => Reponse, reponse => reponse.lesReponses)
    reponse: Reponse;
}