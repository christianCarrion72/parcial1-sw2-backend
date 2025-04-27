import { Archivo } from 'src/archivo/entities/archivo.entity';
import { DanoFisico } from 'src/dano-fisico/entities/dano-fisico.entity';
import { FallaMecanica } from 'src/falla-mecanica/entities/falla-mecanica.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'char' }) // Físico o Sonido
  tipo: string;

  @OneToOne(() => Vehiculo, (vehiculo) => vehiculo.evaluacion)
  @JoinColumn()
  vehiculo: Vehiculo;

  @OneToMany(() => DanoFisico, (danoFisico) => danoFisico.evaluacion)
  danosFisicos: DanoFisico[];

  @OneToMany(() => FallaMecanica, (fallaMecanica) => fallaMecanica.evaluacion)
  fallasMecanicas: FallaMecanica[];

  @OneToMany(() => Archivo, (archivo) => archivo.evaluacion)
  archivos: Archivo[];

  @DeleteDateColumn()
    deletedAt: Date;
}
