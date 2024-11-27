import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('all')
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('userTasks')
  async findTasksByUser(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('userID is required');
    }

    return this.tasksService.findByUserId(userId);
  }

  @Post('createTask')
  async create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
    console.log(req.body.userId);
    const userId = req.body.userId; // Obtén el userId del usuario autenticado
    return this.tasksService.create({ ...createTaskDto, userId }); // Incluye el userId en la tarea
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
