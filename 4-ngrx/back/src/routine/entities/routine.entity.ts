import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Routine {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startingDate: Date;

    @Column()
    endingDate: Date;

    @Column()
    reccurence: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

    @Column()
    reccurenceCoef: number;
}