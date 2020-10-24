import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Exercises {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercise: string;

  @Column()
  description: string;

  @Column()
  bodyGroupId: number;

  @Column()
  exerciseExample: string;
}
