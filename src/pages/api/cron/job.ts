import { prisma } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function cleanDB(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.shareKeys.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
  console.log('deleted expired share keys', data);

  res.status(200).json({ message: `Cleaned ${JSON.stringify(data)}` });
}
