import { trpc } from '../../lib/trpc';

export const getTestTrpcRoute = trpc.procedure.query(async ({ ctx, input }) => {
  return 'Test';
});
