import { z } from 'zod';

export const zGetTasksTrpcInput = z.object({
  userId: z.string().min(1),
});
