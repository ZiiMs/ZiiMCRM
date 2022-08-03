import * as trpc from '@trpc/server';

import { z } from 'zod';
import { Context } from '../context';

export const ticketRouter = trpc
  .router<Context>()
  .mutation('create', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      groupId: z.string(),
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        console.log('Not logged in');
        throw new Error('Not logged in');
      }
      console.log(input);
      const userId: string = ctx.session.user.id;
      const Ticket = await ctx.prisma.ticket.create({
        data: {
          title: input.title,
          description: input.description,
          groupId: input.groupId,
          boardId: input.boardId,
          Members: {
            connect: {
              id: userId,
            },
          },
        },
      });

      console.log('board', { Ticket });

      return { message: 'Ticket created successfully', Ticket };
    },
  })
  .query('get', {
    input: z.object({
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const tickets = await ctx.prisma.ticket.findMany({
        where: {
          boardId: input.boardId,
        },
        include: {
          Members: true,
        }
      });

      return tickets;
    },
  });

