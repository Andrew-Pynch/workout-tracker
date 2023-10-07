-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema workout_tracker_new
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema workout_tracker_new
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workout_tracker_new` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `workout_tracker_new` ;

-- -----------------------------------------------------
-- Table `workout_tracker_new`.`bodygroup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workout_tracker_new`.`bodygroup` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `workout_tracker_new`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workout_tracker_new`.`user` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NULL DEFAULT NULL,
  `LastName` VARCHAR(45) NULL DEFAULT NULL,
  `Email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `workout_tracker_new`.`exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workout_tracker_new`.`exercise` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `BodyGroupId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `Name` VARCHAR(150) NULL DEFAULT NULL,
  `Description` TEXT NULL DEFAULT NULL,
  `ExampleVideo` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_exercise_user_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_exercise_bodygroup1_idx` (`BodyGroupId` ASC) VISIBLE,
  CONSTRAINT `fk_exercise_user`
    FOREIGN KEY (`UserId`)
    REFERENCES `workout_tracker_new`.`user` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercise_bodygroup1`
    FOREIGN KEY (`BodyGroupId`)
    REFERENCES `workout_tracker_new`.`bodygroup` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `workout_tracker_new`.`workoutlog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workout_tracker_new`.`workoutlog` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `BodyGroupId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `ExerciseId` INT NOT NULL,
  `Date` DATE NULL DEFAULT NULL,
  `Time` TIME NULL DEFAULT NULL,
  `Weight` FLOAT NULL DEFAULT NULL,
  `Sets` FLOAT NULL DEFAULT NULL,
  `Reps` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_workoutlog_user1_idx` (`UserId` ASC) VISIBLE,
  INDEX `fk_workoutlog_bodygroup1_idx` (`BodyGroupId` ASC) VISIBLE,
  CONSTRAINT `fk_workoutlog_user1`
    FOREIGN KEY (`UserId`)
    REFERENCES `workout_tracker_new`.`user` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_workoutlog_bodygroup1`
    FOREIGN KEY (`BodyGroupId`)
    REFERENCES `workout_tracker_new`.`bodygroup` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '										\\n\\n\\n\\n';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
