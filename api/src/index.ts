import "reflect-metadata";
import { ConnectionManager, createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Exercise } from "./entity/Exercise";

createConnection()
  .then(async (connection) => {
    const fs = require("fs");
    const express = require("express");
    const https = require("https");
    const port = 3000;

    var options = {
      key: fs.readFileSync("./src/key.pem"),
      cert: fs.readFileSync("./src/cert.pem"),
    };

    const app = express();
    app.get("/", (req, res) => {
      res.send("Now using https..");
    });
    var server = https.createServer(options, app);

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    server.listen(3000);

    //#region EXAMPLE INSERT
    // insert new users for test
    // await connection.manager.save(
    //   connection.manager.create(Exercise, {
    //     userId: 1,
    //     exercise: "Bench Press",
    //     description: "Standard Bench Press",
    //     bodyGroupId: 1,
    //   })
    // );
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));
    //#endregion

    console.log(
      "Express server has started on port 3000. Open https://localhost:3000/ to see results"
    );
  })
  .catch((error) => console.log(error));
