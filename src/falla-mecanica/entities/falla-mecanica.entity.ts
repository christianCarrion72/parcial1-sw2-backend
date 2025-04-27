import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FallaMecanica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column({ type: 'char' })
  urgencia: string; // baja, media, alta

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.fallasMecanicas)
  evaluacion: Evaluacion;

  @DeleteDateColumn()
  deletedAt: Date;
}
