// import { z } from 'zod'
// import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';
import { zGetTasksTrpcInput } from './input';

export const getTasksTrpcRoute = trpc.procedure
  .input(zGetTasksTrpcInput)
  .query(async ({ ctx, input }) => {
    const tasks = await ctx.prisma.task.findMany({
      select: {
        id: true,
        name: true,
        text: true,
        solved: true,
        importance: true,
      },
      where: {
        userId: input?.userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { tasks };
  });
