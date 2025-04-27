import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Archivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; // enlace al archivo en S3/Firebase

  @Column({ type: 'char' })
  tipo: string; // imagen o audio

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.archivos)
  evaluacion: Evaluacion;

  @DeleteDateColumn()
  deletedAt: Date;
}
