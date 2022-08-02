import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const groupRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      title: z.string(),
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        console.log('Not logged in');
        throw new Error('Not logged in');
      }
      console.log(input);
      const group = await ctx.prisma.group.create({
        data: {
          name: input.title,
          boardId: input.boardId,
        },
      });

      console.log('group', { Comment: group });

      return { message: 'group created successfully', Comment: group };
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
      console.log(groups)
      return groups;
    },
  });

