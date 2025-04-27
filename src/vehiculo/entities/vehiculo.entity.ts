import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Column, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToOne(() => Evaluacion, (evaluacion) => evaluacion.vehiculo)
  evaluacion: Evaluacion;

  @DeleteDateColumn()
  deletedAt: Date;
}
