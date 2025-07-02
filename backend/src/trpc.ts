import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getTodayTasks: trpc.procedure.query(() => {
    return [
      {
        id: 0,
        solved: false,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 05 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 0,
      },
      {
        id: 1,
        solved: false,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 06 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 1,
      },
      {
        id: 2,
        solved: false,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 07 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 2,
      },
      {
        id: 3,
        solved: false,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 07 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 3,
      },
      {
        id: 4,
        solved: false,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 07 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 3,
      },
      {
        id: 5,
        solved: true,
        name: 'Очень важная задача',
        text: 'Очень, очень важная задача',
        createdTime:
          'Wed Jun 07 2025 20:36:54 GMT+0300 (Москва, стандартное время)',
        executionPeriod: 'Jun 04 2025 20:36:54 GMT+0300',
        importance: 2,
      },
    ];
  }),
});

export type trpcRouter = typeof trpcRouter;
