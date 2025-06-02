import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getPong: trpc.procedure.query(() => {
    return { pong: 'pong' };
  }),
});

export type trpcRouter = typeof trpcRouter;
