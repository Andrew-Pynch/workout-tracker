import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { BodyGroup } from "../entity/BodyGroup";

export class BodyGroupController {
  private BodyGroupRepository = getRepository(BodyGroup);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let bodyGroupToRemove = await this.BodyGroupRepository.findOne(
      request.params.id
    );
    await this.BodyGroupRepository.remove(bodyGroupToRemove);
  }
}
