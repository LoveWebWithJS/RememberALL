import { z } from 'zod';
import { zCreateNewTaskTrpcInput } from '../createNewTask/input';

export const zUpdateTaskTrpcInput = zCreateNewTaskTrpcInput.extend({
  taskId: z.string().min(1),
});
