import { Task } from "../models/Task.js";
import { z } from "zod";

const IdTaskSchema = z.number().positive("idTask must be a positive number");

const TaskBodySchema = z.object({
  task: z.string().min(1, "Task cannot be empty"),
  statusTask: z.enum(["doing", "done", "pending"]).optional()
});

const StatusTaskSchema = z.enum(["doing", "done", "pending"]);

export class TaskController {
  static async selectTasksController(request, response) {
    const tasks = await Task.findAll();
    return tasks.status
      ? response.status(200).json({ success: true, values: tasks.values })
      : response.status(500).json({ success: false, message: 'Failed to fetch tasks', error: tasks.error });
  }

  static async selectTaskController(request, response) {
    const idTask = Number(request.params.idTask);
    const validId = IdTaskSchema.safeParse(idTask);
    if (!validId.success) {
      return response.status(400).json({ success: false, message: validId.error.format() });
    }

    const task = await Task.findById(validId.data);
    return task.status
      ? response.status(200).json({ success: true, values: task.values })
      : task.status === undefined
        ? response.status(404).json({ success: false, message: 'Task not found' })
        : response.status(500).json({ success: false, message: 'Failed to fetch task', error: task.error });
  }

  static async insertTask(request, response) {
    const parsedBody = TaskBodySchema.safeParse(request.body);
    if (!parsedBody.success) {
      return response.status(400).json({ success: false, message: parsedBody.error.format() });
    }

    const { task, statusTask } = parsedBody.data;
    const result = await Task.create({ task, statusTask });

    return result.status
      ? response.status(201).json({ success: true, id: result.id, message: 'Task successfully registered' })
      : response.status(500).json({ success: false, message: 'Failed to register task', error: result.error });
  }

  static async updateTask(request, response) {
    const idTask = Number(request.params.idTask);
    const validId = IdTaskSchema.safeParse(idTask);
    if (!validId.success) {
      return response.status(400).json({ success: false, message: validId.error.format() });
    }

    const parsedBody = TaskBodySchema.safeParse(request.body);
    if (!parsedBody.success) {
      return response.status(400).json({ success: false, message: parsedBody.error.format() });
    }

    const { task, statusTask } = parsedBody.data;
    const result = await Task.edit(validId.data, { task, statusTask });

    return result.status
      ? response.status(200).json({ success: true, message: 'Task successfully updated' })
      : response.status(404).json({ success: false, message: result.message || 'Failed to update task' });
  }

  static async updateStatusTask(request, response) {
    const idTask = Number(request.params.idTask);
    const validId = IdTaskSchema.safeParse(idTask);
    if (!validId.success) {
      return response.status(400).json({ success: false, message: validId.error.format() });
    }

    const { statusTask } = request.body;
    const validStatus = StatusTaskSchema.safeParse(statusTask);
    if (!validStatus.success) {
      return response.status(400).json({ success: false, message: validStatus.error.format() });
    }

    const result = await Task.editStatusTask(validId.data, validStatus.data);
    return result.status
      ? response.status(200).json({ success: true, message: 'Task status successfully updated' })
      : response.status(404).json({ success: false, message: result.message || 'Failed to update task status' });
  }

  static async deleteTaskController(request, response) {
    const idTask = Number(request.params.idTask);
    const validId = IdTaskSchema.safeParse(idTask);
    if (!validId.success) {
      return response.status(400).json({ success: false, message: validId.error.format() });
    }

    const result = await Task.remove(validId.data);
    return result.status
      ? response.status(200).json({ success: true, message: 'Task deleted successfully' })
      : response.status(404).json({ success: false, message: result.message || 'Failed to delete task' });
  }
}
