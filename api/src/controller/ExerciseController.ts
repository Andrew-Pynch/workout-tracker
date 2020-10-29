import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Exercise } from "../entity/Exercise";

export class ExerciseController {
  private ExerciseRepository = getRepository(Exercise);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.ExerciseRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.ExerciseRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.ExerciseRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let exerciseToRemove = await this.ExerciseRepository.findOne(
      request.params.id
    );
    await this.ExerciseRepository.remove(exerciseToRemove);
  }
}
