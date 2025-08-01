import { z } from 'zod';

export const zCreateNewTaskTrpcInput = z.object({
  name: z
    .string()
    .min(1, 'Название для задачи должно быть хотя бы из одного символа'),
  text: z
    .string()
    .min(1, 'Описание для задачи должно быть хотя бы из одного символа'),
  importance: z.string().min(0, 'Выберете, пожалуйста, важность своей задачи'),
  solved: z.boolean(),
  // id: z.string(),
  // executionPeriod: z.string(),
  // createdAt: z.string(),
});
