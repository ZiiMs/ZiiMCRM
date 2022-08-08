import * as trpc from '@trpc/server';

import { z } from 'zod';
import { createAuthRouter } from '../createAuthRouter';

export const groupRouter = createAuthRouter()
  .mutation('create', {
    input: z.object({
      title: z.string(),
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const group = await ctx.prisma.group.create({
        data: {
          name: input.title,
          boardId: input.boardId,
        },
      });

      return { message: 'group created successfully', Group: group };
    },
  })
  .query('get', {
    input: z.object({
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const groups = await ctx.prisma.group.findMany({
        where: {
          boardId: input.boardId,
        },
      });
      return groups;
    },
  });

