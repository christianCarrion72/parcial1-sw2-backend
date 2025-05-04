import { Evaluacion } from "@/evaluacion/entities/evaluacion.entity";
import { MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Historial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MaxLength(7)
    placa: string;

    @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.historial)
    evaluaciones: Evaluacion[];
}
