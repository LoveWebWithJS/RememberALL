// import { z } from 'zod'
import { tasks } from '../../lib/tasks';
import { trpc } from '../../lib/trpc';

export const getTasksTprcRouter = trpc.procedure.query(() => {
  return tasks;
});
