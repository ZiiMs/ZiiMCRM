import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const commentRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      text: z.string(),
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        console.log('Not logged in');
        throw new Error('Not logged in');
      }
      console.log(input);
      const userId: string = ctx.session.user.id;
      const Comment = await ctx.prisma.comments.create({
        data: {
          text: input.text,
          User: {
            connect: {
              id: userId,
            },
          },
          Board: {
            connect: {
              id: input.boardId,
            },
          },
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          User: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      console.log('board', { Comment });

      return { message: 'Board created successfully', Comment };
    },
  })
  .query('get', {
    input: z.object({
      boardId: z.string(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
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
          id: 'desc',
        },
        skip: 0,
        select: {
          id: true,
          text: true,
          createdAt: true,
          User: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
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

