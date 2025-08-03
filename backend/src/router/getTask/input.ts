import { z } from 'zod';

export const zGetTaskTrpcInput = z.object({
  userId: z.string().min(1),
  id: z.string().min(1),
});
