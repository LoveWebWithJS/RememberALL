import { trpc } from '../lib/trpc';
// Just use extension "Generate Index" (for me ctrl+K I)
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createNewTaskTrpcRoute } from './createNewTask';
import { getMeTrpcRoute } from './getMe';
import { getTasksTrpcRoute } from './getTasks';
import { signInTrpcRoute } from './signIn';
import { signUpTrpcRoute } from './signUp';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createNewTask: createNewTaskTrpcRoute,
  getMe: getMeTrpcRoute,
  getTasks: getTasksTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
});

export type trpcRouter = typeof trpcRouter;
