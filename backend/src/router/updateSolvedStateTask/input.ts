import { z } from 'zod';

export const zUpdateSolvedStateTaskTrpcInput = z.object({
  taskId: z.string().trim().min(1),
  solved: z.boolean(),
});
