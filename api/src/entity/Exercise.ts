import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Exercise {
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
