import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BodyGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bodyGroup: string;

  @Column()
  description: string;
}
