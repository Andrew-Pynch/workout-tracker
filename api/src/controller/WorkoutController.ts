import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Workouts } from "../entity/Workout";

export class WorkoutsController {
  private workoutsRepository = getRepository(Workouts);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.workoutsRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.workoutsRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.workoutsRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let workoutToRemove = await this.workoutsRepository.findOne(
      request.params.id
    );
    await this.workoutsRepository.remove(workoutToRemove);
  }
}
