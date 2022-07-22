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
  const { id } = req.query;
  await prisma.board
    .findFirst({
      where: {
        id: String(id),
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

