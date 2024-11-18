import express from "express";
import { TaskController } from "./controllers/TaskController.js";

export const router = express.Router();

router.post('/', TaskController.insertTask);
router.put('/:idTask', TaskController.updateTask);
router.patch('/:idTask/status', TaskController.updateStatusTask);
router.get('/', TaskController.selectTasksController);
router.get('/:idTask', TaskController.selectTaskController);
router.delete('/:idTask', TaskController.deleteTaskController);
