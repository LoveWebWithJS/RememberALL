import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';
import { zCreateNewTaskTrpcInput } from './input';

export const createNewTaskTrpcRoute = trpc.procedure
  .input(zCreateNewTaskTrpcInput)
  .mutation(({ input }) => {
    tasks.unshift(input);
    return true;
  });
