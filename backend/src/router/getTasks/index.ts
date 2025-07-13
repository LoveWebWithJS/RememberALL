// import { z } from 'zod'
import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';

export const getTasksTrpcRoute = trpc.procedure.query(() => {
  return tasks;
});
