import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { BodyGroups } from "../entity/BodyGroup";

export class BodyGroupsController {
  private BodyGroupsRepository = getRepository(BodyGroups);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupsRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupsRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.BodyGroupsRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let bodyGroupToRemove = await this.BodyGroupsRepository.findOne(
      request.params.id
    );
    await this.BodyGroupsRepository.remove(bodyGroupToRemove);
  }
}
