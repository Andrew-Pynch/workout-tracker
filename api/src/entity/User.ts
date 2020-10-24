import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Workouts } from "./Workouts";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;
}
