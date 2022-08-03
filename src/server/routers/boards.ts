import { Role } from '@prisma/client';
import * as trpc from '@trpc/server';
import { nanoid } from 'nanoid';
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
      const userId: string = ctx.session.user.id;
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


      return { message: 'Board created successfully', board };
    },
  })
  .mutation('genKey', {
    input: z.object({
      boardId: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user) {
        throw new Error('Not logged in');
      }

      const ONE_DAY = 24 * 60 * 60 * 1000;
      // const tempSeconds = 10000;
      

      const storedKey = await ctx.prisma.shareKeys.create({
        data: {
          boardId: input.boardId,
          code: nanoid(8),
          userId: ctx.session.user.id,
          expires: new Date(Date.now() + ONE_DAY),
        },
      });

      return { storedKey };
    },
  })
  .mutation('join', {
    input: z.object({
      code: z.string(),
    }),
    async resolve({ ctx, input }) {
      const foundBoard = await ctx.prisma.shareKeys.findFirst({
        where: {
          code: input.code,
        },
        include: {
          Board: true,
        },
      });

      const boards = await ctx.prisma.board.update({
        where: {
          id: foundBoard?.Board.id,
        },
        data: {
          users: {
            create: [{ user: { connect: { id: ctx.session?.user.id } } }],
          },
        },
      });
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
  });

