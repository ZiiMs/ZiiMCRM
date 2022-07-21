import { prisma } from '@/utils/database';
import { Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const createboard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { boardName, description, type, userId } = req.body;
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    });

    const board = await prisma.board.create({
      data: {
        name: boardName,
        description: description,
        type: type,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: user.id,
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
                  id: user.id,
                },
              },
              role: Role.ADMIN,
            },
          ],
        },
      },
    });
    console.log(board);
    res.status(200).json({
      message: 'Board created successfully',
      board: board,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: error,
    });
  }
};

export default createboard;

