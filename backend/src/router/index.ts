import { trpc } from '../lib/trpc';
import { getTasksTprcRouter } from './getTasks';

export const TrpcRouter = trpc.router({
  getTasks: getTasksTprcRouter,
});

export type TrpcRouter = typeof TrpcRouter;
