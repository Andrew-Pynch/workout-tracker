import { UserController } from "./controller/UserController";
import { BodyGroupController } from "./controller/BodyGroupController";
import { ExerciseController } from "./controller/ExerciseController";
import { WorkoutController } from "./controller/WorkoutController";

export const Routes = [
  //#region USERROUTES
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  //#endregion
  //#region BODYGROUPROUTES
  {
    method: "get",
    route: "/bodyGroups",
    controller: BodyGroupController,
    action: "all",
  },
  {
    method: "get",
    route: "/bodyGroups/:id",
    controller: BodyGroupController,
    action: "one",
  },
  {
    method: "post",
    route: "/bodyGroups",
    controller: BodyGroupController,
    action: "save",
  },
  {
    method: "delete",
    route: "/bodyGroups/:id",
    controller: BodyGroupController,
    action: "remove",
  },
  //#endregion
  //#region EXERCISEROUTES
  {
    method: "get",
    route: "/exercises",
    controller: ExerciseController,
    action: "all",
  },
  {
    method: "get",
    route: "/exercises/:id",
    controller: ExerciseController,
    action: "one",
  },
  {
    method: "post",
    route: "/exercises",
    controller: ExerciseController,
    action: "save",
  },
  {
    method: "delete",
    route: "/exercises/:id",
    controller: ExerciseController,
    action: "remove",
  },
  //#endregion
  //#region WORKOUTSROUTES
  {
    method: "get",
    route: "/workouts",
    controller: WorkoutController,
    action: "all",
  },
  {
    method: "get",
    route: "/workouts/:id",
    controller: WorkoutController,
    action: "one",
  },
  {
    method: "post",
    route: "/workouts",
    controller: WorkoutController,
    action: "save",
  },
  {
    method: "delete",
    route: "/workouts/:id",
    controller: WorkoutController,
    action: "remove",
  },
  //#endregion
];
