-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema projeto_todo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema projeto_todo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projeto_todo` DEFAULT CHARACTER SET utf8 ;
USE `projeto_todo` ;

-- -----------------------------------------------------
-- Table `projeto_todo`.`task`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_todo`.`task` (
  `idTask` INT NOT NULL AUTO_INCREMENT,
  `task` VARCHAR(255) NULL,
  `statusTask` VARCHAR(20) NULL,
  PRIMARY KEY (`idTask`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
