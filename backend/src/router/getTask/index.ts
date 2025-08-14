import { trpc } from '../../lib/trpc';
import { zGetTaskTrpcInput } from './input';

export const getTaskTrpcRoute = trpc.procedure
  .input(zGetTaskTrpcInput)
  .query(async ({ ctx, input }) => {
    const task = await ctx.prisma.task.findUnique({
      select: {
        id: true,
        name: true,
        text: true,
        importance: true,
        userId: true,
        solved: true,
      },
      where: {
        id: input?.id,
        userId: input?.userId,
      },
    });
    return { task };
  });
