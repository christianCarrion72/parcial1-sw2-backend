import { Evaluacion } from '../../evaluacion/entities/evaluacion.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  año: number;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.vehiculo)
  evaluacion: Evaluacion;

  @DeleteDateColumn()
  deletedAt: Date;
}
