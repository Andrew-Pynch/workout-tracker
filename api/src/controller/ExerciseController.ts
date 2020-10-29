import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Exercises } from "../entity/Exercise";

export class ExercisesController {
  private ExercisesRepository = getRepository(Exercises);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.ExercisesRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.ExercisesRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.ExercisesRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let exerciseToRemove = await this.ExercisesRepository.findOne(
      request.params.id
    );
    await this.ExercisesRepository.remove(exerciseToRemove);
  }
}
