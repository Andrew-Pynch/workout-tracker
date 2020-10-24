import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Workouts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  exerciseId: number;

  @Column()
  estimatedWeight: number;

  @Column()
  estimatedSets: number;

  @Column()
  estimatedReps: number;

  @Column()
  actualWeight: number;

  @Column()
  actualSets: number;

  @Column()
  actualReps: number;

  @Column()
  workoutDuration: number;

  @Column()
  notes: string;
}
