import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    } from "typeorm";

import { IsDefined, Length, IsDate, IsEmail } from "class-validator";
import { Cours } from "./Cours";
import { Groupe } from "./Groupe";
import { Quizz } from "./Quizz";

@Entity()
export class Professeur extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    @IsDefined()
    nom: string;

    @Column()
    @IsDefined()
    prenom: string;

    @Column()
    @IsDefined()
    password: string;

    @Column()
    @IsDate()
    @IsDefined()
    dateDeNaissance: Date;

    @Column()
    @Length(10)
    @IsDefined()
    telephone: string;

    @Column()
    @IsEmail()
    @IsDefined()
    mail: string;

    //Foreign Key Cours
    @OneToMany(() => Cours, (cours) => cours.professeur)
    createCours: [Cours];

    //Foreign Key Groupe
    @OneToMany(() => Groupe, (groupe) => groupe.professeur)
    createGroupe: [Groupe];

    //Foreign Key Quizz
    @OneToMany(() => Quizz, (quizz) => quizz.professeur)
    createQuizz: [Quizz];

    //Foreign Key Quizz

}