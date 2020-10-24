import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { BodyGroup } from "./entity/BodyGroups";
import { Exercises } from "./entity/Exercises";
import { Workouts } from "./entity/Workouts";

createConnection()
  .then(async (connection) => {})
  .catch((error) => console.log(error));

function initTables(insertRecords: boolean) {
  console.log("Inserting Andrew into the database");
  const andrew = new User();
  andrew.firstName = "Andrew";
  andrew.lastName = "Pynch";
  andrew.email = "andrewpynchbusiness@gmail.com";
  andrew.age = 18;
}
