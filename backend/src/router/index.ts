import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
// Just use extension "Generate Index" (for me ctrl+K I)
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createNewTaskTrpcRoute } from './createNewTask';
import { getMeTrpcRoute } from './getMe';
import { getTaskTrpcRoute } from './getTask';
import { getTasksTrpcRoute } from './getTasks';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';
import { updateSolvedStateTaskTrpcRoute } from './updateSolvedStateTask';
import { updateTaskTrpcRoute } from './updateTask';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createNewTask: createNewTaskTrpcRoute,
  getMe: getMeTrpcRoute,
  getTask: getTaskTrpcRoute,
  getTasks: getTasksTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateSolvedStateTask: updateSolvedStateTaskTrpcRoute,
  updateTask: updateTaskTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
