import { CostoReparacion } from 'src/costo-reparacion/entities/costo-reparacion.entity';
import { Evaluacion } from 'src/evaluacion/entities/evaluacion.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DanoFisico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char' })
  tipo: string; // abolladura, rayón, grieta

  @Column()
  gravedad: string; // leve, moderado, severo

  @ManyToOne(() => Evaluacion, (evaluacion) => evaluacion.danosFisicos)
  evaluacion: Evaluacion;

  @OneToMany(() => CostoReparacion, (costo) => costo.danoFisico)
  costosReparacion: CostoReparacion[];

  @DeleteDateColumn()
  deletedAt: Date;
}
