import { prisma } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchBoards = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('BigBoard', req.query);
  if (!req.query.id) {
    res.status(403).json({
      error: true,
    });
    return;
  }
  const { userId } = req.body;

  const { id } = req.query;
  prisma.board
    .findFirstOrThrow({
      where: {
        id: String(id),
        users: {
          some: {
            userId: userId,
          },
        },
      },
    })
    .then((data) => {
      console.log('Success', data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(403).json({
        error: true,
        errorMsg: err,
      });
    });
  console.log('success');

  return;
};

export default fetchBoards;

