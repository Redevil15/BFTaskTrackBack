import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema'; // Importa tu esquema Task
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    console.log('findAll');
    return this.taskModel.find().exec(); // Recupera todas las tareas de la colección
  }

  async findByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec(); // Filtra tareas por userId
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Crea una nueva tarea y guarda en la base de datos
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async update(id: string, updateTaskDto: Partial<Task>): Promise<Task> {
    const existingTask = await this.taskModel.findById(id).exec();
    if (!existingTask) {
      throw new Error('Task not found');
    }
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Task> {
    const existingTask = await this.taskModel.findById(id).exec();
    if (!existingTask) {
      throw new Error('Task not found');
    }
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
