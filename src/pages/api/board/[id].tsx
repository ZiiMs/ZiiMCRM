import { prisma } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

const fetchBoards = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Query', req.query);
  const { id } = req.query;
  if (!id || id === undefined) {
    console.log('undefined');
    res.status(401).json({
      error: 'UserId is required',
    });
    return;
  }
  await prisma.board
    .findMany({
      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(403).json(err);
    });
  console.log('success');

  return;
};

export default fetchBoards;

