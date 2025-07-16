import { z } from 'zod';

export const zCreateNewTaskTrpcInput = z.object({
  name: z
    .string()
    .min(1, 'Название для задачи должно быть хотя бы из одного символа'),
  text: z
    .string()
    .min(1, 'Описание для задачи должно быть хотя бы из одного символа'),
  importance: z.number().min(0, 'Выберете, пожалуйста, важность своей задачи'),
  id: z.number(),
  solved: z.boolean(),
  executionPeriod: z.string(),
  createdTime: z.string(),
});
