// import { z } from 'zod'
// import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';

export const getTasksTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const tasks = await ctx.prisma.task.findMany({
    select: {
      id: true,
      name: true,
      text: true,
      solved: true,
      importance: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return { tasks };
});
