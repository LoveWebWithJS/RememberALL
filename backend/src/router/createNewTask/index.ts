import { z } from 'zod';
import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';

export const createNewTaskTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z
        .string()
        .min(1, 'Название для задачи должно быть хотя бы из одного символа'),
      text: z
        .string()
        .min(1, 'Описание для задачи должно быть хотя бы из одного символа'),
      importance: z
        .number()
        .min(0, 'Выберете, пожалуйста, важность своей задачи'),
      id: z.number(),
      solved: z.boolean(),
      executionPeriod: z.string(),
      createdTime: z.string(),
    })
  )
  .mutation(({ input }) => {
    tasks.unshift(input);
    return true;
  });
