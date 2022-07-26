import { Role } from '@prisma/client';
import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const boardRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      boardName: z.string(),
      description: z.string(),
      image: z.string().nullish(),
      type: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        throw new Error('Not logged in');
      }
      const userId = ctx.session.user.id;
      const board = await ctx.prisma.board.create({
        data: {
          name: input.boardName,
          description: input.description,
          type: input.type,
          image: input.image,
          users: {
            create: [
              {
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            ],
          },
          UserRoles: {
            create: [
              {
                User: {
                  connect: {
                    id: userId,
                  },
                },
                role: Role.ADMIN,
              },
            ],
          },
        },
      });

      console.log('board', { board });

      return { message: 'Board created successfully', board };
    },
  })
  .query('fetch', {
    async resolve({ ctx }) {
      const boards = await ctx.prisma.board.findMany({
        where: {
          users: {
            some: {
              userId: ctx.session?.user.id,
            },
          },
        },
      });
      return boards;
    },
  })
  .query('get-comments', {
    input: z.object({
      boardId: z.string(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.bigint().nullish(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const comments = await ctx.prisma.comments.findMany({
        where: {
          boardId: input.boardId,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
        skip: 0,
        include: {
          User: true,
        },
      });
      let nextCursor: typeof cursor | null = null;
      if (comments.length > limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem!.id;
      }
      return { comments, nextCursor };
    },
  });

