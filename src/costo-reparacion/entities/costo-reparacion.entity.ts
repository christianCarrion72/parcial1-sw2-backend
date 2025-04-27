import { DanoFisico } from 'src/dano-fisico/entities/dano-fisico.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CostoReparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_daño: string; // abolladura, rayón, etc.

  @Column()
  rango_precio: string; // ejemplo: "$50–$100"

  @ManyToOne(() => DanoFisico, (danoFisico) => danoFisico.costosReparacion)
  danoFisico: DanoFisico;

  @DeleteDateColumn()
  deletedAt: Date;
}
