import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoutineStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  routineId: string;

  @Column('simple-json', { default: '[]' })
  doneOccurrences: number[];

  @Column()
  timestamp: string;

  @Column()
  periodKey: string;
}
