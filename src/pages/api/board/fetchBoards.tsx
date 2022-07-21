import { prisma } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchBoards = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;
  const boards = await prisma.board
    .findMany({
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
    })
    .catch((err) => {
      console.error(err);
      res.status(401).json({
        error: err,
      });
    });
  res.status(200).json({
    message: 'getboards',
    boards: boards,
  });
};

export default fetchBoards;

