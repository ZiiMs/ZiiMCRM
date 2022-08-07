import * as trpc from '@trpc/server';
import { z } from 'zod';
import { boardRouter } from './boards';
import { userRouter } from './users';

import { PrismaClientValidationError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { createAuthRouter } from '../createAuthRouter';
import { commentRouter } from './comment';
import { groupRouter } from './group';
import { ticketRouter } from './ticket';

export const appRouter = createAuthRouter()
  .transformer(superjson)
  .query('findUserBoard', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log('UserID!', ctx.session.user.id);

      try {
        const board = await ctx.prisma.board.findFirstOrThrow({
          include: {
            users: true,
          },
          where: {
            AND: [
              {
                id: {
                  equals: input.id,
                },
              },
              {
                users: {
                  some: {
                    user: {
                      id: { equals: ctx.session.user.id },
                    },
                  },
                },
              },
            ],
          },
        });
        console.log('Board!', board);
        return board;
      } catch (e: any) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: e.message,
        });
      }
    },
  })
  .merge('boards.', boardRouter)
  .merge('comments.', commentRouter)
  .merge('users.', userRouter)
  .merge('group.', groupRouter)
  .merge('ticket.', ticketRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

