import * as trpc from '@trpc/server';
import { z } from 'zod';
import { boardRouter } from './boards';
import { userRouter } from './users';

import superjson from 'superjson';
import { Context } from '../context';
import { commentRouter } from './comment';

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .query('findUserBoard', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log('UserID!', ctx.session?.user.id);
      const board = await ctx.prisma.board.findFirstOrThrow({
        where: {
          id: input.id,
          users: {
            some: {
              userId: ctx.session?.user.id,
            },
          },
        },
      });
      return board;
    },
  })
  .merge('boards.', boardRouter)
  .merge('comments.', commentRouter)
  .merge('users.', userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

