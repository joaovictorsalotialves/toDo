import { conn } from "../database/connection.js";
import { z } from "zod";

const TaskSchema = z.object({
  task: z.string().min(1, "Task cannot be empty"),
  statusTask: z.enum(["doing", "done", "pending"]).optional(),
});

const IdTaskSchema = z.number().positive("idTask must be a positive number");

class TaskModel {
  async findAll() {
    try {
      const tasks = await conn.select().table('task');
      return { status: true, values: tasks };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async findById(idTask) {
    try {
      const validId = IdTaskSchema.safeParse(Number(idTask));
      if (!validId.success) return { status: false, error: validId.error.format() };

      const tasks = await conn.select().where({ idTask: validId.data }).table('task');
      return tasks.length > 0
        ? { status: true, values: tasks }
        : { status: undefined };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async create(data) {
    try {
      const parsedData = TaskSchema.safeParse(data);
      if (!parsedData.success) return { status: false, error: parsedData.error.format() };

      const [idTask] = await conn.insert(parsedData.data).into('task');
      return { status: true, id: idTask };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async edit(idTask, data) {
    try {
      const validId = IdTaskSchema.safeParse(Number(idTask));
      if (!validId.success) return { status: false, error: validId.error.format() };

      const parsedData = TaskSchema.safeParse(data);
      if (!parsedData.success) return { status: false, error: parsedData.error.format() };

      const foundTask = await this.findById(validId.data);
      if (!foundTask.status) return { status: false, message: "Task not found" };

      await conn.update(parsedData.data).where({ idTask: validId.data }).table('task');
      return { status: true };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async editStatusTask(idTask, statusTask) {
    try {
      const validId = IdTaskSchema.safeParse(Number(idTask));
      if (!validId.success) return { status: false, error: validId.error.format() };

      const statusSchema = z.enum(["doing", "done", "pending"]);
      const validStatus = statusSchema.safeParse(statusTask);
      if (!validStatus.success) return { status: false, error: validStatus.error.format() };

      const foundTask = await this.findById(validId.data);
      if (!foundTask.status) return { status: false, message: "Task not found" };

      await conn.update({ statusTask: validStatus.data }).where({ idTask: validId.data }).table('task');
      return { status: true };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async remove(idTask) {
    try {
      const validId = IdTaskSchema.safeParse(Number(idTask));
      if (!validId.success) return { status: false, error: validId.error.format() };

      const foundTask = await this.findById(validId.data);
      if (!foundTask.status) return { status: false, message: "Task not found" };

      await conn.delete().where({ idTask: validId.data }).table('task');
      return { status: true };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }
}

export const Task = new TaskModel();
