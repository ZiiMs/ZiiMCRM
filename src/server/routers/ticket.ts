import { Role, Status } from '@prisma/client';
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
  })
  .mutation('delete', {
    input: z.object({
      id: z.number(),
      userRole: z.nativeEnum(Role),
    }),
    async resolve({ ctx, input }) {
      const userId: string = ctx.session.user.id;

      if (input.userRole === Role.ADMIN) {
        await ctx.prisma.ticket.delete({
          where: {
            id: input.id,
          },
        });
      } else if (input.userRole === Role.USER || input.userRole === Role.CLIENT) {
        await ctx.prisma.ticket.update({
          where: {
            id: input.id,
          },
          data: {
            Members: {
              disconnect: {
                id: userId,
              },
            },
          },
        });
      } else {
        throw new Error('Invalid user role');
      }

      return { message: 'Ticket deleted successfully' };
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.number(),
      status: z.nativeEnum(Status).optional(),
      member: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const statusCheck = input.status ? { status: input.status } : {};
      const members = input.member
        ? { Members: { connect: { id: input.member } } }
        : {};
      const ticket = await ctx.prisma.ticket.update({
        where: {
          id: input.id,
        },
        data: {
          ...members,
          ...statusCheck,
        },
        include: {
          Members: true,
        },
      });

      return { message: 'Ticket updated successfully', ticket };
    },
  });

