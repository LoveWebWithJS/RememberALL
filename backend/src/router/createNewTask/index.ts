// import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';
import { zCreateNewTaskTrpcInput } from './input';

export const createNewTaskTrpcRoute = trpc.procedure
  .input(zCreateNewTaskTrpcInput)
  .mutation(async ({ input, ctx }) => {
    await ctx.prisma.task.create({
      data: input,
    });
    return true;
  });
