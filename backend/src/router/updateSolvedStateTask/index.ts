import { trpc } from '../../lib/trpc';
import { zUpdateSolvedStateTaskTrpcInput } from './input';

export const updateSolvedStateTaskTrpcRoute = trpc.procedure
  .input(zUpdateSolvedStateTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { taskId, ...taskInput } = input;
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }
    const task = await ctx.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new Error('NOT_FOUND');
    }
    if (ctx.me.id !== task.userId) {
      throw new Error('NO_PERMISSION');
    }
    await ctx.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...taskInput,
      },
    });
    return true;
  });
