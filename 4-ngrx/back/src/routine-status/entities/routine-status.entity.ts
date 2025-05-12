import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Routine } from 'src/routine/entities/routine.entity';

@Entity()
export class RoutineStatus {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Routine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'routineId' })
  routine: Routine;

  @Column()
  routineId: string;

  @Column('simple-json', { default: '[]' })
  doneOccurrences: number[];

  @CreateDateColumn()
  timestamp: string;

  @Column()
  periodKey: string;
}
