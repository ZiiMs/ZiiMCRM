import * as trpc from '@trpc/server';

import { z } from 'zod';
import { createAuthRouter } from '../createAuthRouter';

export const commentRouter = createAuthRouter()
  .mutation('create', {
    input: z.object({
      text: z.string(),
      ticketId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const userId: string = ctx.session.user.id;
      const Comment = await ctx.prisma.comments.create({
        data: {
          text: input.text,
          User: {
            connect: {
              id: userId,
            },
          },
          Ticket: {
            connect: {
              id: input.ticketId,
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

      return { message: 'Board created successfully', Comment };
    },
  })
  .query('get', {
    input: z.object({
      ticketId: z.number(),
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
    }),
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const comments = await ctx.prisma.comments.findMany({
        where: {
          ticketId: input.ticketId,
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

