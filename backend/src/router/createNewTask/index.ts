// import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';
import { zCreateNewTaskTrpcInput } from './input';

export const createNewTaskTrpcRoute = trpc.procedure
  .input(zCreateNewTaskTrpcInput)
  .mutation(async ({ input, ctx }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED');
    }
    await ctx.prisma.task.create({
      data: { ...input, userId: ctx.me.id },
    });
    return true;
  });
