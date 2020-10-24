import "reflect-metadata";
import { ConnectionManager, createConnection } from "typeorm";
import { User } from "./entity/User";
import { BodyGroup } from "./entity/BodyGroups";
import { Exercises } from "./entity/Exercises";
import { Workouts } from "./entity/Workouts";

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));
