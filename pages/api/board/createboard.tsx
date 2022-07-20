import { prisma } from '@/utils/database';
import { Role } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const createboard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { boardName, description, type, userId } = req.body;
  await prisma.user
    .findFirstOrThrow({
      where: {
        id: userId,
      },
    })
    .then((user) => {
      prisma.board
        .create({
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
        })
        .then((board) => {
          console.log(board);
        })
        .catch((err) => {
          console.error(err);
          res.status(401).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(401).json({
        error: err,
      });
    });
  res.status(200).json({
    message: 'Board created successfully',
  });
};

export default createboard;

