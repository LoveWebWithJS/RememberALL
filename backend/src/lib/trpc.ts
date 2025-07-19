import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import { type trpcRouter } from '../router';
import { type AppContext } from './ctx';
import { initTRPC } from '@trpc/server';

export const trpc = initTRPC.context<AppContext>().create();

export const applyTrpcToExpressApp = (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: trpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  );
};
