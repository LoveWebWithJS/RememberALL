import { trpc } from '../lib/trpc';
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createNewTaskTrpcRoute } from './createNewTask';
import { getTasksTrpcRoute } from './getTasks';
// @endindex

export const TrpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createNewTask: createNewTaskTrpcRoute,
  getTasks: getTasksTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof TrpcRouter;
