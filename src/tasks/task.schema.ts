import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'tasks' })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  dueDate?: Date;

  @Prop({ enum: ['low', 'medium', 'high'], default: 'medium' })
  priority?: string;

  @Prop({ enum: ['pending', 'in-progress', 'completed'], default: 'pending' })
  status?: string;

  @Prop({ required: true }) // Agrega el userId al esquema
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
