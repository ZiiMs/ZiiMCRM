import * as trpc from '@trpc/server';

import { z } from 'zod';
import { createAuthRouter } from '../createAuthRouter';

export const ticketRouter = createAuthRouter()
  .mutation('create', {
    input: z.object({
      title: z.string(),
      description: z.string(),
      groupId: z.string(),
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
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
        },
      });

      return tickets;
    },
  });

